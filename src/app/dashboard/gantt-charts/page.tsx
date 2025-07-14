
"use client";

import React, { useState, useMemo } from 'react';
import { useProjectStore, Project } from '@/hooks/use-project-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader, Milestone, CheckCircle, Briefcase, Handshake } from 'lucide-react';
import { GanttChartIcon } from '@/components/icons/gantt-chart-icon';
import { Badge } from '@/components/ui/badge';

type GanttTask = NonNullable<Project['ganttChartData']>[number] & {
    status: 'completed' | 'in-progress' | 'planned';
    type: 'task' | 'milestone';
    icon: React.ElementType;
};

const getStatusStyles = (status: 'completed' | 'in-progress' | 'planned') => {
    switch (status) {
        case "completed": return "bg-green-500";
        case "in-progress": return "bg-primary animate-pulse";
        case "planned": return "bg-muted-foreground/50 border-2 border-dashed";
        default: return "bg-gray-400";
    }
}

export default function GanttChartsPage() {
    const { projects, isLoading: projectsLoading } = useProjectStore();
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

    const roadmap: GanttTask[] = useMemo(() => {
        const selectedProject = projects.find(p => p.id === selectedProjectId);
        if (!selectedProject || !selectedProject.ganttChartData) return [];

        const today = new Date();
        return selectedProject.ganttChartData.map(task => {
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

            return { ...task, status, type: isMilestone ? 'milestone' : 'task', icon: Icon };
        });
    }, [selectedProjectId, projects]);


    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">مخطط جانت الزمني للمشاريع</h1>
                <div className="w-[300px]">
                     <Select onValueChange={setSelectedProjectId} value={selectedProjectId || ''}>
                        <SelectTrigger>
                        <SelectValue placeholder="اختر مشروعاً لعرض جدوله الزمني" />
                        </SelectTrigger>
                        <SelectContent>
                        {projects.map(p => (
                            <SelectItem key={p.id} value={p.id!}>{p.title}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card className="shadow-xl rounded-2xl min-h-[600px]">
                <CardHeader>
                    <CardTitle>الجدول الزمني للمشروع</CardTitle>
                    <CardDescription>عرض تفصيلي لمهام ومراحل المشروع المختار.</CardDescription>
                </CardHeader>
                <CardContent>
                    {projectsLoading && <div className="flex justify-center items-center py-20"><Loader className="h-10 w-10 animate-spin text-primary" /></div>}
                    
                    {!selectedProjectId && !projectsLoading && (
                        <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                            <GanttChartIcon className="h-16 w-16" />
                            <p className="font-semibold text-lg">الرجاء اختيار مشروع من القائمة أعلاه</p>
                            <p>لعرض الجدول الزمني الخاص به.</p>
                        </div>
                    )}
                    
                    {selectedProjectId && roadmap.length > 0 && (
                        <div className="relative pl-6">
                            {/* Vertical timeline */}
                            <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-border"></div>

                            <div className="space-y-8">
                                {roadmap.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={index} className="relative flex items-center gap-4 group">
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

                                            <div className="flex-1 bg-secondary/30 p-4 rounded-lg pr-12 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-semibold text-foreground">{item.task}</p>
                                                        <p className="text-sm text-muted-foreground">{item.start} &rarr; {item.end} ({item.duration} أيام)</p>
                                                    </div>
                                                     <div className="flex items-center gap-2">
                                                        <Badge variant="outline">{item.responsible}</Badge>
                                                        <Badge variant={item.status === "completed" ? "secondary" : item.status === "in-progress" ? "default" : "outline"}>
                                                            {item.status === 'completed' ? 'مكتمل' : item.status === 'in-progress' ? 'قيد التنفيذ' : 'مخطط له'}
                                                        </Badge>
                                                     </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                     {selectedProjectId && roadmap.length === 0 && !projectsLoading && (
                         <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                            <GanttChartIcon className="h-16 w-16" />
                            <p className="font-semibold text-lg">لا يوجد جدول زمني لهذا المشروع</p>
                            <p>قد يكون المشروع قيد الإنشاء أو لم يتم توليد جدول زمني له بعد.</p>
                        </div>
                     )}
                </CardContent>
            </Card>
        </div>
    );
}

