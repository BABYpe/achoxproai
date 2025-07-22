
"use client"

import React, { useEffect } from 'react';
import Link from "next/link"
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, FileText, Calculator, ListChecks, Settings, Search, Bell, FilePieChart, Briefcase, FileSignature, Send, ShieldAlert, Wand2, Warehouse, Wrench, ClipboardType } from 'lucide-react';

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
  SidebarSub,
  SidebarSubTrigger,
  SidebarSubContent,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserNav } from '@/components/user-nav';
import { Logo } from '@/components/logo';
import { useProjectStore } from '@/hooks/use-project-store';
import { Separator } from '@/components/ui/separator';
import { GanttChartIcon } from '@/components/icons/gantt-chart-icon';
import { UsersGroupIcon } from '@/components/icons/users-group-icon';


function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const { t } = useTranslation();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const isActive = (path: string) => pathname === path;
  const isProjectsActive = pathname.startsWith('/dashboard/projects');
  const isProcurementActive = pathname.startsWith('/dashboard/procurement');
  const isQuotesActive = pathname.startsWith('/dashboard/quotes');
  
  return (
      <div className="min-h-screen flex">
        <Sidebar>
          <SidebarHeader className="h-20 flex items-center justify-center text-center p-2">
            <Link href="/dashboard" className="flex flex-col items-center gap-1 group-data-[collapsible=icon]:hidden">
              <Logo className="h-12 w-12 text-primary" />
              <SidebarTitle className="text-lg font-bold">AchoX Pro</SidebarTitle>
            </Link>
            <Link href="/dashboard" className="hidden group-data-[collapsible=icon]:flex">
              <Logo className="w-8 h-8 text-primary" />
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard')} tooltip={t('sidebar.dashboard')}>
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>{t('sidebar.dashboard')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Separator className="my-2" />
              <p className="text-xs font-semibold text-sidebar-foreground/60 px-3 py-1 group-data-[collapsible=icon]:hidden">{t('sidebar.planning')}</p>
              
               <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/ai-designer')} tooltip={t('sidebar.aiDesigner')}>
                  <Link href="/dashboard/ai-designer">
                    <Wand2 />
                    <span>{t('sidebar.aiDesigner')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/projects/new')} tooltip={t('sidebar.costEstimation')}>
                  <Link href="/dashboard/projects/new">
                    <Calculator />
                    <span>{t('sidebar.costEstimation')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/gantt-charts')} tooltip={t('sidebar.ganttChart')}>
                  <Link href="/dashboard/gantt-charts">
                    <GanttChartIcon />
                    <span>{t('sidebar.ganttChart')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/crew-planner')} tooltip={t('sidebar.crewPlanner')}>
                  <Link href="/dashboard/crew-planner">
                    <UsersGroupIcon />
                    <span>{t('sidebar.crewPlanner')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <Separator className="my-2" />
              <p className="text-xs font-semibold text-sidebar-foreground/60 px-3 py-1 group-data-[collapsible=icon]:hidden">{t('sidebar.execution')}</p>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isProjectsActive} tooltip={t('sidebar.projects')}>
                  <Link href="/dashboard/projects">
                    <Briefcase />
                    <span>{t('sidebar.projects')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
                <SidebarSub>
                  <SidebarSubTrigger isActive={isProcurementActive || isQuotesActive || pathname.startsWith('/dashboard/financial-intelligence')} tooltip={t('sidebar.contractsAndFinance')}>
                     <FileSignature />
                    <span>{t('sidebar.contractsAndFinance')}</span>
                  </SidebarSubTrigger>
                  <SidebarSubContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isProcurementActive}>
                                <Link href="/dashboard/procurement">{t('sidebar.procurement')}</Link>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                             <SidebarMenuSubButton asChild isActive={isQuotesActive}>
                                <Link href="/dashboard/quotes">{t('sidebar.quotes')}</Link>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                         <SidebarMenuSubItem>
                             <SidebarMenuSubButton asChild isActive={isActive('/dashboard/financial-intelligence')}>
                                <Link href="/dashboard/financial-intelligence">{t('sidebar.financialIntelligence')}</Link>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                  </SidebarSubContent>
              </SidebarSub>
              
               <Separator className="my-2" />
               <p className="text-xs font-semibold text-sidebar-foreground/60 px-3 py-1 group-data-[collapsible=icon]:hidden">{t('sidebar.analysisAndGrowth')}</p>

                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/reports')} tooltip={t('sidebar.reports')}>
                    <Link href="/dashboard/reports">
                        <FilePieChart />
                        <span>{t('sidebar.reports')}</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/blueprints')} tooltip={t('sidebar.blueprintAnalysis')}>
                    <Link href="/dashboard/blueprints">
                        <FileText />
                        <span>{t('sidebar.blueprintAnalysis')}</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/risk-analysis')} tooltip={t('sidebar.riskAnalysis')}>
                    <Link href="/dashboard/risk-analysis">
                        <ShieldAlert />
                        <span>{t('sidebar.riskAnalysis')}</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/marketing-automations')} tooltip={t('sidebar.smartMarketer')}>
                    <Link href="/dashboard/marketing-automations">
                        <Send />
                        <span>{t('sidebar.smartMarketer')}</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
               
               <Separator className="my-2" />
               <p className="text-xs font-semibold text-sidebar-foreground/60 px-3 py-1 group-data-[collapsible=icon]:hidden">{t('sidebar.resources')}</p>

                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/inventory')} tooltip={t('sidebar.inventory')}>
                    <Link href="/dashboard/inventory">
                        <Warehouse />
                        <span>{t('sidebar.inventory')}</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/assets')} tooltip={t('sidebar.assets')}>
                  <Link href="/dashboard/assets">
                    <Wrench />
                    <span>{t('sidebar.assets')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/boq')} tooltip={t('sidebar.boq')}>
                  <Link href="/dashboard/boq">
                    <ListChecks />
                    <span>{t('sidebar.boq')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/templates')} tooltip={t('sidebar.templates')}>
                  <Link href="/dashboard/templates">
                    <ClipboardType />
                    <span>{t('sidebar.templates')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/document-control')} tooltip={t('sidebar.documentCenter')}>
                  <Link href="/dashboard/document-control">
                    <ClipboardType />
                    <span>{t('sidebar.documentCenter')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/settings')} tooltip={t('sidebar.settings')}>
                  <Link href="/dashboard/settings">
                    <Settings />
                    <span>{t('sidebar.settings')}</span>
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
                placeholder={t('searchPlaceholder')}
                className="w-full rounded-lg bg-secondary pr-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label={t('notifications')}
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
  )
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SidebarProvider>
      <DashboardLayoutContent>
        {children}
      </DashboardLayoutContent>
    </SidebarProvider>
  );
}
