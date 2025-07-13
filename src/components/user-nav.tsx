
"use client"

import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu"
import { CreditCard, LogOut, Settings, User, Moon, Sun, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/lib/auth";

export function UserNav() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { i18n } = useTranslation();
  const { toast } = useToast();
  const currentUser = useCurrentUser();


  const handleLogout = () => {
    // In a real app, you'd clear the user session here
    router.push('/login');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }
  
  const handleBillingClick = () => {
    if (currentUser.isAdmin) {
       toast({
        title: "مرحباً أيها المسؤول",
        description: "قسم الفواتير متاح لك للتجربة والتطوير."
       })
    } else {
        toast({
            title: "قريباً",
            description: "ستكون ميزة الفوترة متاحة في الإصدارات القادمة للخطط المدفوعة."
        })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} data-ai-hint="person face" />
            <AvatarFallback>{currentUser.fallback}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{currentUser.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => router.push('/dashboard/settings')}>
            <User className="ml-2 h-4 w-4" />
            <span>الملف الشخصي</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleBillingClick}>
            <CreditCard className="ml-2 h-4 w-4" />
            <span>الفواتير</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push('/dashboard/settings')}>
            <Settings className="ml-2 h-4 w-4" />
            <span>الإعدادات</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
         <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                <Globe className="ml-2 h-4 w-4" />
                <span>تغيير اللغة</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => changeLanguage('ar')}>العربية</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem disabled>Français (soon)</DropdownMenuItem>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
         <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ml-2" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 ml-2" />
                <span>تغيير المظهر</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>فاتح</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>داكن</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>النظام</DropdownMenuItem>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOut className="ml-2 h-4 w-4" />
          <span>تسجيل الخروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
