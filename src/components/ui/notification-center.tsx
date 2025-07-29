"use client";

import { useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './card';

const notifications = [
  { id: 1, type: 'project', text: "تم تحديث حالة مشروع 'بناء فيلا الياسمين' إلى مكتمل.", time: 'منذ 5 دقائق', read: false },
  { id: 2, type: 'task', text: "تم تعيين مهمة جديدة لك: 'مراجعة المخططات الكهربائية'.", time: 'منذ 2 ساعة', read: false },
  { id: 3, type: 'mention', text: "علي محمد أشار إليك في تعليق على مشروع 'برج المكاتب'.", time: 'منذ يوم', read: true },
  { id: 4, type: 'system', text: "تحديث جديد للنظام متاح الآن. اطلع على الميزات الجديدة!", time: 'منذ 3 أيام', read: true },
];

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-destructive text-xs font-bold text-destructive-foreground flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-none shadow-none">
          <CardHeader className='p-4'>
            <CardTitle>الإشعارات</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
             <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full grid grid-cols-2 px-2">
                    <TabsTrigger value="all">الكل</TabsTrigger>
                    <TabsTrigger value="unread">غير مقروءة ({unreadCount})</TabsTrigger>
                </TabsList>
                <div className="max-h-80 overflow-y-auto p-4 space-y-3">
                    <TabsContent value="all" className="m-0">
                        {notifications.map(n => (
                            <div key={n.id} className={`p-2 rounded-md ${!n.read ? 'bg-secondary/50' : ''}`}>
                                <p className="text-sm">{n.text}</p>
                                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                            </div>
                        ))}
                    </TabsContent>
                    <TabsContent value="unread" className="m-0">
                        {notifications.filter(n => !n.read).map(n => (
                             <div key={n.id} className="p-2 rounded-md bg-secondary/50">
                                <p className="text-sm">{n.text}</p>
                                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                            </div>
                        ))}
                         {unreadCount === 0 && <p className="text-sm text-center text-muted-foreground py-4">لا توجد إشعارات غير مقروءة.</p>}
                    </TabsContent>
                </div>
            </Tabs>
          </CardContent>
          <CardFooter className="p-2 border-t">
              <Button variant="ghost" size="sm" className="w-full gap-2">
                <CheckCheck className="w-4 h-4"/>
                تحديد الكل كمقروء
              </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
