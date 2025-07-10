
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HardHat, Bot, GanttChartSquare, FileScan, CheckCircle, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <HardHat className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">AchoX Pro AI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              الميزات
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              آراء العملاء
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              الأسعار
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
                <Link href="/login">تسجيل الدخول</Link>
            </Button>
            <Button asChild>
                <Link href="/register">
                    ابدأ الآن مجاناً <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
            <div aria-hidden="true" className="absolute inset-0 top-0 h-full w-full bg-background [mask-image:radial-gradient(300px_at_center,white,transparent)]"></div>
            <div className="container mx-auto px-4 text-center">
                <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                    منصة إدارة المشاريع الهندسية المدعومة بالذكاء الاصطناعي
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
                    من التخطيط إلى التسليم، أتمتة شاملة لمشاريعك
                </h1>
                <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                    AchoX Pro AI هو شريكك الذكي الذي يقرأ كراسات الشروط، يحلل المخططات، يسعّر المشاريع بدقة، ويولد خطط عمل متكاملة. حوّل التعقيد إلى بساطة وكفاءة.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="/register">ابدأ تجربتك المجانية</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/dashboard">استكشف لوحة التحكم</Link>
                    </Button>
                </div>
                <div className="mt-12">
                    <Image
                        src="https://placehold.co/1200x600.png"
                        alt="لوحة تحكم AchoX Pro AI"
                        width={1200}
                        height={600}
                        className="mx-auto rounded-2xl border bg-secondary shadow-2xl"
                        data-ai-hint="dashboard user interface"
                        priority
                    />
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold md:text-4xl">محركك الذكي لإدارة المشاريع المتكاملة</h2>
              <p className="mt-4 text-muted-foreground">
                نقدم لك مجموعة من الأدوات الثورية المصممة لقطاع المقاولات والفعاليات، لتحقيق دقة وسرعة لا مثيل لهما.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="text-center shadow-lg rounded-2xl p-4">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <FileScan className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">قراءة المستندات والمخططات</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  قم برفع كراسة الشروط أو المخططات الهندسية، وسيقوم الذكاء الاصطناعي باستخراج وتحليل البنود والكميات تلقائياً.
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg rounded-2xl p-4">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Bot className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">تسعير وتخطيط ذكي</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  أدخل تفاصيل المشروع واحصل على جدول كميات (BOQ) مفصل، خطة عمل (Gantt Chart)، وتوصيات لفريق العمل في ثوانٍ.
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg rounded-2xl p-4">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <GanttChartSquare className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">تقارير وإدارة متكاملة</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  أنشئ تقارير حالة المشروع، وتابع الإنجاز، وأدر جميع جوانب مشاريعك من لوحة تحكم واحدة متكاملة وسهلة الاستخدام.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold md:text-4xl">يثق بنا قادة قطاع الإنشاءات والفعاليات</h2>
              <p className="mt-4 text-muted-foreground">
                هذا ما يقوله عملاؤنا عن تجربتهم مع AchoX Pro AI.
              </p>
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
                <Card className="p-6 shadow-lg rounded-2xl">
                    <CardContent className="p-0">
                        <div className="flex items-center gap-4">
                            <Image src="https://placehold.co/40x40.png" width={40} height={40} alt="User 1" className="rounded-full" data-ai-hint="person face" />
                            <div>
                                <p className="font-semibold">م. خالد الأحمدي</p>
                                <p className="text-sm text-muted-foreground">مدير مشاريع، شركة البناء الحديث</p>
                            </div>
                        </div>
                        <p className="mt-4 text-muted-foreground">"منصة AchoX Pro AI غيرت طريقة عملنا تمامًا. أصبح تقدير التكاليف وتوليد جداول الكميات أسرع وأكثر دقة بنسبة 95%."</p>
                    </CardContent>
                </Card>
                <Card className="p-6 shadow-lg rounded-2xl">
                    <CardContent className="p-0">
                        <div className="flex items-center gap-4">
                            <Image src="https://placehold.co/40x40.png" width={40} height={40} alt="User 2" className="rounded-full" data-ai-hint="woman face" />
                            <div>
                                <p className="font-semibold">نورة القحطاني</p>
                                <p className="text-sm text-muted-foreground">منظمة فعاليات، شركة إبداع</p>
                            </div>
                        </div>
                        <p className="mt-4 text-muted-foreground">"أداة تخطيط المشاريع مذهلة! أصبح بإمكاني تجهيز خطة متكاملة لأي فعالية، من التكاليف إلى الجدول الزمني، في دقائق معدودة."</p>
                    </CardContent>
                </Card>
                <Card className="p-6 shadow-lg rounded-2xl">
                    <CardContent className="p-0">
                        <div className="flex items-center gap-4">
                            <Image src="https://placehold.co/40x40.png" width={40} height={40} alt="User 3" className="rounded-full" data-ai-hint="man face" />
                            <div>
                                <p className="font-semibold">عمر بن صالح</p>
                                <p className="text-sm text-muted-foreground">الرئيس التنفيذي، مقاولات النخبة</p>
                            </div>
                        </div>
                        <p className="mt-4 text-muted-foreground">"أفضل استثمار قمنا به هذا العام. التقارير التلقائية والجداول الزمنية تساعدنا على اتخاذ قرارات أفضل وتتبع الإنجاز بدقة."</p>
                    </CardContent>
                </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-24 bg-secondary/50">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold md:text-4xl">خطة أسعار مرنة تناسب الجميع</h2>
                    <p className="mt-4 text-muted-foreground">
                        اختر الخطة التي تناسب حجم أعمالك واحتياجات فريقك.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Free Plan */}
                    <Card className="shadow-lg rounded-2xl border-2 flex flex-col">
                        <CardHeader>
                            <CardTitle>الخطة الأساسية</CardTitle>
                            <p className="text-4xl font-bold">مجاناً</p>
                            <p className="text-muted-foreground">للمهندسين الأفراد والفرق الصغيرة.</p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center"><CheckCircle className="ml-2 h-5 w-5 text-green-500" /> مشروع واحد</li>
                                <li className="flex items-center"><CheckCircle className="ml-2 h-5 w-5 text-green-500" /> 5 تحليلات للمخططات شهرياً</li>
                                <li className="flex items-center"><CheckCircle className="ml-2 h-5 w-5 text-green-500" /> 5 تقارير شهرياً</li>
                            </ul>
                        </CardContent>
                        <div className="p-6 pt-0">
                           <Button className="w-full" variant="outline" asChild><Link href="/register">ابدأ الآن</Link></Button>
                        </div>
                    </Card>
                    {/* Pro Plan */}
                    <Card className="shadow-lg rounded-2xl border-2 border-primary relative flex flex-col">
                        <div className="absolute top-0 right-4 -mt-3 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">الأكثر شيوعاً</div>
                        <CardHeader>
                            <CardTitle>الخطة الاحترافية</CardTitle>
                            <p className="text-4xl font-bold">199 ر.س<span className="text-lg font-normal text-muted-foreground">/شهرياً</span></p>
                            <p className="text-muted-foreground">للشركات النامية والفرق المحترفة.</p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center"><CheckCircle className="ml-2 h-5 w-5 text-green-500" /> 10 مشاريع</li>
                                <li className="flex items-center"><CheckCircle className="ml-2 h-5 w-5 text-green-500" /> تحليلات غير محدودة</li>
                                <li className="flex items-center"><CheckCircle className="ml-2 h-5 w-5 text-green-500" /> تقارير غير محدودة</li>
                                <li className="flex items-center"><CheckCircle className="ml-2 h-5 w-5 text-green-500" /> دعم فني عبر البريد الإلكتروني</li>
                            </ul>
                        </CardContent>
                        <div className="p-6 pt-0">
                             <Button className="w-full" asChild><Link href="/register">اختر الخطة الاحترافية</Link></Button>
                        </div>
                    </Card>
                    {/* Enterprise Plan */}
                    <Card className="shadow-lg rounded-2xl border-2 flex flex-col">
                        <CardHeader>
                            <CardTitle>خطة الشركات</CardTitle>
                            <p className="text-4xl font-bold">تواصل معنا</p>
                            <p className="text-muted-foreground">للشركات الكبيرة والمتطلبات المخصصة.</p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                             <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center"><CheckCircle className="ml-2 h-5 w-5 text-green-500" /> مشاريع غير محدودة</li>
                                <li className="flex items-center"><CheckCircle className="ml-2 h-5 w-5 text-green-500" /> واجهات برمجية (API)</li>
                                <li className="flex items-center"><CheckCircle className="ml-2 h-5 w-5 text-green-500" /> مدير حساب مخصص</li>
                                <li className="flex items-center"><CheckCircle className="ml-2 h-5 w-5 text-green-500" /> دعم فني على مدار الساعة</li>
                            </ul>
                        </CardContent>
                         <div className="p-6 pt-0">
                            <Button className="w-full" variant="outline" asChild><Link href="/contact-sales">تواصل مع المبيعات</Link></Button>
                        </div>
                    </Card>
                </div>
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <div className="flex items-center gap-2">
            <HardHat className="h-6 w-6 text-primary" />
            <span className="font-bold">AchoX Pro AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AchoX Pro AI. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              سياسة الخصوصية
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              شروط الخدمة
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
