
"use client"

import { useMemo, Suspense, useEffect } from "react"
import dynamic from 'next/dynamic'
import Link from "next/link"
import { useProjectStore } from "@/hooks/use-project-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Activity, Briefcase, DollarSign, Users, CheckCircle, TrendingDown, CalendarCheck, Percent } from "lucide-react"
import { StatCard } from "@/components/stat-card"
import { SmartImage } from "@/components/ui/smart-image"
import { LoadingSkeleton } from "@/components/ui/loading-skeleton"

// Dynamically import heavy components
const ProjectMap = dynamic(() => import('@/components/project-map'), {
  ssr: false,
  loading: () => <LoadingSkeleton type="card" className="h-full w-full rounded-2xl" />
});

const BudgetChart = dynamic(() => import('@/components/charts/budget-chart'), {
    ssr: false,
    loading: () => <LoadingSkeleton type="card" className="h-[250px] w-full" />
});

const ProgressChart = dynamic(() => import('@/components/charts/progress-chart'), {
    ssr: false,
    loading: () => <LoadingSkeleton type="card" className="h-[250px] w-full" />
});


export default function DashboardPage() {
  const { projects, isLoading, fetchProjects } = useProjectStore();
  
  useEffect(() => {
    // Initial fetch if projects are not loaded
    if (projects.length === 0) {
      fetchProjects();
    }
  }, [fetchProjects, projects.length]);


  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
    const activeProjects = projects.filter(p => p.status === 'قيد التنفيذ').length;
    const nearCompletion = projects.filter(p => (p.progress || 0) >= 90 && p.status !== 'مكتمل').length;
    const averageCompletion = totalProjects > 0 ? projects.reduce((sum, p) => sum + (p.progress || 0), 0) / totalProjects : 0;
    const totalSpent = projects.reduce((sum, p) => sum + (p.actualBudget || 0), 0);
    return { totalProjects, totalBudget, activeProjects, averageCompletion, totalSpent, nearCompletion };
  }, [projects]);


  if (isLoading && projects.length === 0) {
    return <LoadingSkeleton type="card" count={8} className="grid grid-cols-1 md:grid-cols-4 gap-4" />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">لوحة التحكم الرئيسية</h1>
        <Button asChild className="gap-1 text-lg py-6 px-6 shadow-lg shadow-primary/30">
          <Link href="/dashboard/projects/new">
            <PlusCircle className="h-5 w-5" />
            إنشاء مشروع جديد
          </Link>
        </Button>
      </div>
      
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard title="إجمالي المشاريع" value={stats.totalProjects.toString()} icon={Briefcase} />
        <StatCard title="إجمالي الميزانيات" value={`${stats.totalBudget.toLocaleString('en-US', { notation: 'compact' })} ر.س`} icon={DollarSign} />
        <StatCard title="إجمالي المصروفات" value={`${stats.totalSpent.toLocaleString('en-US', { notation: 'compact' })} ر.س`} icon={TrendingDown} />
        <StatCard title="متوسط الإنجاز" value={`${stats.averageCompletion.toFixed(1)}%`} icon={Percent} />
        <StatCard title="مشاريع نشطة" value={stats.activeProjects.toString()} icon={Activity} />
        <StatCard title="مشاريع قيد التسليم" value={stats.nearCompletion.toString()} icon={CalendarCheck} />
      </div>

      {/* Charts */}
       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
         <Card className="shadow-xl rounded-2xl lg:col-span-3">
            <CardHeader>
                <CardTitle>معدل التقدم التراكمي للمشاريع</CardTitle>
                <CardDescription>متوسط نسبة الإنجاز مع مرور الوقت.</CardDescription>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<LoadingSkeleton type="card" className="h-[250px] w-full" />}>
                   <ProgressChart projects={projects} />
                </Suspense>
            </CardContent>
        </Card>
        <Card className="shadow-xl rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle>نظرة عامة على الميزانية</CardTitle>
             <CardDescription>إجمالي المصروفات مقابل الميزانية المعتمدة.</CardDescription>
          </CardHeader>
          <CardContent className="pb-8 flex items-center justify-center">
             <Suspense fallback={<LoadingSkeleton type="card" className="h-[250px] w-[250px] rounded-full" />}>
                <BudgetChart totalBudget={stats.totalBudget} totalSpent={stats.totalSpent} />
            </Suspense>
            </CardContent>
         </Card>
       </div>
     
      {/* Projects Overview */}
       <div className="grid gap-8 md:grid-cols-2">
            <Card className="shadow-xl rounded-2xl">
                 <CardHeader>
                    <CardTitle>نظرة عامة على أحدث المشاريع</CardTitle>
                    <CardDescription>آخر المشاريع المضافة وحالتها الحالية.</CardDescription>
                 </CardHeader>
                 <CardContent className="grid gap-4">
                    {projects.slice(0, 4).map((project, index) => (
                      <div key={project.id || index} className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary/50">
                           <SmartImage
                                src={project.imageUrl || ''}
                                alt={project.title}
                                width={80}
                                height={80}
                                containerClassName="w-20 h-20 flex-shrink-0"
                                className="object-cover rounded-md"
                                data-ai-hint={project.imageHint}
                            />
                          <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold">{project.title}</h3>
                                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                                        <Users className="h-3 w-3" />
                                        <span>{project.location}</span>
                                    </div>
                                </div>
                                <Badge variant={project.variant as any}>{project.status}</Badge>
                              </div>
                               <div className="flex items-center gap-4 mt-2 text-xs">
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="h-3 w-3 text-green-500"/> <span>{project.budget?.toLocaleString()} {project.currency}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Activity className="h-3 w-3 text-primary"/> <span>{project.progress}%</span>
                                    </div>
                               </div>
                          </div>
                      </div>
                    ))}
                 </CardContent>
            </Card>
             <Card className="shadow-xl rounded-2xl overflow-hidden h-[600px] md:h-auto">
                <Suspense fallback={<LoadingSkeleton type="card" className="h-full w-full" />}>
                     <ProjectMap projects={projects} />
                </Suspense>
            </Card>
       </div>
    </div>
  )
}
