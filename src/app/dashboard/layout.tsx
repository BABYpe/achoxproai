
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
  HardHat,
  FilePieChart,
  Briefcase,
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
  SidebarInset,
  SidebarTitle,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserNav } from '@/components/user-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Sidebar>
          <SidebarHeader className="h-20 flex items-center justify-center text-center p-2">
              <div className="flex flex-col items-center gap-1 group-data-[collapsible=icon]:hidden">
                <div className="bg-primary/20 p-2 rounded-lg">
                    <HardHat className="h-6 w-6 text-primary" />
                </div>
                <SidebarTitle className="text-lg font-bold">AchoX Pro AI</SidebarTitle>
              </div>
               <div className="hidden group-data-[collapsible=icon]:flex">
                  <HardHat className="h-6 w-6 text-primary" />
              </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard" isActive={pathname === '/dashboard'} tooltip="لوحة التحكم">
                  <LayoutDashboard />
                  <span>لوحة التحكم</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/projects" isActive={pathname === '/dashboard/projects'} tooltip="المشاريع">
                  <Briefcase />
                  <span>المشاريع</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/blueprints" isActive={pathname === '/dashboard/blueprints'} tooltip="المخططات">
                  <FileText />
                  <span>المخططات</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/cost-estimation" isActive={pathname.startsWith('/dashboard/cost-estimation')} tooltip="تقدير التكاليف">
                  <Calculator />
                  <span>تقدير التكاليف</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/boq" isActive={pathname === '/dashboard/boq'} tooltip="جداول الكميات">
                  <ListChecks />
                  <span>جداول الكميات</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/reports" isActive={pathname === '/dashboard/reports'} tooltip="التقارير">
                  <FilePieChart />
                  <span>التقارير</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <SidebarMenu>
              <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/settings" isActive={pathname === '/dashboard/settings'} tooltip="الإعدادات">
                    <Settings />
                    <span>الإعدادات</span>
                  </SidebarMenuButton>
              </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="md:hidden"/>
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
          <main className="p-4 sm:px-6 sm:py-0">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
