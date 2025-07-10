
"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, MoreVertical, Building, TrendingUp, DollarSign, Clock, Users, CheckCircle, LayoutDashboard } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import Link from "next/link"
import dynamic from 'next/dynamic'
import { Skeleton } from "@/components/ui/skeleton"

const ProjectMap = dynamic(() => import('@/components/project-map'), {
  ssr: false,
  loading: () => <Skeleton className="h-[600px] w-full rounded-2xl" />
});


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
  },
];

export default function DashboardPage() {
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const activeProjects = projects.filter(p => p.status === 'قيد التنفيذ' || p.status === 'متأخر').length;
    const completedProjects = projects.filter(p => p.status === 'مكتمل').length;
    return { totalProjects, totalBudget, activeProjects, completedProjects };
  }, []);

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
  }, []);

  const projectBudgetData = useMemo(() => {
    return projects.map(p => ({
        name: p.title.split(' ')[1], // Shorten name for chart
        budget: p.budget / 1000000, // In millions
    }));
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        <Button asChild className="gap-1 text-lg py-6 px-6 shadow-md shadow-primary/30">
          <Link href="/dashboard/projects">
            <PlusCircle className="h-5 w-5" />
            إنشاء مشروع جديد
          </Link>
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المشاريع</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">كل المشاريع المسجلة</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الميزانية</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBudget.toLocaleString('en-US')} ر.س</div>
            <p className="text-xs text-muted-foreground">ميزانية كل المشاريع</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المشاريع النشطة</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.activeProjects}</div>
             <p className="text-xs text-muted-foreground">المشاريع قيد التنفيذ حالياً</p>
          </CardContent>
        </Card>
         <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المشاريع المكتملة</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.completedProjects}</div>
            <p className="text-xs text-muted-foreground">المشاريع التي تم إنجازها</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        <Card className="shadow-xl rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle>حالة المشاريع</CardTitle>
             <CardDescription>توزيع المشاريع حسب حالتها الحالية.</CardDescription>
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
        <Card className="shadow-xl rounded-2xl lg:col-span-3">
            <CardHeader>
                <CardTitle>ميزانيات المشاريع (بالمليون)</CardTitle>
                <CardDescription>مقارنة بين ميزانيات المشاريع المختلفة.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={{ budget: { label: "الميزانية", color: "hsl(var(--primary))" } }} className="h-[250px] w-full">
                    <BarChart accessibilityLayer data={projectBudgetData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Bar dataKey="budget" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>

      {/* Projects Overview */}
       <div className="grid gap-8 md:grid-cols-2">
            <Card className="shadow-xl rounded-2xl">
                 <CardHeader>
                    <CardTitle>نظرة عامة على المشاريع</CardTitle>
                    <CardDescription>قائمة المشاريع ومواقعها على الخريطة.</CardDescription>
                 </CardHeader>
                 <CardContent className="grid gap-4">
                    {projects.map((project, index) => (
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
                <ProjectMap projects={projects} />
            </Card>
       </div>
    </div>
  )
}
