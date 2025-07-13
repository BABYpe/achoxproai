
"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useProjectStore } from '@/hooks/use-project-store';
import { useFinancialStore, Transaction } from '@/hooks/use-financial-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Loader, TrendingUp, TrendingDown, Scale, PieChart as PieChartIcon, AreaChart } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Area, XAxis, YAxis, CartesianGrid, AreaChart as RechartsAreaChart } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"


const transactionSchema = z.object({
  description: z.string().min(1, "الوصف مطلوب"),
  amount: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive("المبلغ يجب أن يكون أكبر من صفر")
  ),
  category: z.string().min(1, "الفئة مطلوبة"),
  date: z.date({ required_error: "التاريخ مطلوب" }),
});

type TransactionForm = z.infer<typeof transactionSchema>;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff4d4d', '#4dff4d'];

export default function FinancialIntelligencePage() {
  const { projects, isLoading: projectsLoading } = useProjectStore();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const { transactions, addTransaction } = useFinancialStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<TransactionForm>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date(),
      description: "",
      category: "",
      amount: 0,
    }
  });

  useEffect(() => {
    // If there are projects and no project is selected, select the first one.
    if (!projectsLoading && projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id!);
    }
  }, [projectsLoading, projects, selectedProjectId]);

  const selectedProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId);
  }, [selectedProjectId, projects]);

  const projectTransactions = useMemo(() => {
    if (!selectedProjectId) return [];
    return transactions[selectedProjectId]?.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()) || [];
  }, [selectedProjectId, transactions]);

  const stats = useMemo(() => {
    const totalSpent = projectTransactions.reduce((sum, t) => sum + t.amount, 0);
    const budget = selectedProject?.budget || 0;
    const remaining = budget - totalSpent;
    return { totalSpent, remaining, budget };
  }, [projectTransactions, selectedProject]);
  
  const categoryData = useMemo(() => {
    const categoryMap = projectTransactions.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  }, [projectTransactions]);

  const spendingOverTimeData = useMemo(() => {
    let cumulativeAmount = 0;
    return projectTransactions.map(t => {
      cumulativeAmount += t.amount;
      return {
        date: new Date(t.date).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' }),
        spent: cumulativeAmount
      };
    });
  }, [projectTransactions]);

  const onSubmit: SubmitHandler<TransactionForm> = async (data) => {
    if (!selectedProjectId) return;
    try {
      const newTransaction: Transaction = {
        ...data,
        id: new Date().toISOString(),
        date: data.date.toISOString(),
      };
      await addTransaction(selectedProjectId, newTransaction);
      toast({
        title: "تمت الإضافة بنجاح",
        description: "تم تسجيل المعاملة المالية الجديدة.",
      });
      setIsDialogOpen(false);
      reset({
          date: new Date(),
          description: "",
          category: "مواد بناء",
          amount: 0,
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل حفظ المعاملة. الرجاء المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">الذكاء المالي</h1>
          <div className="flex gap-2 items-center">
            {projectsLoading ? <Loader className="animate-spin" /> : (
              <Select onValueChange={setSelectedProjectId} value={selectedProjectId || ''}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="اختر مشروعاً لعرض بياناته المالية" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map(p => (
                    <SelectItem key={p.id} value={p.id!}>{p.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Button className="gap-1" onClick={() => setIsDialogOpen(true)} disabled={!selectedProjectId}>
              <PlusCircle className="h-4 w-4" />
              إضافة معاملة
            </Button>
          </div>
        </div>

        {selectedProject ? (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="shadow-lg rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">الميزانية المعتمدة</CardTitle>
                  <Scale className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.budget.toLocaleString()} ر.س</div>
                  <p className="text-xs text-muted-foreground">إجمالي الميزانية للمشروع</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">المصروفات الفعلية</CardTitle>
                  <TrendingDown className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalSpent.toLocaleString()} ر.س</div>
                  <p className="text-xs text-muted-foreground">إجمالي ما تم صرفه حتى الآن</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">المتبقي من الميزانية</CardTitle>
                  <TrendingUp className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.remaining.toLocaleString()} ر.س</div>
                  <p className="text-xs text-muted-foreground">المبلغ المتاح للصرف</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <Card className="shadow-xl rounded-2xl lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AreaChart className="text-primary"/> المصروفات التراكمية</CardTitle>
                        <CardDescription>تتبع معدل الصرف مقابل الميزانية</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ChartContainer config={{}} className="h-[300px] w-full">
                           <RechartsAreaChart data={spendingOverTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="spent" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" />
                            </RechartsAreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                 <Card className="shadow-xl rounded-2xl lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><PieChartIcon className="text-primary"/> توزيع المصروفات حسب الفئة</CardTitle>
                        <CardDescription>نظرة على بنود الصرف الرئيسية</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}} className="h-[300px] w-full">
                             <PieChart>
                                <Tooltip content={<ChartTooltipContent />} />
                                <Legend />
                                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                    {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>


            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle>سجل المعاملات المالية</CardTitle>
                <CardDescription>جميع المصروفات المسجلة لمشروع: {selectedProject.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>الوصف</TableHead>
                      <TableHead>الفئة</TableHead>
                      <TableHead className="text-right">المبلغ (ر.س)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectTransactions.length > 0 ? projectTransactions.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell>{new Date(t.date).toLocaleDateString('ar-SA')}</TableCell>
                        <TableCell className="font-medium">{t.description}</TableCell>
                        <TableCell>{t.category}</TableCell>
                        <TableCell className="text-right font-mono text-destructive">{t.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-10">
                          {projectTransactions.length === 0 && !selectedProjectId
                            ? "الرجاء اختيار مشروع."
                            : "لا توجد معاملات مسجلة لهذا المشروع بعد. ابدأ بإضافة معاملة."
                          }
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="shadow-lg rounded-2xl flex items-center justify-center min-h-[400px]">
            <div className="text-center text-muted-foreground">
              <Scale className="w-12 h-12 mx-auto mb-4" />
              <p className="font-semibold">الرجاء اختيار مشروع من القائمة أعلاه</p>
              <p className="text-sm">لعرض بياناته المالية وإدارة معاملاته.</p>
            </div>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>إضافة معاملة مالية جديدة</DialogTitle>
              <DialogDescription>
                أدخل تفاصيل المصروف الجديد ليتم تسجيله في سجل المشروع.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-1">
                <Label htmlFor="description">الوصف</Label>
                <Controller name="description" control={control} render={({ field }) => <Input id="description" {...field} />} />
                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="amount">المبلغ (ر.س)</Label>
                <Controller name="amount" control={control} render={({ field }) => <Input id="amount" type="number" {...field} />} />
                 {errors.amount && <p className="text-xs text-destructive">{errors.amount.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="category">الفئة</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                       <SelectTrigger id="category">
                         <SelectValue placeholder="اختر فئة المصروف" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="مواد بناء">مواد بناء</SelectItem>
                         <SelectItem value="أجور عمال">أجور عمال</SelectItem>
                         <SelectItem value="معدات">إيجار معدات</SelectItem>
                         <SelectItem value="مقاول باطن">مقاول باطن</SelectItem>
                         <SelectItem value="رسوم وتصاريح">رسوم وتصاريح</SelectItem>
                         <SelectItem value="نقل ولوجستيات">نقل ولوجستيات</SelectItem>
                         <SelectItem value="مصاريف إدارية">مصاريف إدارية</SelectItem>
                         <SelectItem value="أخرى">أخرى</SelectItem>
                       </SelectContent>
                    </Select>
                  )}
                />
                 {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
              </div>
               <div className="space-y-1">
                <Label htmlFor="date">التاريخ</Label>
                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                         <DatePicker 
                            id="date"
                            date={field.value}
                            onDateChange={field.onChange}
                        />
                    )}
                />
                 {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">حفظ المعاملة</Button>
              <DialogClose asChild>
                  <Button type="button" variant="secondary">إلغاء</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

    