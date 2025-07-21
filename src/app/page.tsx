
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, GanttChartSquare, FileScan, CheckCircle, ArrowLeft, Globe, BrainCircuit, Users, ShieldCheck } from 'lucide-react';
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
  
  const featureCards = [
    {
      icon: BrainCircuit,
      title: "العقل المدبر للمشاريع",
      description: "من فكرة أولية إلى خطة متكاملة، يقوم الذكاء الاصطناعي بتحليل متطلباتك وتوليد التكاليف، الجدول الزمني، والمخاطر.",
      image: "https://images.unsplash.com/photo-1665686374006-b8f04cf62d57?q=80&w=800",
      imageHint: "data analysis interface"
    },
    {
      icon: Users,
      title: "إدارة متكاملة",
      description: "لوحة تحكم مركزية لمتابعة كل مشاريعك، إدارة الموارد، وتتبع الأداء المالي والتشغيلي لحظة بلحظة.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800",
      imageHint: "construction site engineers"
    },
    {
      icon: ShieldCheck,
      title: "تحليل ذكي وقرارات واثقة",
      description: "استفد من تقارير وتحليلات ذكية للمخاطر والبيانات المالية، مما يمكنك من اتخاذ قرارات استراتيجية مبنية على بيانات دقيقة.",
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=800",
      imageHint: "financial planning dashboard"
    }
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
                     <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] mt-6">
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
                    كل ما تحتاجه لإدارة مشاريعك من البداية إلى النهاية، مدعومًا بقوة الذكاء الاصطناعي.
                </p>
            </div>
            <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                      <motion.div
                          key={index}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ delay: index * 0.2 }}
                          variants={variants}
                      >
                          <Card className="p-2 shadow-lg rounded-2xl h-full flex flex-col bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                              <CardHeader className="p-0 rounded-xl overflow-hidden">
                                <Image 
                                    src={feature.image}
                                    width={800} 
                                    height={600} 
                                    alt={feature.title} 
                                    className="w-full h-48 object-cover" 
                                    data-ai-hint={feature.imageHint}
                                />
                              </CardHeader>
                              <CardContent className="p-6 flex-grow">
                                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                                      <Icon className="w-6 h-6" />
                                  </div>
                                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                                  <p className="mt-3 text-base text-muted-foreground">{feature.description}</p>
                              </CardContent>
                          </Card>
                      </motion.div>
                  )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 md:py-32 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold md:text-5xl">{t('landing.testimonials.title')}</h2>
              <p className="mt-6 text-lg text-muted-foreground">
                {t('landing.testimonials.description')}
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-8 shadow-lg rounded-2xl transform hover:-translate-y-2 transition-transform duration-300 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-0">
                        <p className="text-lg text-muted-foreground mb-6">"{t('landing.testimonials.1.quote')}"</p>
                        <div className="flex items-center gap-4 pt-6 border-t">
                            <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=48" width={48} height={48} alt="User 1" className="rounded-full" data-ai-hint="person face" />
                            <div>
                                <h3 className="font-semibold text-lg">{t('landing.testimonials.1.name')}</h3>
                                <p className="text-sm text-muted-foreground">{t('landing.testimonials.1.title')}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="p-8 shadow-lg rounded-2xl transform hover:-translate-y-2 transition-transform duration-300 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-0">
                        <p className="text-lg text-muted-foreground mb-6">"{t('landing.testimonials.2.quote')}"</p>
                         <div className="flex items-center gap-4 pt-6 border-t">
                            <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=48" width={48} height={48} alt="User 2" className="rounded-full" data-ai-hint="woman face" />
                            <div>
                                <h3 className="font-semibold text-lg">{t('landing.testimonials.2.name')}</h3>
                                <p className="text-sm text-muted-foreground">{t('landing.testimonials.2.title')}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="p-8 shadow-lg rounded-2xl transform hover:-translate-y-2 transition-transform duration-300 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-0">
                       <p className="text-lg text-muted-foreground mb-6">"{t('landing.testimonials.3.quote')}"</p>
                         <div className="flex items-center gap-4 pt-6 border-t">
                            <Image src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=48" width={48} height={48} alt="User 3" className="rounded-full" data-ai-hint="man face" />
                            <div>
                                <h3 className="font-semibold text-lg">{t('landing.testimonials.3.name')}</h3>
                                <p className="text-sm text-muted-foreground">{t('landing.testimonials.3.title')}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
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
