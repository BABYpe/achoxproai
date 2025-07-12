
"use client"

import React from 'react';
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { projects } = useProjectStore();

  const isActive = (path: string) => pathname === path;
  const isProjectsActive = pathname.startsWith('/dashboard/projects');
  const isProjectDetailsActive = /^\/dashboard\/projects\/[^/]+$/.test(pathname);

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
                <SidebarMenuButton href="/dashboard" isActive={isActive('/dashboard')} tooltip="لوحة التحكم">
                  <LayoutDashboard />
                  <span>لوحة التحكم</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Separator className="my-2" />
              
              <p className="text-xs font-semibold text-sidebar-foreground/60 px-3 py-1 group-data-[collapsible=icon]:hidden">التخطيط والمناقصات</p>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isProjectsActive || isProjectDetailsActive} tooltip="المشاريع">
                  <Link href="/dashboard/projects">
                    <Briefcase />
                    <span>المشاريع</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/blueprints" isActive={isActive('/dashboard/blueprints')} tooltip="تحليل المخططات">
                  <FileText />
                  <span>تحليل المخططات</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/cost-estimation" isActive={pathname.startsWith('/dashboard/cost-estimation')} tooltip="تقدير التكاليف">
                  <Calculator />
                  <span>تقدير التكاليف</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Separator className="my-2" />

              <p className="text-xs font-semibold text-sidebar-foreground/60 px-3 py-1 group-data-[collapsible=icon]:hidden">إدارة وتشغيل</p>
              
               <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/financial-intelligence" isActive={isActive('/dashboard/financial-intelligence')} tooltip="الذكاء المالي">
                  <CircleDollarSign />
                  <span>الذكاء المالي</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/procurement" isActive={isActive('/dashboard/procurement')} tooltip="المشتريات والموردون">
                  <ShoppingCart />
                  <span>المشتريات</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/inventory" isActive={isActive('/dashboard/inventory')} tooltip="المخزون والمستودعات">
                  <Warehouse />
                  <span>المخزون</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/assets" isActive={isActive('/dashboard/assets')} tooltip="الأصول والموارد">
                  <Wrench />
                  <span>الأصول والموارد</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

               <Separator className="my-2" />
               <p className="text-xs font-semibold text-sidebar-foreground/60 px-3 py-1 group-data-[collapsible=icon]:hidden">أدوات مساعدة</p>

              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/boq" isActive={isActive('/dashboard/boq')} tooltip="جداول الكميات">
                  <ListChecks />
                  <span>جداول الكميات</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/reports" isActive={isActive('/dashboard/reports')} tooltip="التقارير">
                  <FilePieChart />
                  <span>التقارير</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/settings" isActive={isActive('/dashboard/settings')} tooltip="الإعدادات">
                  <Settings />
                  <span>الإعدادات</span>
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
