
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Warehouse } from "lucide-react";

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">المخزون والمستودعات</h1>
      </div>
      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="items-center text-center">
            <Warehouse className="w-12 h-12 text-primary mb-4" />
            <CardTitle>قيد التطوير</CardTitle>
            <CardDescription>
               نعمل حاليًا على بناء هذا القسم. سيشمل لوحة تحكم للمخزون مع تنبؤات ذكية وقائمة لإدارة المواد وحركتها.
            </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
            <p>ترقبوا إطلاق هذه الميزة قريبًا!</p>
        </CardContent>
      </Card>
    </div>
  );
}
