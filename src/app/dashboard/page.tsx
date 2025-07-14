
"use client"

import { useMemo, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, MoreVertical, Building, TrendingUp, DollarSign, Clock, Users, CheckCircle, LayoutDashboard, Loader, ListChecks, Activity, AlertTriangle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { AreaChart, Bar, BarChart, Pie, PieChart, ResponsiveContainer, Tooltip, Area } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { useProjectStore } from "@/hooks/use-project-store"
import React from "react"
import { APIProvider } from "@vis.gl/react-google-maps"

const ProjectMap = React.lazy(() => import('@/components/project-map'));

export default function DashboardPage() {
  const { projects, isLoading } = useProjectStore();

  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const activeProjects = projects.filter(p => p.status === 'قيد التنفيذ').length;
    const overdueProjects = projects.filter(p => p.status === 'متأخر').length;
    return { totalProjects, totalBudget, activeProjects, overdueProjects };
  }, [projects]);

  const projectStatusData = useMemo(() => {
    const statusCounts = projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const statusColors: Record<string, string> = {
        'قيد التنفيذ': 'hsl(var(--primary))',
        'مكتمل': 'hsl(var(--accent))',
        'مخطط له': 'hsl(var(--muted-foreground))',
        'متأخر': 'hsl(var(--destructive))',
    }

    return Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
      fill: statusColors[name] || '#8884d8',
    }));
  }, [projects]);
  
  const weeklyProgressData = useMemo(() => {
    return [
      { name: "Week 1", progress: 15, budget: 30 },
      { name: "Week 2", progress: 25, budget: 45 },
      { name: "Week 3", progress: 40, budget: 60 },
      { name: "Week 4", progress: 55, budget: 70 },
      { name: "Week 5", progress: 70, budget: 85 },
      { name: "Week 6", progress: 85, budget: 95 },
      { name: "Week 7", progress: 100, budget: 100 },
    ]
  }, []);

  
  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-[80vh]">
            <Loader className="h-12 w-12 animate-spin text-primary" />
        </div>
    )
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-lg rounded-2xl border-l-4 border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المشاريع</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">إجمالي المشاريع في المنصة</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl border-l-4 border-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الميزانيات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">{stats.totalBudget.toLocaleString('en-US', { notation: 'compact' })} ر.س</div>
            <p className="text-xs text-muted-foreground">قيمة جميع المشاريع</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المشاريع النشطة</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
             <p className="text-xs text-muted-foreground">المشاريع قيد التنفيذ حالياً</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مشاريع متأخرة</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.overdueProjects}</div>
            <p className="text-xs text-muted-foreground">تحتاج إلى متابعة فورية</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
         <Card className="shadow-xl rounded-2xl lg:col-span-3">
            <CardHeader>
                <CardTitle>نظرة عامة على تقدم المشاريع</CardTitle>
                <CardDescription>مقارنة بين التقدم الفعلي والميزانية المستهلكة.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={{ 
                     progress: { label: "التقدم", color: "hsl(var(--primary))" },
                     budget: { label: "الميزانية", color: "hsl(var(--accent))" }
                    }} className="h-[250px] w-full">
                    <AreaChart accessibilityLayer data={weeklyProgressData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Area type="monotone" dataKey="progress" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorProgress)" />
                        <Area type="monotone" dataKey="budget" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorBudget)" />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card className="shadow-xl rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle>توزيع المشاريع حسب الحالة</CardTitle>
             <CardDescription>نظرة سريعة على حالة جميع المشاريع.</CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <ChartContainer config={{}} className="mx-auto aspect-square h-[250px]">
                <PieChart>
                    <Tooltip content={<ChartTooltipContent hideLabel nameKey="name" />} />
                    <Pie data={projectStatusData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5} />
                </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Projects Overview */}
       <div className="grid gap-8 md:grid-cols-2">
            <Card className="shadow-xl rounded-2xl">
                 <CardHeader>
                    <CardTitle>نظرة عامة على المشاريع</CardTitle>
                    <CardDescription>آخر تحديثات المشاريع ومواقعها على الخريطة.</CardDescription>
                 </CardHeader>
                 <CardContent className="grid gap-4">
                    {projects.slice(0, 4).map((project, index) => (
                      <div key={index} className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary/50">
                          <Image src={project.imageUrl} alt={project.title} width={80} height={80} className="w-20 h-20 object-cover rounded-md" data-ai-hint={project.imageHint}/>
                          <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold">{project.title}</h3>
                                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                                        <Building className="h-3 w-3" />
                                        <span>{project.location}</span>
                                    </div>
                                </div>
                                <Badge variant={project.variant as any}>{project.status}</Badge>
                              </div>
                               <div className="flex items-center gap-4 mt-2 text-xs">
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="h-3 w-3 text-green-500"/> <span>{project.budget.toLocaleString()} {project.currency}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <TrendingUp className="h-3 w-3 text-primary"/> <span>{project.progress}%</span>
                                    </div>
                               </div>
                          </div>
                      </div>
                    ))}
                 </CardContent>
            </Card>
            <Card className="shadow-xl rounded-2xl overflow-hidden h-[600px] md:h-auto">
                 <Suspense fallback={<Skeleton className="h-full w-full rounded-2xl" />}>
                     <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
                        <ProjectMap projects={projects} />
                    </APIProvider>
                </Suspense>
            </Card>
       </div>
    </div>
  )
}
