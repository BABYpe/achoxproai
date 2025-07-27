import { create } from 'zustand';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { initialProjects } from '@/lib/initial-projects';


// Matching the provided schema
export interface Project {
    id?: string; // Firestore ID
    name: string;
    status: "قيد التنفيذ" | "مكتمل" | "مخطط له" | "متأخر";
    ownerId: string; // Belongs to User
    createdAt: any; // Firestore Timestamp
    updatedAt: any; // Firestore Timestamp
    description?: string;
    estimatedBudget?: number;
    actualBudget?: number;
    startDate?: string; // ISO Date String
    endDate?: string; // ISO Date String
    location: string;
    latitude?: number;
    longitude?: number;
    projectType?: 'residential_villa' | 'interior_finishing' | 'commercial_building' | 'event_setup' | 'other';
    quality?: 'standard' | 'premium' | 'luxury';
    scopeOfWork?: string;

    // Denormalized/additional data for UI convenience, not in the core schema but useful
    variant?: "default" | "secondary" | "outline" | "destructive";
    imageUrl?: string;
    imageHint?: string;
    progress?: number;
    currency?: string;
    manager?: string; // Should be derived from ownerId in a real app
    
    // Storing complex objects as JSON strings as per schema
    costEstimation: any;
    riskAnalysis: any;
    ganttChartData: any;
}


interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  fetchProjects: () => Promise<void>;
  getProjectById: (projectId: string) => Promise<Project | null>;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'| 'ownerId'>) => Promise<string>;
  deleteProject: (projectId: string) => Promise<void>;
  updateProject: (projectId: string, updatedData: Partial<Project>) => Promise<void>;
  updateProjectGanttData: (projectId: string, ganttData: any[]) => Promise<void>;

}

// Helper to convert Firestore Timestamps to ISO strings in nested objects
const convertTimestamps = (data: any) => {
    for (const key in data) {
        if (data[key] instanceof Timestamp) {
            data[key] = data[key].toDate().toISOString();
        } else if (typeof data[key] === 'object' && data[key] !== null) {
            convertTimestamps(data[key]);
        }
    }
    return data;
};

// Helper to parse JSON fields safely
const parseJsonFields = (project: any): Project => {
    const newProject = { ...project };
    try {
        if (newProject.costEstimationJson) {
            newProject.costEstimation = JSON.parse(newProject.costEstimationJson);
        }
        if (newProject.riskAnalysisJson) {
            newProject.riskAnalysis = JSON.parse(newProject.riskAnalysisJson);
        }
         if (newProject.ganttChartDataJson) {
            newProject.ganttChartData = JSON.parse(newProject.ganttChartDataJson);
        }
    } catch (e) {
        console.error("Error parsing JSON fields for project:", project.id, e);
    }
    return newProject as Project;
};

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  isLoading: true,

  fetchProjects: async () => {
    if (!get().isLoading) {
        set({isLoading: true});
    }
    try {
      const projectsCollection = collection(db, "projects");
      const q = query(projectsCollection, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('Firebase is empty, seeding with initial projects.');
        const seedingPromises = initialProjects.map(project => {
            const { id, createdAt, updatedAt, ...projectData } = project; 
            return addDoc(projectsCollection, {
              ...projectData,
              costEstimationJson: JSON.stringify(projectData.costEstimation),
              riskAnalysisJson: JSON.stringify(projectData.riskAnalysis),
              ganttChartDataJson: JSON.stringify(projectData.ganttChartData),
              ownerId: 'mock-user-id',
              createdAt: Timestamp.fromDate(new Date(projectData.createdAt)),
              updatedAt: Timestamp.fromDate(new Date(projectData.updatedAt))
            });
        });
        await Promise.all(seedingPromises);
        
        const newQuerySnapshot = await getDocs(q);
        const projects = newQuerySnapshot.docs.map(doc => {
            const data = doc.data();
            const withTimestamps = convertTimestamps({ id: doc.id, ...data });
            return parseJsonFields(withTimestamps);
        });
        set({ projects, isLoading: false });

      } else {
        const projects = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const withTimestamps = convertTimestamps({ id: doc.id, ...data });
            return parseJsonFields(withTimestamps);
        });
        set({ projects, isLoading: false });
      }

    } catch (error) {
        console.error("Error fetching projects from Firestore:", error);
        set({ projects: [], isLoading: false });
    }
  },

  getProjectById: async (projectId: string) => {
    try {
        const docRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const withTimestamps = convertTimestamps({ id: docSnap.id, ...data });
            return parseJsonFields(withTimestamps);
        } else {
            console.warn("No such document in Firestore with ID:", projectId);
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        return null;
    }
  },

  addProject: async (project) => {
    try {
       const projectToAdd = {
          ...project,
          ownerId: 'mock-user-id',
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          costEstimationJson: JSON.stringify(project.costEstimation),
          riskAnalysisJson: JSON.stringify(project.riskAnalysis),
          ganttChartDataJson: JSON.stringify(project.ganttChartData),
      };
      delete projectToAdd.costEstimation;
      delete projectToAdd.riskAnalysis;
      delete projectToAdd.ganttChartData;

      const docRef = await addDoc(collection(db, 'projects'), projectToAdd);
      await get().fetchProjects();
      return docRef.id;
    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
    }
  },

  deleteProject: async (projectId: string) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
       set(state => ({
        projects: state.projects.filter(p => p.id !== projectId)
      }));
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  },

  updateProject: async (projectId, updatedData) => {
    try {
      const projectRef = doc(db, 'projects', projectId);
      
      const dataToUpdate: any = { ...updatedData };
      if (dataToUpdate.costEstimation) {
          dataToUpdate.costEstimationJson = JSON.stringify(dataToUpdate.costEstimation);
          delete dataToUpdate.costEstimation;
      }
      if (dataToUpdate.riskAnalysis) {
          dataToUpdate.riskAnalysisJson = JSON.stringify(dataToUpdate.riskAnalysis);
          delete dataToUpdate.riskAnalysis;
      }
       if (dataToUpdate.ganttChartData) {
          dataToUpdate.ganttChartDataJson = JSON.stringify(dataToUpdate.ganttChartData);
          delete dataToUpdate.ganttChartData;
      }

      await updateDoc(projectRef, {
        ...dataToUpdate,
        updatedAt: Timestamp.now()
      });
      await get().fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },
  
  updateProjectGanttData: async (projectId: string, ganttData: any[]) => {
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, {
          ganttChartDataJson: JSON.stringify(ganttData),
          updatedAt: Timestamp.now(),
      });
  },
}));