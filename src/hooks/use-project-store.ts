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
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: initialProjects, // Use initial data
  isLoading: true,
  unsubscribe: null,

  fetchProjects: () => {
    // Prevent multiple listeners
    if (get().unsubscribe) {
        return;
    }
    set({ isLoading: true });
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        set({ projects: projects.length > 0 ? projects : initialProjects, isLoading: false });
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
        // First, check local initial data for a match, useful for dev before db is populated
        const localProject = initialProjects.find(p => p.id === projectId);
        if (localProject) return localProject;
        
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
            console.log("No such document in Firestore, checking initial data again.");
            return null; // The project is not in firestore
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
  }
}));
