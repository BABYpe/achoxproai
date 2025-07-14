
"use client"

import React, { useEffect } from 'react';
import Link from "next/link"
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Calculator,
  ListChecks,
  Settings,
  Search,
  Bell,
  FilePieChart,
  Briefcase,
  CircleDollarSign,
  ShoppingCart,
  Warehouse,
  Wrench,
  ClipboardType,
  Send,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarTitle,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserNav } from '@/components/user-nav';
import { Logo } from '@/components/logo';
import { useProjectStore } from '@/hooks/use-project-store';
import { Separator } from '@/components/ui/separator';
import { GanttChartIcon } from '@/components/icons/gantt-chart-icon';
import { UsersGroupIcon } from '@/components/icons/users-group-icon';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const fetchProjects = useProjectStore((state) => state.fetchProjects);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const isActive = (path: string) => pathname === path;
  const isProjectsActive = pathname.startsWith('/dashboard/projects');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        <Sidebar>
          <SidebarHeader className="h-20 flex items-center justify-center text-center p-2">
            <Link href="/dashboard" className="flex flex-col items-center gap-1 group-data-[collapsible=icon]:hidden">
              <Logo className="h-12 w-12 text-primary" />
              <SidebarTitle className="text-lg font-bold">AchoX Pro AI</SidebarTitle>
            </Link>
            <Link href="/dashboard" className="hidden group-data-[collapsible=icon]:flex">
              <Logo className="w-8 h-8 text-primary" />
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard')} tooltip="لوحة التحكم">
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>لوحة التحكم</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Separator className="my-2" />
              <p className="text-xs font-semibold text-sidebar-foreground/60 px-3 py-1 group-data-[collapsible=icon]:hidden">التخطيط</p>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/cost-estimation')} tooltip="تقدير التكاليف">
                  <Link href="/dashboard/cost-estimation">
                    <Calculator />
                    <span>تقدير التكاليف</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/gantt-charts')} tooltip="مخطط جانت">
                  <Link href="/dashboard/gantt-charts">
                    <GanttChartIcon />
                    <span>مخطط جانت</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/crew-planner')} tooltip="مخطط الطاقم">
                  <Link href="/dashboard/crew-planner">
                    <UsersGroupIcon />
                    <span>مخطط الطاقم</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <Separator className="my-2" />
              <p className="text-xs font-semibold text-sidebar-foreground/60 px-3 py-1 group-data-[collapsible=icon]:hidden">التنفيذ</p>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isProjectsActive} tooltip="المشاريع">
                  <Link href="/dashboard/projects">
                    <Briefcase />
                    <span>المشاريع</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/procurement')} tooltip="المشتريات">
                  <Link href="/dashboard/procurement">
                    <ShoppingCart />
                    <span>المشتريات</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
               <Separator className="my-2" />
               <p className="text-xs font-semibold text-sidebar-foreground/60 px-3 py-1 group-data-[collapsible=icon]:hidden">التحليل والنمو</p>

                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/financial-intelligence')} tooltip="الذكاء المالي">
                    <Link href="/dashboard/financial-intelligence">
                        <CircleDollarSign />
                        <span>الذكاء المالي</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/reports')} tooltip="التقارير">
                    <Link href="/dashboard/reports">
                        <FilePieChart />
                        <span>التقارير</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/blueprints')} tooltip="تحليل المخططات">
                    <Link href="/dashboard/blueprints">
                        <FileText />
                        <span>تحليل المخططات</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/marketing-automations')} tooltip="المسوق الذكي">
                    <Link href="/dashboard/marketing-automations">
                        <Send />
                        <span>المسوق الذكي</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
               
               <Separator className="my-2" />
               <p className="text-xs font-semibold text-sidebar-foreground/60 px-3 py-1 group-data-[collapsible=icon]:hidden">الموارد</p>

                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/inventory')} tooltip="المخزون">
                    <Link href="/dashboard/inventory">
                        <Warehouse />
                        <span>المخزون</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/assets')} tooltip="الأصول والموارد">
                  <Link href="/dashboard/assets">
                    <Wrench />
                    <span>الأصول والموارد</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/boq')} tooltip="جداول الكميات">
                  <Link href="/dashboard/boq">
                    <ListChecks />
                    <span>جداول الكميات</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/templates')} tooltip="مكتبة القوالب">
                  <Link href="/dashboard/templates">
                    <ClipboardType />
                    <span>مكتبة القوالب</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/settings')} tooltip="الإعدادات">
                  <Link href="/dashboard/settings">
                    <Settings />
                    <span>الإعدادات</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 bg-secondary/50">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="relative flex-1 ml-auto md:grow-0">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="بحث..."
                className="w-full rounded-lg bg-secondary pr-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <UserNav />
          </header>
          <div className="p-4 sm:px-6 sm:py-4">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
