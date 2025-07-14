
"use client"

import { useMemo, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Activity, Briefcase, DollarSign, Users, CheckCircle, Loader, TrendingUp, TrendingDown, CalendarCheck, Percent } from "lucide-react"
import Image from "next/image"
import { AreaChart, Pie, PieChart, ResponsiveContainer, Tooltip, Area, Legend, Cell, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { useProjectStore } from "@/hooks/use-project-store"
import React from "react"
import dynamic from 'next/dynamic'
import { useFinancialStore } from "@/hooks/use-financial-store"

const ProjectMap = dynamic(() => import('@/components/project-map'), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full rounded-2xl" />
});

export default function DashboardPage() {
  const { projects, isLoading } = useProjectStore();
  const { transactions } = useFinancialStore();

  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const activeProjects = projects.filter(p => p.status === 'قيد التنفيذ').length;
    const overdueProjects = projects.filter(p => p.status === 'متأخر').length;
    const nearCompletion = projects.filter(p => p.progress >= 90 && p.status !== 'مكتمل').length;
    const averageCompletion = totalProjects > 0 ? projects.reduce((sum, p) => sum + p.progress, 0) / totalProjects : 0;
    
    // Calculate total spending from the financial store
    const totalSpent = Object.values(transactions).flat().reduce((sum, t) => sum + t.amount, 0);

    return { totalProjects, totalBudget, activeProjects, overdueProjects, averageCompletion, totalSpent, nearCompletion };
  }, [projects, transactions]);

 const budgetChartData = useMemo(() => {
    if (stats.totalBudget === 0) return [];
    const spent = stats.totalSpent;
    const remaining = stats.totalBudget - spent > 0 ? stats.totalBudget - spent : 0;
    
    return [
      { name: 'المصروفات', value: spent, fill: 'hsl(var(--destructive))' },
      { name: 'المتبقي', value: remaining, fill: 'hsl(var(--primary))' },
    ];
  }, [stats.totalBudget, stats.totalSpent]);


  const projectProgressData = useMemo(() => {
    if (projects.length === 0) return [];
    const sortedProjects = [...projects].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    let cumulativeProgress = 0;
    return sortedProjects.map((p, index) => {
      cumulativeProgress += p.progress;
      return {
        name: `مشروع ${index + 1}`,
        date: new Date(p.createdAt).toLocaleDateString('ar-SA'),
        progress: cumulativeProgress / (index + 1),
      }
    });
  }, [projects]);
  
  const chartConfig = {
    budget: { label: "الميزانية" },
    spent: { label: "المصروفات", color: "hsl(var(--destructive))" },
    remaining: { label: "المتبقي", color: "hsl(var(--primary))" },
    progress: { label: "التقدم (%)", color: "hsl(var(--primary))" },
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card className="shadow-lg rounded-2xl border-l-4 border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المشاريع</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الميزانيات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">{stats.totalBudget.toLocaleString('en-US', { notation: 'compact' })}</div>
          </CardContent>
        </Card>
         <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المصروفات</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">{stats.totalSpent.toLocaleString('en-US', { notation: 'compact' })}</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط الإنجاز</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageCompletion.toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">فرق عمل نشطة</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مشاريع قيد التسليم</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.nearCompletion}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
         <Card className="shadow-xl rounded-2xl lg:col-span-3">
            <CardHeader>
                <CardTitle>معدل التقدم التراكمي للمشاريع</CardTitle>
                <CardDescription>متوسط نسبة الإنجاز مع مرور الوقت.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <Suspense fallback={<Skeleton className="h-full w-full" />}>
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
                            <Area type="monotone" dataKey="progress" stroke="var(--color-progress)" fill="var(--color-progress)" fillOpacity={0.4} name="متوسط التقدم" />
                        </AreaChart>
                    </Suspense>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card className="shadow-xl rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle>نظرة عامة على الميزانية</CardTitle>
             <CardDescription>إجمالي المصروفات مقابل الميزانية المعتمدة.</CardDescription>
          </CardHeader>
          <CardContent className="pb-8 flex items-center justify-center">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px]">
                <Suspense fallback={<Skeleton className="h-full w-full rounded-full" />}>
                    <PieChart>
                        <Tooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                        <Pie data={budgetChartData} dataKey="value" nameKey="name" innerRadius={80} outerRadius={110} strokeWidth={5} labelLine={false}>
                             <Cell key="cell-0" fill="var(--color-spent)" />
                             <Cell key="cell-1" fill="var(--color-remaining)" />
                        </Pie>
                    </PieChart>
                 </Suspense>
            </ChartContainer>
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
                <Suspense fallback={<Skeleton className="h-full w-full" />}>
                     <ProjectMap projects={projects} />
                </Suspense>
            </Card>
       </div>
    </div>
  )
}
