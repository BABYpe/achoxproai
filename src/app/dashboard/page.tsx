import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, MoreVertical, Building, TrendingUp, DollarSign, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

const projects = [
  {
    title: "مشروع فيلا سكنية",
    status: "قيد التنفيذ",
    variant: "default",
    location: "الرياض",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "modern villa",
    progress: 65,
    budget: "1.2M SAR",
  },
  {
    title: "مبنى تجاري متعدد الطوابق",
    status: "مكتمل",
    variant: "secondary",
    location: "جدة",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "commercial building",
    progress: 100,
    budget: "5.5M SAR",
  },
  {
    title: "تطوير مجمع سكني",
    status: "مخطط له",
    variant: "outline",
    location: "الدمام",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "residential complex",
    progress: 0,
    budget: "25M SAR",
  },
    {
    title: "تجديد فندق فاخر",
    status: "متأخر",
    variant: "destructive",
    location: "دبي",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "luxury hotel",
    progress: 40,
    budget: "12M SAR",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">المشاريع</h1>
        <Button className="gap-1">
          <PlusCircle className="h-4 w-4" />
          إنشاء مشروع جديد
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
            <CardHeader className="p-0">
              <div className="relative">
                <Image src={project.imageUrl} alt={project.title} width={600} height={400} className="w-full h-40 object-cover" data-ai-hint={project.imageHint}/>
                <div className="absolute top-2 left-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white border-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem>تعديل</DropdownMenuItem>
                        <DropdownMenuItem>أرشيف</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">حذف</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
                <Badge variant={project.variant as any} className="mb-2">{project.status}</Badge>
                <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <Building className="h-4 w-4" />
                    <span>{project.location}</span>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-muted-foreground">التقدم</span>
                        <span className="text-sm font-bold text-primary">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 bg-secondary/50 flex justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="font-medium">{project.budget}</span>
                </div>
                 <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span className="font-medium">3 أشهر متبقية</span>
                </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
