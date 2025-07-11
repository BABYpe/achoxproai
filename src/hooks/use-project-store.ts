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
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
    createdAt?: any;
}

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  unsubscribe: () => void;
  fetchProjects: () => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  updateProject: (projectId: string, updatedData: Partial<Project>) => Promise<void>;
}

const initialData: Project[] = [
    {
      id: "initial-1",
      title: "مشروع فيلا سكنية",
      status: "قيد التنفيذ",
      variant: "default",
      location: "الرياض",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "modern villa",
      progress: 65,
      budget: 1200000,
      currency: "SAR",
      lat: 24.7136,
      lng: 46.6753,
      manager: "خالد الأحمدي",
      endDate: "2024-12-31"
    },
    {
      id: "initial-2",
      title: "مبنى تجاري متعدد الطوابق",
      status: "مكتمل",
      variant: "secondary",
      location: "جدة",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "commercial building",
      progress: 100,
      budget: 5500000,
      currency: "SAR",
      lat: 21.4858,
      lng: 39.1925,
      manager: "سارة عبدالله",
      endDate: "2023-10-15"
    },
];

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  isLoading: true,
  unsubscribe: () => {},

  fetchProjects: () => {
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.empty && get().projects.length === 0) {
            // If the database is empty, populate with initial data
            initialData.forEach(async (project) => {
                const { id, ...projectData } = project;
                await addDoc(collection(db, "projects"), {
                    ...projectData,
                    createdAt: serverTimestamp()
                });
            });
            set({ isLoading: false });
        } else {
             const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
             set({ projects, isLoading: false });
        }
      }, (error) => {
        console.error("Error fetching projects:", error);
        set({ isLoading: false });
      });
      set({ unsubscribe });
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        set({ isLoading: false });
    }
  },

  addProject: async (project) => {
    try {
      await addDoc(collection(db, 'projects'), {
          ...project,
          createdAt: serverTimestamp()
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

// Automatically fetch projects when the app loads
useProjectStore.getState().fetchProjects();
