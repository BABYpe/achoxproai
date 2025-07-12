
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function AssetsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">الأصول والموارد</h1>
      </div>
      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="items-center text-center">
            <Wrench className="w-12 h-12 text-primary mb-4" />
            <CardTitle>قيد التطوير</CardTitle>
            <CardDescription>
                نعمل حاليًا على بناء هذا القسم. سيشمل سجلًا للأصول، جدولة ذكية للصيانة، ومخططًا لتوزيع فرق العمل.
            </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
            <p>ترقبوا إطلاق هذه الميزة قريبًا!</p>
        </CardContent>
      </Card>
    </div>
  );
}
