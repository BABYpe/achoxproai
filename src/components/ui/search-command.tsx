"use client";

import * as React from "react";
import {
  File,
  Home,
  LayoutDashboard,
  ListChecks,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export function SearchCommand() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <p className="fixed bottom-0 left-0 right-0 hidden border-t border-t-muted bg-background p-1 text-center text-sm text-muted-foreground print:hidden xl:block">
        اضغط على{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>{" "}
        للبحث السريع
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="اكتب أمرًا أو ابحث..." />
        <CommandList>
          <CommandEmpty>لا توجد نتائج.</CommandEmpty>
          <CommandGroup heading="اقتراحات">
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/projects/new"))}>
              <File className="mr-2 h-4 w-4" />
              <span>إنشاء مشروع جديد</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>عرض الإعدادات</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/boq"))}>
              <ListChecks className="mr-2 h-4 w-4" />
              <span>تصفح جداول الكميات</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="التنقل">
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                لوحة التحكم
            </CommandItem>
             <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/projects"))}>
                <Home className="mr-2 h-4 w-4" />
                المشاريع
            </CommandItem>
             <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings"))}>
                <User className="mr-2 h-4 w-4" />
                الملف الشخصي
            </CommandItem>
          </CommandGroup>
           <CommandSeparator />
          <CommandGroup heading="المظهر">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>فاتح</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>داكن</span>
            </CommandItem>
             <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>النظام</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
