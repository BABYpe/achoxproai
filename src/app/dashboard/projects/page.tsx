
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreVertical, Building, DollarSign, Map, List, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import ProjectMap from "@/components/project-map";

const projects = [
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
  {
    title: "تجديد فندق فاخر",
    status: "متأخر",
    variant: "destructive",
    location: "دبي",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "luxury hotel",
    progress: 40,
    budget: 12000000,
    currency: "SAR",
    lat: 25.2048,
    lng: 55.2708,
    manager: "فاطمة الزهراء",
    endDate: "2025-03-20"
  },
  {
    title: "تجهيز مؤتمر التقنية الدولي",
    status: "قيد التنفيذ",
    variant: "default",
    location: "الرياض",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "conference hall",
    progress: 80,
    budget: 750000,
    currency: "SAR",
    lat: 24.774265,
    lng: 46.738586,
    manager: "نورة القحطاني",
    endDate: "2024-09-10"
  },
  {
    title: "بناء مستودع لوجستي",
    status: "مكتمل",
    variant: "secondary",
    location: "مدينة الملك عبدالله الاقتصادية",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "warehouse exterior",
    progress: 100,
    budget: 8200000,
    currency: "SAR",
    lat: 22.3833,
    lng: 39.0956,
    manager: "محمد الغامدي",
    endDate: "2024-01-25"
  }
];

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">إدارة المشاريع</h1>
        <div className="flex gap-2">
            <Button variant={viewMode === 'grid' ? 'default' : 'outline'} className="gap-1" onClick={() => setViewMode('grid')}>
                <List className="h-4 w-4" />
                عرض قائمة
            </Button>
            <Button variant={viewMode === 'map' ? 'default' : 'outline'} className="gap-1" onClick={() => setViewMode('map')}>
                <Map className="h-4 w-4" />
                عرض على الخريطة
            </Button>
            <Button className="gap-1 text-lg py-6 px-6 shadow-md shadow-primary/30">
                <PlusCircle className="h-5 w-5" />
                إضافة مشروع
            </Button>
        </div>
      </div>
      
      {viewMode === 'grid' && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, index) => (
            <Card key={index} className="shadow-lg rounded-2xl flex flex-col overflow-hidden dark:bg-card/50">
              <CardHeader className="p-0 relative">
                <Image src={project.imageUrl} alt={project.title} width={400} height={200} className="w-full h-40 object-cover" data-ai-hint={project.imageHint}/>
                <Badge variant={project.variant as any} className="absolute top-2 right-2">{project.status}</Badge>
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute top-1 left-1 h-8 w-8 bg-black/30 hover:bg-black/50 text-white">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>عرض التفاصيل</DropdownMenuItem>
                    <DropdownMenuItem>تعديل المشروع</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">حذف المشروع</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg font-bold mb-2">{project.title}</CardTitle>
                <div className="text-sm text-muted-foreground space-y-2">
                    <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>{project.budget.toLocaleString()} {project.currency}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{project.manager}</span>
                    </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                  <div className="w-full">
                      <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                          <span>تقدم الإنجاز</span>
                          <span className="font-bold text-primary">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2"/>
                  </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {viewMode === 'map' && (
        <Card className="shadow-xl rounded-2xl overflow-hidden h-[70vh]">
            <ProjectMap projects={projects} />
        </Card>
      )}
    </div>
  )
}

    