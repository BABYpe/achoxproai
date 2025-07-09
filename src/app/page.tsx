
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HardHat, Cpu, FileText, BarChart, Users, CheckCircle, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <HardHat className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">AchoX Pro</span>
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
            <Button asChild className="shadow-lg shadow-primary/30">
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
                    حوّل مشاريعك الإنشائية إلى نجاحات باهرة
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                    منصة AchoX Pro تمنحك الأدوات الذكية لتحليل المخططات، تقدير التكاليف بدقة، وإدارة مشاريعك بكفاءة لا مثيل لها.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button size="lg" asChild className="font-bold text-lg py-7 px-8 shadow-lg shadow-primary/40">
                        <Link href="/register">ابدأ تجربتك المجانية</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="font-bold text-lg py-7 px-8">
                        <Link href="/login">طلب عرض توضيحي</Link>
                    </Button>
                </div>
                <div className="mt-12">
                    <Image
                        src="https://placehold.co/1200x600.png"
                        alt="لوحة تحكم AchoX Pro"
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
              <h2 className="text-3xl font-bold md:text-4xl">كل ما تحتاجه لإدارة مشاريعك الهندسية</h2>
              <p className="mt-4 text-muted-foreground">
                نقدم لك مجموعة متكاملة من الأدوات الذكية المصممة خصيصًا لشركات المقاولات والمهندسين.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="text-center shadow-lg rounded-2xl">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">تحليل المخططات بالذكاء الاصطناعي</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  قم برفع مخططاتك واحصل على تحليل فوري للكميات والمساحات وتعداد العناصر بدقة عالية.
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg rounded-2xl">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BarChart className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">تقدير التكاليف بدقة</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                    استخدم أسعار السوق المحدثة لتقدير تكاليف المواد والعمالة لمشاريعك في أي مكان.
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg rounded-2xl">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">توليد تقارير احترافية</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  أنشئ تقارير حالة المشروع وتقارير مالية مخصصة بضغطة زر، جاهزة للمشاركة مع فريقك وعملائك.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold md:text-4xl">يثق بنا قادة قطاع الإنشاءات</h2>
              <p className="mt-4 text-muted-foreground">
                هذا ما يقوله عملاؤنا عن تجربتهم مع AchoX Pro.
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
                        <p className="mt-4 text-muted-foreground">"منصة AchoX Pro غيرت طريقة عملنا تمامًا. أصبح تقدير التكاليف أسرع وأكثر دقة بنسبة 90%."</p>
                    </CardContent>
                </Card>
                <Card className="p-6 shadow-lg rounded-2xl">
                    <CardContent className="p-0">
                        <div className="flex items-center gap-4">
                            <Image src="https://placehold.co/40x40.png" width={40} height={40} alt="User 2" className="rounded-full" data-ai-hint="person face" />
                            <div>
                                <p className="font-semibold">سارة عبدالله</p>
                                <p className="text-sm text-muted-foreground">مهندسة معمارية مستقلة</p>
                            </div>
                        </div>
                        <p className="mt-4 text-muted-foreground">"أداة تحليل المخططات مذهلة! توفر عليّ ساعات من العمل اليدوي في كل مشروع."</p>
                    </CardContent>
                </Card>
                <Card className="p-6 shadow-lg rounded-2xl">
                    <CardContent className="p-0">
                        <div className="flex items-center gap-4">
                            <Image src="https://placehold.co/40x40.png" width={40} height={40} alt="User 3" className="rounded-full" data-ai-hint="person face" />
                            <div>
                                <p className="font-semibold">عمر بن صالح</p>
                                <p className="text-sm text-muted-foreground">الرئيس التنفيذي، مقاولات النخبة</p>
                            </div>
                        </div>
                        <p className="mt-4 text-muted-foreground">"أفضل استثمار قمنا به هذا العام. التقارير التلقائية تساعدنا على اتخاذ قرارات أفضل وأسرع."</p>
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
                            <Button className="w-full" variant="outline" asChild><Link href="/register">تواصل مع المبيعات</Link></Button>
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
            <span className="font-bold">AchoX Pro</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AchoX Pro. جميع الحقوق محفوظة.
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

    