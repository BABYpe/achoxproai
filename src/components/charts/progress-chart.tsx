
"use client"

import { useMemo } from 'react';
import { AreaChart, ResponsiveContainer, Tooltip, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import type { Project } from '@/hooks/use-project-store';

interface ProgressChartProps {
    projects: Project[];
}

const chartConfig = {
    progress: { label: "التقدم (%)", color: "hsl(var(--primary))" },
};

export default function ProgressChart({ projects }: ProgressChartProps) {
    const projectProgressData = useMemo(() => {
        if (projects.length === 0) return [];
        
        const sortedProjects = [...projects].sort((a, b) => {
            try {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return dateA - dateB;
            } catch {
                return 0;
            }
        });
    
        let cumulativeProgress = 0;
        return sortedProjects.map((p, index) => {
          cumulativeProgress += (p.progress || 0);
          let dateString = 'N/A';
          try {
            dateString = new Date(p.createdAt).toLocaleDateString('ar-SA');
          } catch {}
          
          return {
            name: `مشروع ${index + 1}`,
            date: dateString,
            progress: cumulativeProgress / (index + 1),
          }
        });
      }, [projects]);
      
    return (
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <AreaChart accessibilityLayer data={projectProgressData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => {
                    try {
                        return new Date(value).toLocaleDateString('ar-SA-u-nu-latn', {month: 'short'})
                    } catch {
                        return value
                    }
                    }}
                />
                    <YAxis
                    tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                <Area type="monotone" dataKey="progress" stroke="var(--color-progress)" fill="var(--color-progress)" fillOpacity={0.4} name="متوسط التقدم" />
            </AreaChart>
        </ChartContainer>
    );
}
