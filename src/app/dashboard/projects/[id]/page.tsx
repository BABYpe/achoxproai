
"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProjectStore, type Project } from "@/hooks/use-project-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building, DollarSign, User, Calendar, Loader, Edit, Trash2, FileText, Paperclip, MessageSquare, Milestone, Handshake, Briefcase, CheckCircle, Share2, Mail, Bot, Video, CalendarPlus } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        if (!project) return;
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
    
    const mockTeam = [
        { name: project.manager, role: "مدير المشروع", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "سارة عبدالله", role: "مهندس موقع", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "أحمد خان", role: "مشرف عمال", avatar: "https://randomuser.me/api/portraits/men/46.jpg" },
        { name: "روبوت التوثيق", role: "مراقب مستندات آلي", avatar: null, isBot: true },
    ]

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
        let Icon;
        if (isMilestone) {
            if (/contract|عقد/i.test(task.task)) Icon = Handshake;
            else if (/delivery|تسليم/i.test(task.task)) Icon = Briefcase;
            else Icon = Milestone;
        } else {
            Icon = CheckCircle;
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
                            <span className="text-sm text-muted-foreground">تقدم الإنجاز (متبقي {100 - project.progress}%)</span>
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
                            <p className="text-xl font-bold flex items-center justify-center gap-1"><Calendar className="h-5 w-5 text-primary" /> {project.endDate}</p>
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
                            {roadmap.length > 0 ? (
                                <div className="relative pl-6">
                                    <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-border"></div>
                                    <div className="space-y-8">
                                        {roadmap.map((item, index) => {
                                            const Icon = item.icon;
                                            return (
                                            <div key={index} className="relative flex items-start gap-4">
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
                            ) : (
                                <p className="text-muted-foreground text-center py-4">لا يوجد جدول زمني لهذا المشروع.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="shadow-xl rounded-2xl">
                        <CardHeader>
                            <CardTitle>مراسلات المشروع (محاكاة)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-3 bg-secondary/50 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="w-10 h-10 border">
                                            <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                                            <AvatarFallback>عم</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold">علي محمد <span className="text-xs text-muted-foreground font-normal">- 2024-07-20</span></p>
                                            <p className="text-sm mt-1">تم الانتهاء من صب خرسانة الدور الأول. واجهنا تأخيرًا بسيطًا بسبب الطقس ولكن تم تعويضه. سنبدأ في أعمال المباني الأسبوع القادم.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 bg-secondary/50 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="w-10 h-10 border">
                                            <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                                            <AvatarFallback>سع</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold">سارة عبدالله <span className="text-xs text-muted-foreground font-normal">- 2024-07-18</span></p>
                                            <p className="text-sm mt-1">تم تحديد خطر محتمل يتعلق بتوريد مواد العزل. تم التواصل مع مورد بديل كخطة احتياطية.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="w-10 h-10 border">
                                            <Bot className="w-6 h-6 text-primary m-auto" />
                                            <AvatarFallback>DC</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold">روبوت التوثيق <span className="text-xs text-muted-foreground font-normal">- الآن</span></p>
                                            <p className="text-sm mt-1">تم توثيق التحديثات أعلاه في سجل المشروع الرسمي. جاري إرسال ملخص أسبوعي إلى الأطراف المعنية.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <Textarea placeholder="اكتب تحديثًا جديدًا أو ردًا..." rows={1} />
                                <Button>إرسال</Button>
                            </div>
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
                                <Avatar className="w-10 h-10 border">
                                    {member.isBot ? <Bot className="w-6 h-6 text-primary m-auto"/> : <AvatarImage src={member.avatar} />}
                                    <AvatarFallback>{member.name.substring(0,2)}</AvatarFallback>
                                </Avatar>
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
                            <CardTitle>مشاركة وتصدير</CardTitle>
                        </CardHeader>
                         <CardContent className="space-y-3">
                             <Button variant="outline" className="w-full justify-start gap-2"><Mail className="w-4 h-4"/> إرسال تقرير عبر البريد</Button>
                             <Button variant="outline" className="w-full justify-start gap-2"><svg className="w-4 h-4" role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52s-.67-.816-.916-1.103c-.247-.288-.494-.248-.67.05-.174.297-.767.967-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52s-.67-.816-.916-1.103c-.247-.288-.494-.248-.67.05C3.18 6.6.64 7.2.46 7.4c-.172.199-.346.42-.346.666 0 .246.174.562.42.923.246.362 1.43 2.13 3.58 4.229 2.15 2.1 3.98 2.78 5.48 3.292.3.1.57.12.76.18.32.09.97.42.97.97.1.55.1.55.1 1.15.2.6.2.6.2 1.25.074.05.62.25.62.25.1.05.2.1.3.15.1.05.2.1.3.15s.3.1.4.15c.1.05.2.1.3.15s.3.1.4.15c.1.05.2.1.3.15s.3.1.4.15c.1.05.2.1.3.15s.3.1.4.15c.1.05.2.1.3.15s.3.1.4.15c.1.05.2.1.3.15s.3.1.4.15c.1.05.2.1.3.15s.3.1.4.15c.1.05.2.1.3.15s.3.1.4.15l.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.3.15.d.ts"></path></svg> المشاركة عبر واتساب</Button>
                             <Button variant="outline" className="w-full justify-start gap-2"><FileText className="w-4 h-4"/> تصدير تقرير PDF</Button>
                         </CardContent>
                    </Card>
                    
                    <Card className="shadow-xl rounded-2xl">
                        <CardHeader>
                            <CardTitle>الاجتماعات والمواعيد</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                             <Button className="w-full justify-start gap-2"><Video className="w-4 h-4"/> بدء اجتماع فوري</Button>
                             <Button variant="outline" className="w-full justify-start gap-2"><CalendarPlus className="w-4 h-4"/> حجز موعد لمناقشة المشروع</Button>
                        </CardContent>
                    </Card>
                    
                    <Card className="shadow-xl rounded-2xl">
                        <CardHeader>
                            <CardTitle>المستندات والمخططات</CardTitle>
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
