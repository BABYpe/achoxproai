
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Project {
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
}

interface ProjectState {
  projects: Project[];
  addProject: (project: Project) => void;
}

const initialProjects: Project[] = [
  {
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
  {
    title: "تطوير مجمع سكني",
    status: "مخطط له",
    variant: "outline",
    location: "الدمام",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "residential complex",
    progress: 0,
    budget: 25000000,
    currency: "SAR",
    lat: 26.4207,
    lng: 50.0888,
    manager: "علي محمد",
    endDate: "2026-06-01"
  },
];


export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: initialProjects,
      addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
    }),
    {
      name: 'project-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

    