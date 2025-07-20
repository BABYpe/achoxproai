
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
import { type EstimateProjectCostOutput } from '@/ai/flows/estimate-project-cost.types';
import { type AnalyzeProjectDescriptionOutput } from '@/ai/flows/analyze-project-description.types';
import { type GenerateComprehensivePlanOutput } from '@/ai/flows/generate-comprehensive-plan.types';
import { type AnalyzeRisksOutput } from '@/ai/flows/analyze-risks.types';

export interface Project {
    id?: string; // Firestore ID
    title: string;
    status: "قيد التنفيذ" | "مكتمل" | "مخطط له" | "متأخر";
    variant: "default" | "secondary" | "outline" | "destructive";
    location: string;
    imageUrl: string;
    imageHint: string;
    progress: number;
    budget: number;
    currency: string;
    lat: number;
    lng: number;
    manager: string;
    endDate: string;
    createdAt: any;
    ganttChartData?: EstimateProjectCostOutput['ganttChartData'];
    projectType?: AnalyzeProjectDescriptionOutput['projectType'];
    quality?: AnalyzeProjectDescriptionOutput['quality'];
    scopeOfWork?: string;
    costEstimation?: EstimateProjectCostOutput;
    riskAnalysis?: AnalyzeRisksOutput;
}

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  fetchProjects: () => Promise<void>;
  getProjectById: (projectId: string) => Promise<Project | null>;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => Promise<string>;
  deleteProject: (projectId: string) => Promise<void>;
  updateProject: (projectId: string, updatedData: Partial<Project>) => Promise<void>;
  updateProjectGanttData: (projectId: string, ganttData: EstimateProjectCostOutput['ganttChartData']) => Promise<void>;
}

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
            const { id, ...projectData } = project; // exclude mock ID
            return addDoc(projectsCollection, {
              ...projectData,
              createdAt: Timestamp.now()
            });
        });
        await Promise.all(seedingPromises);
        
        const newQuerySnapshot = await getDocs(q);
        const projects = newQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        set({ projects, isLoading: false });

      } else {
        const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
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
            if (data.createdAt && data.createdAt instanceof Timestamp) {
                data.createdAt = data.createdAt.toDate().toISOString();
            }
            return { id: docSnap.id, ...data } as Project;
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
      const docRef = await addDoc(collection(db, 'projects'), {
          ...project,
          createdAt: Timestamp.now()
      });
      await get().fetchProjects();
      return docRef.id;
    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
    }
  },

  deleteProject: async (projectId) => {
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
      await updateDoc(doc(db, 'projects', projectId), updatedData);
      await get().fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },

  updateProjectGanttData: async (projectId, ganttData) => {
    try {
        const projectRef = doc(db, 'projects', projectId);
        await updateDoc(projectRef, { ganttChartData: ganttData });
        
        set(state => ({
            projects: state.projects.map(p => 
                p.id === projectId ? { ...p, ganttChartData: ganttData } : p
            )
        }));

    } catch (error) {
        console.error("Error updating Gantt data:", error);
        throw error;
    }
  },
}));
