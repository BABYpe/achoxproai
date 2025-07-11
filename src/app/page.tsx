
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, GanttChartSquare, FileScan, CheckCircle, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Logo } from '@/components/logo';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">AchoX Pro AI</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link href="#features" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              الميزات
            </Link>
            <Link href="#testimonials" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              آراء العملاء
            </Link>
            <Link href="#pricing" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              الأسعار
            </Link>
             <Link href="#faq" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              الأسئلة الشائعة
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
                <Link href="/login">تسجيل الدخول</Link>
            </Button>
            <Button asChild className="shadow-lg shadow-primary/20">
                <Link href="/register">
                    ابدأ الآن مجاناً
                </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24">
            <div aria-hidden="true" className="absolute inset-0 top-0 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                    بناء المستقبل يبدأ هنا.
                    <br />
                    <span className="text-primary">شريكك الذكي</span> في إدارة المشاريع.
                </h1>
                <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                    منصة AchoX Pro AI تحول تعقيدات المشاريع الهندسية والفعاليات إلى عمليات مبسطة وذكية. حلل، سعّر، وخطط لمشاريعك بدقة وكفاءة لا مثيل لها.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Button size="lg" asChild className="w-full sm:w-auto text-lg py-7 px-8 shadow-lg shadow-primary/30">
                        <Link href="/register">ابدأ تجربتك المجانية لمدة 14 يومًا</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-lg py-7 px-8">
                        <Link href="/dashboard">
                           استكشف المنصة
                           <ArrowLeft className="mr-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
                <div className="mt-12 text-center">
                    <span className="text-sm font-semibold text-muted-foreground">يثق بنا رواد الصناعة</span>
                    <div className="mt-4 flex justify-center gap-8 items-center text-muted-foreground">
                        <span className="font-bold text-lg">NEOM</span>
                        <span className="font-bold text-lg">ROSHN</span>
                         <span className="font-bold text-lg">ARAMCO</span>
                        <span className="font-bold text-lg">Red Sea Global</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center">
                <span className="text-primary font-semibold">قدرات المنصة</span>
                <h2 className="text-3xl font-bold md:text-4xl mt-2">محركك الذكي لإدارة المشاريع المتكاملة</h2>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    نقدم لك مجموعة من الأدوات الثورية المصممة لقطاع المقاولات والفعاليات، لتحقيق دقة وسرعة لا مثيل لهما.
                </p>
            </div>
            <div className="mt-16 space-y-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="تحليل المستندات" className="rounded-2xl shadow-xl" data-ai-hint="document analysis interface"/>
                    </div>
                    <div>
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                            <FileScan className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold">قراءة وفهم المستندات والمخططات</h3>
                        <p className="mt-2 text-muted-foreground">قم برفع كراسة الشروط أو المخططات الهندسية بصيغ متعددة (PDF, DWG, DXF). سيقوم الذكاء الاصطناعي باستخراج وتحليل البنود، الكميات، والمواصفات تلقائيًا بدقة عالية، مما يوفر ساعات من العمل اليدوي.</p>
                    </div>
                </div>

                 <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="md:order-2">
                        <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="تسعير ذكي" className="rounded-2xl shadow-xl" data-ai-hint="cost estimation dashboard"/>
                    </div>
                    <div className="md:order-1">
                         <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                            <Bot className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold">تسعير وتخطيط ذكي فوري</h3>
                        <p className="mt-2 text-muted-foreground">بناءً على المستندات أو مدخلاتك، تحصل على جدول كميات (BOQ) مفصل، خطة عمل (Gantt Chart)، وتوصيات لفريق العمل في ثوانٍ. يعتمد النظام على بيانات سوق محدثة لضمان دقة التسعير.</p>
                    </div>
                </div>

                 <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="إدارة المشاريع" className="rounded-2xl shadow-xl" data-ai-hint="project management dashboard"/>
                    </div>
                    <div>
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                            <GanttChartSquare className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold">إدارة وتقارير متكاملة</h3>
                        <p className="mt-2 text-muted-foreground">أنشئ تقارير حالة المشروع بضغطة زر. تابع تقدم الإنجاز، وأدر جميع جوانب مشاريعك من لوحة تحكم واحدة متكاملة وسهلة الاستخدام، مع خرائط تفاعلية ورسوم بيانية واضحة.</p>
                    </div>
                </div>
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
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-6 shadow-lg rounded-2xl transform hover:-translate-y-2 transition-transform duration-300">
                    <CardContent className="p-0">
                        <p className="text-muted-foreground mb-4">"منصة AchoX Pro AI غيرت طريقة عملنا تمامًا. أصبح تقدير التكاليف وتوليد جداول الكميات أسرع وأكثر دقة بنسبة 95%."</p>
                        <div className="flex items-center gap-4 pt-4 border-t">
                            <Image src="https://placehold.co/48x48.png" width={48} height={48} alt="User 1" className="rounded-full" data-ai-hint="person face" />
                            <div>
                                <h3 className="font-semibold">م. خالد الأحمدي</h3>
                                <p className="text-sm text-muted-foreground">مدير مشاريع، شركة البناء الحديث</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="p-6 shadow-lg rounded-2xl transform hover:-translate-y-2 transition-transform duration-300">
                    <CardContent className="p-0">
                        <p className="text-muted-foreground mb-4">"أداة تخطيط المشاريع مذهلة! أصبح بإمكاني تجهيز خطة متكاملة لأي فعالية، من التكاليف إلى الجدول الزمني، في دقائق معدودة."</p>
                         <div className="flex items-center gap-4 pt-4 border-t">
                            <Image src="https://placehold.co/48x48.png" width={48} height={48} alt="User 2" className="rounded-full" data-ai-hint="woman face" />
                            <div>
                                <h3 className="font-semibold">نورة القحطاني</h3>
                                <p className="text-sm text-muted-foreground">منظمة فعاليات، شركة إبداع</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="p-6 shadow-lg rounded-2xl transform hover:-translate-y-2 transition-transform duration-300">
                    <CardContent className="p-0">
                       <p className="text-muted-foreground mb-4">"أفضل استثمار قمنا به هذا العام. التقارير التلقائية والجداول الزمنية تساعدنا على اتخاذ قرارات أفضل وتتبع الإنجاز بدقة."</p>
                         <div className="flex items-center gap-4 pt-4 border-t">
                            <Image src="https://placehold.co/48x48.png" width={48} height={48} alt="User 3" className="rounded-full" data-ai-hint="man face" />
                            <div>
                                <h3 className="font-semibold">عمر بن صالح</h3>
                                <p className="text-sm text-muted-foreground">الرئيس التنفيذي، مقاولات النخبة</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold md:text-4xl">خطة أسعار مرنة تناسب الجميع</h2>
                    <p className="mt-4 text-muted-foreground">
                        اختر الخطة التي تناسب حجم أعمالك واحتياجات فريقك. ابدأ مجانًا، وقم بالترقية عندما تحتاج إلى المزيد.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-center">
                    {/* Free Plan */}
                    <Card className="shadow-lg rounded-2xl border-2 flex flex-col h-full">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl">الخطة الأساسية</CardTitle>
                             <p className="text-muted-foreground">للمهندسين الأفراد والفرق الصغيرة.</p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                           <div className="text-4xl font-bold">مجاناً</div>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> مشروع واحد</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> 5 تحليلات للمخططات شهرياً</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> 5 تقارير شهرياً</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> دعم عبر المجتمع</li>
                            </ul>
                        </CardContent>
                        <div className="p-6 pt-4">
                           <Button className="w-full" variant="outline" asChild><Link href="/register">ابدأ الآن</Link></Button>
                        </div>
                    </Card>
                    {/* Pro Plan */}
                    <Card className="shadow-2xl rounded-2xl border-2 border-primary relative flex flex-col h-full scale-105">
                        <div className="absolute top-0 right-4 -mt-3 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">الأكثر شيوعاً</div>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl">الخطة الاحترافية</CardTitle>
                            <p className="text-muted-foreground">للشركات النامية والفرق المحترفة.</p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <div className="text-4xl font-bold">199 ر.س<span className="text-lg font-normal text-muted-foreground">/شهرياً</span></div>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> 10 مشاريع</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> تحليلات غير محدودة</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> تقارير غير محدودة</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> دعم فني عبر البريد الإلكتروني</li>
                            </ul>
                        </CardContent>
                        <div className="p-6 pt-4">
                             <Button className="w-full" asChild><Link href="/register">اختر الخطة الاحترافية</Link></Button>
                        </div>
                    </Card>
                    {/* Enterprise Plan */}
                    <Card className="shadow-lg rounded-2xl border-2 flex flex-col h-full">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl">خطة الشركات</CardTitle>
                            <p className="text-muted-foreground">للشركات الكبيرة والمتطلبات المخصصة.</p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                             <div className="text-4xl font-bold">تواصل معنا</div>
                             <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> مشاريع غير محدودة</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> واجهات برمجية (API)</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> مدير حساب مخصص</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> دعم فني على مدار الساعة</li>
                            </ul>
                        </CardContent>
                         <div className="p-6 pt-4">
                            <Button className="w-full" variant="outline" asChild><Link href="/contact-sales">تواصل مع المبيعات</Link></Button>
                        </div>
                    </Card>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold md:text-4xl">أسئلة شائعة</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                       هل لديك أسئلة؟ لدينا الإجابات. إذا لم تجد ما تبحث عنه، فلا تتردد في التواصل معنا.
                    </p>
                </div>
                <div className="mt-12">
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-lg font-semibold">ما هي أنواع المشاريع التي تدعمها المنصة؟</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                            منصة AchoX Pro AI مصممة لتكون مرنة وقادرة على التعامل مع مجموعة واسعة من المشاريع، بما في ذلك مشاريع البناء السكنية والتجارية، مشاريع البنية التحتية، وتنظيم وتجهيز الفعاليات والمعارض بجميع أحجامها.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-lg font-semibold">ما مدى دقة تقدير التكاليف؟</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                           تعتمد دقة تقدير التكاليف على جودة البيانات المدخلة. يستخدم نظامنا الذكي بيانات سوق محدثة ويحلل نطاق العمل لتقديم تقديرات دقيقة جدًا. كلما كانت التفاصيل التي تقدمها أكثر وضوحًا، كانت النتائج أكثر دقة.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-lg font-semibold">هل بياناتي ومستنداتي آمنة؟</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                           نعم، أمان بياناتك هو أولويتنا القصوى. نستخدم بروتوكولات تشفير متقدمة ونتبع أفضل الممارسات الأمنية لضمان سرية وحماية جميع المستندات والمعلومات التي ترفعها على المنصة.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-4">
                            <AccordionTrigger className="text-lg font-semibold">هل يمكنني تجربة المنصة قبل الاشتراك؟</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                           بالتأكيد! نحن نقدم فترة تجريبية مجانية لمدة 14 يومًا تتيح لك الوصول إلى معظم الميزات الاحترافية. يمكنك استكشاف المنصة بنفسك ورؤية كيف يمكنها تطوير أعمالك.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t bg-secondary/30">
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-4 gap-8">
                <div>
                     <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                        <Logo className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold">AchoX Pro AI</span>
                    </Link>
                    <p className="text-muted-foreground mt-2">شريكك الذكي في إدارة المشاريع الهندسية والفعاليات.</p>
                </div>
                 <div>
                    <h4 className="font-semibold mb-2">المنتج</h4>
                    <ul className="space-y-2">
                        <li><Link href="#features" className="text-muted-foreground hover:text-primary">الميزات</Link></li>
                        <li><Link href="#pricing" className="text-muted-foreground hover:text-primary">الأسعار</Link></li>
                        <li><Link href="#faq" className="text-muted-foreground hover:text-primary">الأسئلة الشائعة</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold mb-2">الشركة</h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">من نحن</Link></li>
                        <li><Link href="/contact-sales" className="text-muted-foreground hover:text-primary">تواصل معنا</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">الوظائف</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">قانوني</h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">سياسة الخصوصية</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">شروط الخدمة</Link></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
                 © {new Date().getFullYear()} AchoX Pro AI. جميع الحقوق محفوظة.
            </div>
        </div>
      </footer>
    </div>
  );
}
