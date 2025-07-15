
"use client"

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
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UserNav() {
  const { setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const currentUser = useCurrentUser();
  const router = useRouter();


  const handleLogout = () => {
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
            <p className="text-sm font-medium leading-none">{t('userNav.greeting', { name: currentUser.name })}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {t('userNav.email', { email: currentUser.email })}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => router.push('/dashboard/settings')}>
            <User className="ml-2 h-4 w-4" />
            <span>{t('userNav.profile')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleBillingClick}>
            <CreditCard className="ml-2 h-4 w-4" />
            <span>{t('userNav.billing')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push('/dashboard/settings')}>
            <Settings className="ml-2 h-4 w-4" />
            <span>{t('userNav.settings')}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
         <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                <Globe className="ml-2 h-4 w-4" />
                <span>{t('userNav.changeLanguage')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => changeLanguage('ar')}>{t('userNav.language.ar')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')}>{t('userNav.language.en')}</DropdownMenuItem>
                <DropdownMenuItem disabled>{t('userNav.language.fr')}</DropdownMenuItem>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
         <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ml-2" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 ml-2" />
                <span>{t('userNav.changeTheme')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>{t('userNav.theme.light')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>{t('userNav.theme.dark')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>{t('userNav.theme.system')}</DropdownMenuItem>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOut className="ml-2 h-4 w-4" />
          <span>{t('userNav.logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
