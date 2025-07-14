
"use client"

import { useMemo, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, MoreVertical, Activity, AlertTriangle, Briefcase, DollarSign, Users, CheckCircle, LayoutDashboard, Loader, ListChecks } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { AreaChart, Bar, BarChart, Pie, PieChart, ResponsiveContainer, Tooltip, Area, Legend, Cell, XAxis, YAxis, CartesianGrid, PieLabel } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { useProjectStore } from "@/hooks/use-project-store"
import React from "react"
import { APIProvider } from "@vis.gl/react-google-maps"
import dynamic from 'next/dynamic'

const ProjectMap = dynamic(() => import('@/components/project-map'), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full rounded-2xl" />
});

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

    return Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));
  }, [projects]);
  
  const projectProgressData = useMemo(() => {
    if (projects.length === 0) return [];

    const sortedProjects = [...projects].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    
    let cumulativeProgress = 0;
    let cumulativeBudgetSpent = 0;
    const totalBudget = sortedProjects.reduce((sum, p) => sum + p.budget, 0);

    return sortedProjects.map((p, index) => {
      cumulativeProgress += p.progress;
      cumulativeBudgetSpent += p.budget * (p.progress / 100);
      
      const averageProgress = cumulativeProgress / (index + 1);
      const budgetSpentPercentage = totalBudget > 0 ? (cumulativeBudgetSpent / totalBudget) * 100 : 0;

      return {
        name: `مشروع ${index + 1}`,
        date: new Date(p.createdAt).toLocaleDateString('ar-SA'),
        progress: averageProgress, 
        budget: budgetSpentPercentage 
      }
    });
  }, [projects]);
  
  const chartConfig = {
    projects: { label: "المشاريع" },
    'قيد التنفيذ': { label: "قيد التنفيذ", color: "hsl(var(--primary))" },
    'مكتمل': { label: "مكتمل", color: "hsl(var(--chart-2))" },
    'مخطط له': { label: "مخطط له", color: "hsl(var(--muted-foreground))" },
    'متأخر': { label: "متأخر", color: "hsl(var(--destructive))" },
  }


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
                     progress: { label: "التقدم (%)", color: "hsl(var(--primary))" },
                     budget: { label: "الميزانية المستهلكة (%)", color: "hsl(var(--accent))" }
                    }} className="h-[250px] w-full">
                    <AreaChart accessibilityLayer data={projectProgressData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => new Date(value).toLocaleDateString('ar-SA-u-nu-latn', {month: 'short'})}
                        />
                         <YAxis 
                            tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                         <Legend />
                        <Area type="monotone" dataKey="progress" stroke="var(--color-progress)" fill="var(--color-progress)" fillOpacity={0.4} name="متوسط التقدم" />
                        <Area type="monotone" dataKey="budget" stroke="var(--color-budget)" fill="var(--color-budget)" fillOpacity={0.4} name="الميزانية المستهلكة" />
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
            <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px]">
                <PieChart>
                    <Tooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                    <Pie data={projectStatusData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5} >
                         {projectStatusData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={chartConfig[entry.name as keyof typeof chartConfig]?.color} />
                        ))}
                    </Pie>
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
                                        <Users className="h-3 w-3" />
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
                                        <Activity className="h-3 w-3 text-primary"/> <span>{project.progress}%</span>
                                    </div>
                               </div>
                          </div>
                      </div>
                    ))}
                 </CardContent>
            </Card>
            <Card className="shadow-xl rounded-2xl overflow-hidden h-[600px] md:h-auto">
                 <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
                    <ProjectMap projects={projects} />
                </APIProvider>
            </Card>
       </div>
    </div>
  )
}
