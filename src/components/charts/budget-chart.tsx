
"use client"

import { useMemo } from 'react';
import { PieChart, ResponsiveContainer, Tooltip, Legend, Cell, Pie } from "recharts";
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";

interface BudgetChartProps {
    totalBudget: number;
    totalSpent: number;
}

const chartConfig = {
    spent: { label: "المصروفات", color: "hsl(var(--destructive))" },
    remaining: { label: "المتبقي", color: "hsl(var(--primary))" },
};

export default function BudgetChart({ totalBudget, totalSpent }: BudgetChartProps) {
    const budgetChartData = useMemo(() => {
        if (totalBudget === 0 && totalSpent === 0) return [{ name: 'لا توجد بيانات', value: 1, fill: 'hsl(var(--muted))' }];
        const spent = totalSpent;
        const remaining = totalBudget - spent > 0 ? totalBudget - spent : 0;
        
        return [
          { name: 'المصروفات', value: spent, fill: 'hsl(var(--destructive))' },
          { name: 'المتبقي', value: remaining, fill: 'hsl(var(--primary))' },
        ];
      }, [totalBudget, totalSpent]);

    return (
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Tooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                    <Legend content={<ChartLegendContent nameKey="name" />} />
                    <Pie data={budgetChartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} strokeWidth={5}>
                        {budgetChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}
