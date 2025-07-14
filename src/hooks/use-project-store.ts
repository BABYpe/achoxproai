
import { create } from 'zustand';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  updateDoc,
  getDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { initialProjects } from '@/lib/initial-projects';
import { type EstimateProjectCostOutput } from '@/ai/flows/estimate-project-cost.types';
import { type AnalyzeProjectDescriptionOutput } from '@/ai/flows/analyze-project-description.types';

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
}

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  unsubscribe: (() => void) | null;
  fetchProjects: () => void;
  getProjectById: (projectId: string) => Promise<Project | null>;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  updateProject: (projectId: string, updatedData: Partial<Project>) => Promise<void>;
  updateProjectGanttData: (projectId: string, ganttData: EstimateProjectCostOutput['ganttChartData']) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [], // Start with an empty array
  isLoading: true,
  unsubscribe: null,

  fetchProjects: () => {
    // Prevent multiple listeners
    if (get().unsubscribe) {
        set({ isLoading: false });
        // Manually trigger a re-render by creating a new array
        set(state => ({ projects: [...state.projects] }));
        return;
    }
    set({ isLoading: true });
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.empty && initialProjects.length > 0) {
            console.log('Firebase is empty, using initial mock data.');
            // This is a workaround for development to populate the DB.
            // In a real production app, you might not want this.
            initialProjects.forEach(async (project) => {
              const { id, ...projectData } = project;
              try {
                await addDoc(collection(db, 'projects'), {
                  ...projectData,
                  createdAt: Timestamp.now()
                });
              } catch (e) { console.error("Error adding initial project:", e); }
            });
            set({ projects: initialProjects, isLoading: false });
            return;
        }
        const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        set({ projects, isLoading: false });
      }, (error) => {
        console.error("Error fetching projects:", error);
        set({ isLoading: false, projects: initialProjects }); // Fallback to initial data on error
      });
      set({ unsubscribe });
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        set({ isLoading: false, projects: initialProjects }); // Fallback to initial data on error
    }
  },

  getProjectById: async (projectId: string) => {
    try {
        const docRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            // Convert Firestore Timestamps to serializable format if they exist
            if (data.createdAt && data.createdAt instanceof Timestamp) {
                data.createdAt = data.createdAt.toDate().toISOString();
            }
            return { id: docSnap.id, ...data } as Project;
        } else {
             console.log("No such document in Firestore.");
             // Fallback to initialProjects if not found in Firestore but might exist in mock data
             const mockProject = initialProjects.find(p => p.id === projectId);
             if (mockProject) return mockProject;
             return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        return null;
    }
  },

  addProject: async (project) => {
    try {
      await addDoc(collection(db, 'projects'), {
          ...project,
          createdAt: Timestamp.now()
      });
    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
    }
  },

  deleteProject: async (projectId) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  },

  updateProject: async (projectId, updatedData) => {
    try {
      await updateDoc(doc(db, 'projects', projectId), updatedData);
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },

  updateProjectGanttData: async (projectId, ganttData) => {
    try {
        const projectRef = doc(db, 'projects', projectId);
        await updateDoc(projectRef, { ganttChartData: ganttData });
        
        // Update local state as well for immediate feedback
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
