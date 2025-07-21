
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, GanttChartSquare, FileScan, CheckCircle, ArrowLeft, Globe, BrainCircuit, Users, ShieldCheck, LayoutDashboard, FileText, Calculator, ListChecks, FileSignature, Send, ShieldAlert, Wand2, Warehouse, Wrench, ClipboardType, FilePieChart, Briefcase } from 'lucide-react';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Logo } from '@/components/logo';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion";
import { Badge } from '@/components/ui/badge';
import { GanttChartIcon } from '@/components/icons/gantt-chart-icon';
import { UsersGroupIcon } from '@/components/icons/users-group-icon';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  const trustedPartners = [
    { name: "NEOM", logo: "https://raw.githubusercontent.com/BABYpe/achoxproai/main/NEOM.jpg" },
    { name: "ROSHN", logo: "https://raw.githubusercontent.com/BABYpe/achoxproai/main/Roshn_Logo.svg.png" },
    { name: "ARAMCO", logo: "https://raw.githubusercontent.com/BABYpe/achoxproai/main/Aramco-logo.png" },
    { name: "Red Sea Global", logo: "https://raw.githubusercontent.com/BABYpe/achoxproai/main/RSG_Logo.png" },
    { name: "Saudi Electricity Co.", logo: "https://raw.githubusercontent.com/BABYpe/achoxproai/main/Logo_Saudi_Electric_Company.svg.png" },
    { name: "SABIC", logo: "https://raw.githubusercontent.com/BABYpe/achoxproai/main/SABIC-LOGO_tcm1010-14323.svg" },
  ];
  
    const featureGroups = {
    planning: [
        { icon: Wand2, title: "المصمم المعماري الذكي", description: "حوّل الأفكار إلى تصاميم معمارية ومخططات أولية بضغطة زر." },
        { icon: Calculator, title: "تقدير التكاليف الشامل", description: "احصل على جداول كميات (BOQ)، وتقديرات مالية دقيقة معتمدة على بيانات سوق حقيقية." },
        { icon: GanttChartIcon, title: "مخطط جانت الزمني", description: "أنشئ جداول زمنية مفصلة للمشاريع بشكل تلقائي، مع تحديد المهام والمدد الزمنية." },
        { icon: UsersGroupIcon, title: "مخطط فريق العمل", description: "احصل على توصيات بحجم ونوع فريق العمل المثالي لتنفيذ مشروعك بكفاءة." },
    ],
    execution: [
        { icon: Briefcase, title: "إدارة المشاريع", description: "لوحة تحكم مركزية لتتبع جميع مشاريعك، ومراقبة مؤشرات الأداء الرئيسية." },
        { icon: FileSignature, title: "المشتريات والعقود", description: "أدر الموردين، وأنشئ أوامر شراء، وصدر عروض أسعار احترافية بلمسات بسيطة." },
        { icon: BrainCircuit, title: "الذكاء المالي", description: "سجل معاملاتك المالية واحصل على تحليل فوري للمصروفات، المخاطر، والتوصيات." },
    ],
    analysis: [
        { icon: FilePieChart, title: "تقارير ذكية", description: "أنشئ تقارير تقدم مخصصة للمشاريع بشكل فوري، جاهزة للمشاركة مع الإدارة والعملاء." },
        { icon: FileText, title: "تحليل المخططات", description: "ارفع المخططات الهندسية واحصل على تحليل فوري للكميات، المخاطر، والتوصيات." },
        { icon: ShieldAlert, title: "تحليل المخاطر", description: "حدد المخاطر التشغيلية، المالية، والتقنية بشكل استباقي مع استراتيجيات للتخفيف منها." },
        { icon: Send, title: "المسوق الذكي", description: "حدد جمهورك المستهدف واحصل على قوائم عملاء محتملين مع رسائل تسويقية مخصصة." },
    ],
    resources: [
        { icon: Warehouse, title: "إدارة المخزون والأصول", description: "تتبع مخزون المواد ومعدات الشركة لضمان الجاهزية وتجنب النقص." },
        { icon: ListChecks, title: "قاعدة بيانات BOQ", description: "أنشئ مكتبة مركزية لبنود الأعمال وتكاليفها لتسريع عملية التسعير وتوحيدها." },
        { icon: ClipboardType, title: "مكتبة القوالب", description: "استخدم مشاريعك السابقة كنماذج جاهزة لمشاريع جديدة، موفرًا الوقت والجهد." },
        { icon: LayoutDashboard, title: "مركز التحكم بالوثائق", description: "نظام مركزي لإدارة ومتابعة جميع مستندات ووثائق مشاريعك بشكل آمن." },
    ]
};

const testimonials = [
  { name: "م. خالد الأحمدي", title: "مدير مشاريع، شركة البناء الحديث", quote: "منصة AchoX Pro غيرت طريقة عملنا تمامًا. أصبح تقدير التكاليف وتوليد جداول الكميات أسرع وأكثر دقة بنسبة 95%." },
  { name: "نورة القحطاني", title: "منظمة فعاليات، شركة إبداع", quote: "أداة تخطيط المشاريع مذهلة! أصبح بإمكاني تجهيز خطة متكاملة لأي فعالية، من التكاليف إلى الجدول الزمني، في دقائق معدودة." },
  { name: "عمر بن صالح", title: "الرئيس التنفيذي، مقاولات النخبة", quote: "أفضل استثمار قمنا به هذا العام. التقارير التلقائية والجداول الزمنية تساعدنا على اتخاذ قرارات أفضل وتتبع الإنجاز بدقة." },
  { name: "فاطمة الزهراني", title: "مهندسة معمارية مستقلة", quote: "تحليل المخططات بالذكاء الاصطناعي يوفر عليّ أيامًا من العمل اليدوي، ويعطيني رؤى لم أكن لأنتبه لها." },
  { name: "سلطان الحربي", title: "مدير مشتريات، شركة التوريدات المتحدة", quote: "إدارة الموردين وأوامر الشراء أصبحت مركزية ومنظمة. لم نعد نفقد أي طلب شراء." },
  { name: "علياء منصور", title: "محللة مالية، شركة استثمار عقاري", quote: "أداة الذكاء المالي تقدم تحليلات عميقة للمشاريع، مما يساعدنا في تقييم جدوى الاستثمارات بشكل أفضل." },
  { name: "م. محمد الغامدي", title: "استشاري هندسي", quote: "أوصي بهذه المنصة لكل مكتب هندسي. إنها ترفع من مستوى الاحترافية والكفاءة بشكل لا يصدق." },
  { name: "دانا العتيبي", title: "صاحبة شركة تنظيم معارض", quote: "ميزة المسوق الذكي ساعدتنا في الوصول لعملاء جدد لم نكن لنصل إليهم بالطرق التقليدية." },
  { name: "إبراهيم الشمري", title: "مشرف موقع، مقاولات الصحراء", quote: "استخدام قوالب المشاريع السابقة كنماذج للمشاريع الجديدة وفر علينا وقتًا هائلاً في مرحلة التخطيط." },
  { name: "م. ريما عبدالله", title: "مهندسة تكاليف", quote: "دقة تقدير التكاليف أصبحت ممتازة بفضل اعتماد المنصة على بيانات سوق محدثة. هذا يقلل من مخاطر المشاريع بشكل كبير." },
  { name: "عبدالعزيز التركي", title: "مدير تطوير أعمال", quote: "سرعة إنشاء عروض الأسعار الاحترافية أعطتنا ميزة تنافسية كبيرة في السوق." },
  { name: "جمانة السيد", title: "مديرة فندق قيد الإنشاء", quote: "مخطط جانت التفاعلي يجعل متابعة تقدم التشطيبات أمرًا سهلاً وواضحًا لجميع الأطراف." },
  { name: "فيصل الدوسري", title: "مالك شركة مقاولات صغيرة", quote: "كنت أعتقد أن هذه الأدوات للشركات الكبرى فقط، ولكنها ساعدتني على تنظيم عملي ومنافسة الشركات الأكبر." },
  { name: "لمى الصالح", title: "مهندسة تصميم داخلي", quote: "المصمم المعماري الذكي يلهمني بأفكار وتخطيطات أولية أطورها بعد ذلك. أداة إبداعية رائعة." },
  { name: "يوسف المطيري", title: "مدير أصول، شركة معدات ثقيلة", quote: "إدارة الأصول والمخزون أصبحت أكثر كفاءة، ونعرف بالضبط مكان كل معدة وحالة مخزوننا." },
  { name: "سارة خان", title: "مستشارة إدارة مشاريع", quote: "هذه هي مستقبل إدارة المشاريع. منصة تجمع بين كل الأدوات التي نحتاجها في مكان واحد وبشكل ذكي." },
  { name: "بدر الراجحي", title: "مطور عقاري", quote: "تحليل المخاطر الاستباقي الذي تقدمه المنصة لا يقدر بثمن. لقد ساعدنا على تجنب مشاكل كبيرة." }
];

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground font-body overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Logo className="h-10 w-10 text-primary" />
            <span className="text-xl font-bold">AchoX Pro</span>
          </Link>
          <nav className="hidden items-center gap-8 text-base md:flex">
            <Link href="#features" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              {t('landing.header.features')}
            </Link>
            <Link href="#testimonials" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              {t('landing.header.testimonials')}
            </Link>
            <Link href="#pricing" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              {t('landing.header.pricing')}
            </Link>
             <Link href="#faq" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              {t('landing.header.faq')}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Change Language">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => changeLanguage('ar')} disabled={currentLang === 'ar'}>
                  العربية
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => changeLanguage('en')} disabled={currentLang === 'en'}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" asChild>
                <Link href="/login">{t('landing.header.login')}</Link>
            </Button>
            <Button asChild size="lg" className="shadow-lg shadow-primary/20">
                <Link href="/register">
                    {t('landing.header.getStarted')}
                </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 text-center overflow-hidden bg-background">
             <div className="absolute inset-0 z-0 bg-grid-glow"></div>
             <div className="absolute top-0 left-0 right-0 z-10 h-[50rem] w-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.2),transparent)]"></div>

            <motion.div 
                className="container relative z-20 mx-auto px-4"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.3 } }
                }}
            >
                <motion.div variants={variants}>
                    <Badge variant="secondary" className="text-sm px-4 py-1.5 border-primary/20">
                        شريكك الذكي في إدارة المشاريع
                    </Badge>
                </motion.div>

                <motion.h1 
                    variants={variants}
                    className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight mt-6"
                >
                    حوّل الأفكار إلى مشاريع ناجحة.
                    <br/>
                    بسرعة <span className="text-primary">ودقة</span> وذكاء.
                </motion.h1>

                <motion.p 
                    variants={variants}
                    className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80"
                >
                    AchoX Pro هي منصة ثورية تستخدم الذكاء الاصطناعي لتبسيط أعقد جوانب إدارة المشاريع. من تحليل المخططات إلى تقدير التكاليف وإنشاء خطط عمل متكاملة، كل ذلك في مكان واحد.
                </motion.p>
                
                <motion.div 
                    variants={variants}
                    className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
                >
                    <Button size="lg" asChild className="w-full sm:w-auto text-lg py-7 px-8 shadow-lg shadow-primary/30">
                        <Link href="/register">{t('landing.hero.cta.startTrial')}</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-lg py-7 px-8">
                        <Link href="/dashboard">
                           {t('landing.hero.cta.explore')}
                           <ArrowLeft className="mr-2 h-5 w-5" />
                        </Link>
                    </Button>
                </motion.div>
                 
                 <motion.div variants={variants} className="mt-20 text-center">
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{t('landing.hero.trustedBy')}</span>
                    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] mt-6">
                      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll">
                        {trustedPartners.map((partner, index) => (
                          <li key={`${partner.name}-${index}`}>
                            <Image src={partner.logo} alt={partner.name} width={120} height={40} className="max-h-10 w-auto object-contain brightness-0 invert-[0.5] dark:invert-0 hover:brightness-100 dark:hover:invert transition-all" />
                          </li>
                        ))}
                      </ul>
                       <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll" aria-hidden="true">
                         {trustedPartners.map((partner, index) => (
                           <li key={`${partner.name}-clone-${index}`}>
                            <Image src={partner.logo} alt={partner.name} width={120} height={40} className="max-h-10 w-auto object-contain brightness-0 invert-[0.5] dark:invert-0 hover:brightness-100 dark:hover:invert transition-all" />
                          </li>
                        ))}
                      </ul>
                    </div>
                </motion.div>
            </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
                <Badge variant="default" className="text-sm px-4 py-1.5">المنصة المتكاملة لإدارة المشاريع</Badge>
                <h2 className="text-3xl font-bold md:text-5xl mt-4">نظام تشغيل ذكي لمشاريعك</h2>
                <p className="mt-6 text-lg text-muted-foreground">
                    كل ما تحتاجه لإدارة مشاريعك من البداية إلى النهاية، مدعومًا بقوة الذكاء الاصطناعي، ومقسم على أربع مراحل رئيسية:
                </p>
            </div>
            <div className="mt-20 space-y-24">
              {/* Planning Group */}
              <div>
                  <h3 className="text-2xl font-bold text-center md:text-3xl mb-12">1. التخطيط الذكي: حوّل الأفكار إلى خطط قابلة للتنفيذ</h3>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                      {featureGroups.planning.map((feature, index) => {
                          const Icon = feature.icon;
                          return (
                              <motion.div
                                  key={index}
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, amount: 0.5 }}
                                  transition={{ delay: index * 0.1 }}
                                  variants={variants}
                                  className="text-center"
                              >
                                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                                      <Icon className="w-8 h-8" />
                                  </div>
                                  <h4 className="text-xl font-bold">{feature.title}</h4>
                                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                              </motion.div>
                          );
                      })}
                  </div>
              </div>

               {/* Execution Group */}
              <div>
                  <h3 className="text-2xl font-bold text-center md:text-3xl mb-12">2. التنفيذ والمتابعة: سيطر على كل تفاصيل مشروعك</h3>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {featureGroups.execution.map((feature, index) => {
                          const Icon = feature.icon;
                          return (
                              <motion.div
                                  key={index}
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, amount: 0.5 }}
                                  transition={{ delay: index * 0.1 }}
                                  variants={variants}
                              >
                                  <Card className="p-6 shadow-lg rounded-2xl h-full flex flex-col text-center items-center bg-card/50 hover:border-primary/30 transition-colors">
                                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                                          <Icon className="w-7 h-7" />
                                      </div>
                                      <h4 className="text-xl font-bold">{feature.title}</h4>
                                      <p className="mt-2 text-muted-foreground flex-grow">{feature.description}</p>
                                  </Card>
                              </motion.div>
                          );
                      })}
                  </div>
              </div>
              
              {/* Analysis Group */}
              <div>
                  <h3 className="text-2xl font-bold text-center md:text-3xl mb-12">3. التحليل والنمو: اتخذ قرارات استراتيجية مبنية على البيانات</h3>
                   <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                      {featureGroups.analysis.map((feature, index) => {
                          const Icon = feature.icon;
                          return (
                              <motion.div
                                  key={index}
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, amount: 0.5 }}
                                  transition={{ delay: index * 0.1 }}
                                  variants={variants}
                                  className="text-center"
                              >
                                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                                      <Icon className="w-8 h-8" />
                                  </div>
                                  <h4 className="text-xl font-bold">{feature.title}</h4>
                                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                              </motion.div>
                          );
                      })}
                  </div>
              </div>
              
              {/* Resources Group */}
              <div>
                   <h3 className="text-2xl font-bold text-center md:text-3xl mb-12">4. الموارد الموحدة: مركزك لإدارة كل أصولك المعرفية والمادية</h3>
                   <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                      {featureGroups.resources.map((feature, index) => {
                          const Icon = feature.icon;
                          return (
                              <motion.div
                                  key={index}
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, amount: 0.5 }}
                                  transition={{ delay: index * 0.1 }}
                                  variants={variants}
                              >
                                  <Card className="p-6 shadow-lg rounded-2xl h-full flex flex-col text-center items-center bg-card/50 hover:border-primary/30 transition-colors">
                                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                                          <Icon className="w-7 h-7" />
                                      </div>
                                      <h4 className="text-xl font-bold">{feature.title}</h4>
                                      <p className="mt-2 text-muted-foreground flex-grow">{feature.description}</p>
                                  </Card>
                              </motion.div>
                          );
                      })}
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 md:py-32 bg-secondary/20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold md:text-5xl">{t('landing.testimonials.title')}</h2>
              <p className="mt-6 text-lg text-muted-foreground">
                {t('landing.testimonials.description')}
              </p>
            </div>
          </div>
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] mt-16">
            <ul className="flex items-stretch justify-center md:justify-start [&>li]:mx-4 animate-infinite-scroll">
              {testimonials.map((testimonial, index) => (
                <li key={`${testimonial.name}-${index}`} className="w-[350px] md:w-[450px]">
                  <Card className="p-8 shadow-lg rounded-2xl h-full flex flex-col bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-0 flex-1 flex flex-col">
                      <p className="text-lg text-muted-foreground mb-6 flex-grow">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4 pt-6 border-t">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xl">
                          {testimonial.name.substring(0, 1)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
            <ul className="flex items-stretch justify-center md:justify-start [&>li]:mx-4 animate-infinite-scroll" aria-hidden="true">
              {testimonials.map((testimonial, index) => (
                <li key={`${testimonial.name}-clone-${index}`} className="w-[350px] md:w-[450px]">
                  <Card className="p-8 shadow-lg rounded-2xl h-full flex flex-col bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-0 flex-1 flex flex-col">
                      <p className="text-lg text-muted-foreground mb-6 flex-grow">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4 pt-6 border-t">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xl">
                          {testimonial.name.substring(0, 1)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 md:py-32 bg-background">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold md:text-5xl">{t('landing.pricing.title')}</h2>
                    <p className="mt-6 text-lg text-muted-foreground">
                        {t('landing.pricing.description')}
                    </p>
                </div>
                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-center">
                    {/* Free Plan */}
                    <Card className="shadow-lg rounded-2xl border-2 flex flex-col h-full bg-card/50 backdrop-blur-sm p-2">
                        <CardHeader className="pb-6">
                            <CardTitle className="text-2xl">{t('landing.pricing.basic.title')}</CardTitle>
                             <p className="text-muted-foreground">{t('landing.pricing.basic.description')}</p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-5">
                           <div className="text-5xl font-bold">{t('landing.pricing.basic.price')}</div>
                            <ul className="space-y-4 text-muted-foreground">
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.basic.feature1')}</li>
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.basic.feature2')}</li>
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.basic.feature3')}</li>
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.basic.feature4')}</li>
                            </ul>
                        </CardContent>
                        <div className="p-6 pt-6">
                           <Button size="lg" className="w-full text-lg" variant="outline" asChild><Link href="/register">{t('landing.pricing.basic.button')}</Link></Button>
                        </div>
                    </Card>
                    {/* Pro Plan */}
                    <Card className="shadow-2xl rounded-2xl border-2 border-primary relative flex flex-col h-full scale-105 bg-card/80 backdrop-blur-sm p-2">
                        <div className="absolute top-0 right-6 -mt-3 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">{t('landing.pricing.pro.tag')}</div>
                        <CardHeader className="pb-6">
                            <CardTitle className="text-2xl">{t('landing.pricing.pro.title')}</CardTitle>
                            <p className="text-muted-foreground">{t('landing.pricing.pro.description')}</p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-5">
                            <div className="text-5xl font-bold">{t('landing.pricing.pro.price')}</div>
                            <ul className="space-y-4 text-muted-foreground">
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.pro.feature1')}</li>
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.pro.feature2')}</li>
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.pro.feature3')}</li>
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.pro.feature4')}</li>
                            </ul>
                        </CardContent>
                        <div className="p-6 pt-6">
                             <Button size="lg" className="w-full text-lg" asChild><Link href="/register">{t('landing.pricing.pro.button')}</Link></Button>
                        </div>
                    </Card>
                    {/* Enterprise Plan */}
                    <Card className="shadow-lg rounded-2xl border-2 flex flex-col h-full bg-card/50 backdrop-blur-sm p-2">
                        <CardHeader className="pb-6">
                            <CardTitle className="text-2xl">{t('landing.pricing.enterprise.title')}</CardTitle>
                            <p className="text-muted-foreground">{t('landing.pricing.enterprise.description')}</p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-5">
                             <div className="text-5xl font-bold">{t('landing.pricing.enterprise.price')}</div>
                             <ul className="space-y-4 text-muted-foreground">
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.enterprise.feature1')}</li>
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.enterprise.feature2')}</li>
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.enterprise.feature3')}</li>
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.enterprise.feature4')}</li>
                            </ul>
                        </CardContent>
                         <div className="p-6 pt-6">
                            <Button size="lg" className="w-full text-lg" variant="outline" asChild><Link href="/contact-sales">{t('landing.pricing.enterprise.button')}</Link></Button>
                        </div>
                    </Card>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 md:py-32">
            <div className="container mx-auto px-4 max-w-4xl">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold md:text-5xl">{t('landing.faq.title')}</h2>
                    <p className="mt-6 text-lg text-muted-foreground">
                       {t('landing.faq.description')}
                    </p>
                </div>
                <div className="mt-12">
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-xl font-semibold text-left">{t('landing.faq.1.question')}</AccordionTrigger>
                            <AccordionContent className="text-lg text-muted-foreground">
                            {t('landing.faq.1.answer')}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-xl font-semibold text-left">{t('landing.faq.2.question')}</AccordionTrigger>
                            <AccordionContent className="text-lg text-muted-foreground">
                           {t('landing.faq.2.answer')}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-xl font-semibold text-left">{t('landing.faq.3.question')}</AccordionTrigger>
                            <AccordionContent className="text-lg text-muted-foreground">
                           {t('landing.faq.3.answer')}
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-4">
                            <AccordionTrigger className="text-xl font-semibold text-left">{t('landing.faq.4.question')}</AccordionTrigger>
                            <AccordionContent className="text-lg text-muted-foreground">
                           {t('landing.faq.4.answer')}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t bg-secondary/20">
        <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-5 gap-8">
                <div className="col-span-2">
                     <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                        <Logo className="h-10 w-10 text-primary" />
                        <span className="text-xl font-bold">AchoX Pro</span>
                    </Link>
                    <p className="text-muted-foreground mt-4 max-w-xs">{t('landing.footer.description')}</p>
                </div>
                 <div>
                    <h4 className="font-semibold mb-3">{t('landing.footer.product')}</h4>
                    <ul className="space-y-3">
                        <li><Link href="#features" className="text-muted-foreground hover:text-primary">{t('landing.header.features')}</Link></li>
                        <li><Link href="#pricing" className="text-muted-foreground hover:text-primary">{t('landing.header.pricing')}</Link></li>
                        <li><Link href="#faq" className="text-muted-foreground hover:text-primary">{t('landing.header.faq')}</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold mb-3">{t('landing.footer.company')}</h4>
                    <ul className="space-y-3">
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">{t('landing.footer.aboutUs')}</Link></li>
                        <li><Link href="/contact-sales" className="text-muted-foreground hover:text-primary">{t('landing.footer.contactUs')}</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">{t('landing.footer.jobs')}</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">{t('landing.footer.legal')}</h4>
                    <ul className="space-y-3">
                        <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">{t('landing.footer.privacy')}</Link></li>
                        <li><Link href="/terms" className="text-muted-foreground hover:text-primary">{t('landing.footer.terms')}</Link></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                 {t('copyright', { year: new Date().getFullYear() })}
            </div>
        </div>
      </footer>
    </div>
  );
}
