
"use client";

import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreVertical, Building, DollarSign, Map, List, User, Loader } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import dynamic from 'next/dynamic'
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProjectStore, Project } from "@/hooks/use-project-store";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const ProjectMap = dynamic(() => import('@/components/project-map'), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full rounded-2xl" />
});

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const { projects, isLoading, deleteProject } = useProjectStore();
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async (projectId?: string) => {
    if (!projectId) return;
    try {
      await deleteProject(projectId);
      toast({
        title: "تم الحذف",
        description: `تم حذف المشروع بنجاح.`,
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل حذف المشروع. الرجاء المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  }
  
  const handleEditNavigation = (project: Project) => {
    const query = new URLSearchParams({
        template: JSON.stringify({
            id: project.id,
            projectName: project.title,
            location: project.location,
            projectDescription: project.scopeOfWork || `مشروع جديد مبني على قالب: ${project.title}`,
        }),
    }).toString();
    router.push(`/dashboard/projects/new?${query}`);
  }

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
            <Button asChild className="gap-1 text-lg py-6 px-6 shadow-md shadow-primary/30">
                <Link href="/dashboard/projects/new">
                    <PlusCircle className="h-5 w-5" />
                    إضافة مشروع
                </Link>
            </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="shadow-lg rounded-2xl flex flex-col overflow-hidden">
                <CardHeader className="p-0 relative">
                  <Skeleton className="w-full h-40" />
                </CardHeader>
                 <CardContent className="p-4 flex-grow space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="w-full space-y-2">
                    <Skeleton className="h-2 w-1/4 ml-auto" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                </CardFooter>
            </Card>
          ))}
        </div>
      ) : viewMode === 'grid' && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <Card key={project.id} className="shadow-lg rounded-2xl flex flex-col overflow-hidden dark:bg-card/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <CardHeader className="p-0 relative">
                <Link href={`/dashboard/projects/${project.id}`}>
                  <Image src={project.imageUrl} alt={project.title} width={400} height={200} className="w-full h-40 object-cover" data-ai-hint={project.imageHint}/>
                </Link>
                <Badge variant={project.variant as any} className="absolute top-2 right-2">{project.status}</Badge>
                 <AlertDialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="absolute top-1 left-1 h-8 w-8 bg-black/30 hover:bg-black/50 text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => router.push(`/dashboard/projects/${project.id}`)}>عرض التفاصيل</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleEditNavigation(project)}>تعديل المشروع</DropdownMenuItem>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>حذف المشروع</DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
                        <AlertDialogDescription>
                            هذا الإجراء لا يمكن التراجع عنه. سيؤدي هذا إلى حذف مشروع "{project.title}" نهائيًا من قاعدة البيانات.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(project.id)} className="bg-destructive hover:bg-destructive/90">حذف</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg font-bold mb-2">
                    <Link href={`/dashboard/projects/${project.id}`} className="hover:text-primary transition-colors">{project.title}</Link>
                </CardTitle>
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
                      <Progress value={project.progress}/>
                  </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {viewMode === 'map' && (
        <Card className="shadow-xl rounded-2xl overflow-hidden h-[calc(100vh-12rem)]">
          <Suspense fallback={<Skeleton className="h-full w-full" />}>
            <ProjectMap projects={projects} />
          </Suspense>
        </Card>
      )}
    </div>
  )
}
