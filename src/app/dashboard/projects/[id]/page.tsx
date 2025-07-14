
"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProjectStore, type Project } from "@/hooks/use-project-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building, DollarSign, User, Calendar, Percent, Loader, Edit, Trash2, FileText, Paperclip, MessageSquarePlus, Milestone, Handshake, Briefcase, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
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

// Mock data for project details that aren't yet in the main project object
const mockTeam = [
    { name: "علي محمد", role: "مدير المشروع" },
    { name: "سارة عبدالله", role: "مهندس موقع" },
    { name: "أحمد خان", role: "مشرف عمال" },
]

const mockUpdates = [
    { date: "2024-07-20", author: "علي محمد", text: "تم الانتهاء من صب خرسانة الدور الأول. واجهنا تأخيرًا بسيطًا بسبب الطقس ولكن تم تعويضه. سنبدأ في أعمال المباني الأسبوع القادم." },
    { date: "2024-07-18", author: "سارة عبدالله", text: "تم تحديد خطر محتمل يتعلق بتوريد مواد العزل. تم التواصل مع مورد بديل كخطة احتياطية." },
    { date: "2024-07-15", author: "علي محمد", text: "تقرير تقدم أسبوعي: تم إنجاز 90% من أعمال الأساسات. الفريق يعمل بكفاءة عالية." },
];

const mockFiles = [
    { name: "عقد المقاول الرئيسي.pdf", size: "2.5 MB", type: "PDF" },
    { name: "المخططات المعمارية المعتمدة.dwg", size: "15.2 MB", type: "DWG" },
    { name: "جدول الكميات.xlsx", size: "850 KB", type: "XLSX" },
]


export default function ProjectDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { getProjectById, deleteProject } = useProjectStore.getState();
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const projectId = typeof params.id === 'string' ? params.id : '';

    useEffect(() => {
        if (projectId) {
            const fetchProject = async () => {
                setIsLoading(true);
                const fetchedProject = await getProjectById(projectId);
                setProject(fetchedProject);
                setIsLoading(false);
            };
            fetchProject();
        }
    }, [projectId, getProjectById]);

    const handleDelete = async () => {
        if (!projectId) return;
        try {
        await deleteProject(projectId);
        toast({
            title: "تم الحذف",
            description: `تم حذف المشروع بنجاح.`,
        });
        router.push('/dashboard/projects');
        } catch (error) {
        toast({
            title: "خطأ",
            description: "فشل حذف المشروع. الرجاء المحاولة مرة أخرى.",
            variant: "destructive",
        });
        }
    };
    
    const handleEdit = () => {
        toast({
            title: "قيد التطوير",
            description: "سيتم تفعيل صفحة تعديل المشروع قريبًا."
        });
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <Loader className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold">لم يتم العثور على المشروع</h1>
                <p>قد يكون قد تم حذفه أو أن الرابط غير صحيح.</p>
                <Button onClick={() => router.push('/dashboard/projects')} className="mt-4">
                    <ArrowLeft className="ml-2 h-4 w-4" />
                    العودة إلى المشاريع
                </Button>
            </div>
        );
    }
    
    // Dynamically determine roadmap status
    const today = new Date();
    const roadmap = project.ganttChartData ? project.ganttChartData.map(task => {
        const endDate = new Date(task.end);
        const startDate = new Date(task.start);
        let status: 'completed' | 'in-progress' | 'planned' = 'planned';

        if (endDate < today) {
            status = 'completed';
        } else if (startDate <= today && endDate >= today) {
            status = 'in-progress';
        }

        const isMilestone = /contract|milestone|delivery|تسليم|عقد|مرحلة/i.test(task.task);
        let Icon = CheckCircle;
        if (isMilestone) {
            if (/contract|عقد/i.test(task.task)) Icon = Handshake;
            else if (/delivery|تسليم/i.test(task.task)) Icon = Briefcase;
            else Icon = Milestone;
        }

        return {
            ...task,
            status,
            type: isMilestone ? 'milestone' : 'task',
            icon: Icon
        };
    }) : [];

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "completed": return "bg-green-500";
            case "in-progress": return "bg-primary animate-pulse";
            case "planned": return "bg-muted-foreground/50 border-2 border-dashed";
            default: return "bg-gray-400";
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => router.push('/dashboard/projects')}>
                    <ArrowLeft className="ml-2 h-4 w-4" />
                    العودة إلى قائمة المشاريع
                </Button>
                 <AlertDialog>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleEdit}><Edit className="ml-2 h-4 w-4" /> تعديل</Button>
                        <AlertDialogTrigger asChild>
                             <Button variant="destructive"><Trash2 className="ml-2 h-4 w-4" /> حذف</Button>
                        </AlertDialogTrigger>
                    </div>
                     <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
                        <AlertDialogDescription>
                            هذا الإجراء لا يمكن التراجع عنه. سيؤدي هذا إلى حذف مشروع "{project.title}" نهائيًا من قاعدة البيانات.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">تأكيد الحذف</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <Card className="shadow-xl rounded-2xl w-full">
                <CardHeader className="relative h-48 md:h-64 rounded-t-2xl overflow-hidden p-0">
                   <Image src={project.imageUrl} alt={project.title} fill style={{objectFit: 'cover'}} data-ai-hint={project.imageHint}/>
                   <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                       <CardTitle className="text-3xl font-bold text-white drop-shadow-lg">{project.title}</CardTitle>
                       <div className="flex items-center gap-2 mt-2">
                         <Badge variant={project.variant as any}>{project.status}</Badge>
                         <span className="text-sm text-gray-200 flex items-center gap-1"><Building className="h-4 w-4"/> {project.location}</span>
                       </div>
                   </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">تقدم الإنجاز</span>
                            <span className="text-lg font-bold text-primary">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-3" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                        <div className="p-4 bg-secondary/50 rounded-lg">
                            <h4 className="text-sm font-semibold text-muted-foreground">الميزانية</h4>
                            <p className="text-xl font-bold flex items-center justify-center gap-1"><DollarSign className="h-5 w-5 text-green-500" /> {project.budget.toLocaleString()} {project.currency}</p>
                        </div>
                        <div className="p-4 bg-secondary/50 rounded-lg">
                            <h4 className="text-sm font-semibold text-muted-foreground">تاريخ الانتهاء</h4>
                            <p className="text-xl font-bold flex items-center justify-center gap-1"><Calendar className="h-5 w-5 text-blue-500" /> {project.endDate}</p>
                        </div>
                         <div className="p-4 bg-secondary/50 rounded-lg">
                            <h4 className="text-sm font-semibold text-muted-foreground">مدير المشروع</h4>
                            <p className="text-xl font-bold flex items-center justify-center gap-1"><User className="h-5 w-5 text-gray-500" /> {project.manager}</p>
                        </div>
                        <div className="p-4 bg-secondary/50 rounded-lg">
                            <h4 className="text-sm font-semibold text-muted-foreground">الحالة</h4>
                             <p className="text-xl font-bold">{project.status}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                     <Card className="shadow-xl rounded-2xl">
                        <CardHeader>
                            <CardTitle>خريطة طريق المشروع</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="relative pl-6">
                                {/* Vertical line */}
                                <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-border"></div>

                                <div className="space-y-8">
                                    {roadmap.map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                        <div key={index} className="relative flex items-start gap-4">
                                            {/* Dot/Icon on the line */}
                                            <div className="absolute top-1/2 -translate-y-1/2 right-6 translate-x-1/2 z-10 flex items-center justify-center">
                                                {item.type === 'milestone' ? (
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getStatusStyles(item.status)} ring-4 ring-background`}>
                                                        <Icon className="h-5 w-5" />
                                                    </div>
                                                ) : (
                                                    <div className={`w-4 h-4 rounded-full ${getStatusStyles(item.status)} ring-4 ring-background`}></div>
                                                )}
                                            </div>

                                            <div className="flex-1 space-y-1 pr-12">
                                                <p className="font-semibold text-foreground">{item.task}</p>
                                                <p className="text-sm text-muted-foreground">{item.start} &rarr; {item.end}</p>
                                            </div>
                                             <Badge variant={item.status === "completed" ? "secondary" : item.status === "in-progress" ? "default" : "outline"}>
                                                {item.status === 'completed' ? 'مكتمل' : item.status === 'in-progress' ? 'قيد التنفيذ' : 'مخطط له'}
                                            </Badge>
                                        </div>
                                    )})}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                     <Card className="shadow-xl rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>آخر التحديثات والملاحظات</CardTitle>
                            <Button variant="outline" size="sm"><MessageSquarePlus className="ml-2 h-4 w-4"/> إضافة تحديث</Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {mockUpdates.map((update, index) => (
                                <div key={index} className="p-3 bg-secondary/50 rounded-lg">
                                    <p className="text-sm">{update.text}</p>
                                    <p className="text-xs text-muted-foreground mt-2 text-left">{update.author} - {update.date}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1 space-y-8">
                    <Card className="shadow-xl rounded-2xl">
                        <CardHeader>
                            <CardTitle>فريق العمل</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {mockTeam.map((member, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                    <User className="h-6 w-6 text-muted-foreground"/>
                                </div>
                                <div>
                                    <p className="font-semibold">{member.name}</p>
                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                </div>
                            </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card className="shadow-xl rounded-2xl">
                        <CardHeader>
                            <CardTitle>مستندات المشروع</CardTitle>
                        </CardHeader>
                         <CardContent className="space-y-3">
                             {mockFiles.map((file, index) => (
                                <div key={index} className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary/50">
                                    <FileText className="h-6 w-6 text-primary" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">{file.size}</p>
                                    </div>
                                    <Paperclip className="h-4 w-4 text-muted-foreground"/>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
