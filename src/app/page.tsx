
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
import React, { useState, useEffect } from 'react';


const WorldMapSection = () => {
    const cities = [
        { name: 'Riyadh', x: '56%', y: '52%' },
        { name: 'Dubai', x: '60%', y: '50%' },
        { name: 'London', x: '45%', y: '30%' },
        { name: 'New York', x: '25%', y: '35%' },
        { name: 'Singapore', x: '75%', y: '65%' },
        { name: 'Tokyo', x: '85%', y: '40%' },
        { name: 'Cairo', x: '52%', y: '45%' },
        { name: 'Sydney', x: '88%', y: '80%' },
    ];

    const [userCounts, setUserCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        const interval = setInterval(() => {
            const newCounts: Record<string, number> = {};
            cities.forEach(city => {
                newCounts[city.name] = Math.floor(Math.random() * (150 - 20 + 1)) + 20;
            });
            setUserCounts(newCounts);
        }, 3000); // Update every 3 seconds

        // Initial counts
        const initialCounts: Record<string, number> = {};
        cities.forEach(city => {
            initialCounts[city.name] = Math.floor(Math.random() * (150 - 20 + 1)) + 20;
        });
        setUserCounts(initialCounts);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 md:py-32 bg-secondary/20">
            <div className="container mx-auto px-4">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold md:text-5xl">منصة عالمية، بثقة عالمية</h2>
                    <p className="mt-6 text-lg text-muted-foreground">
                        ينضم إلينا محترفون من جميع أنحاء العالم يوميًا للاستفادة من قوة الذكاء الاصطناعي في إدارة مشاريعهم.
                    </p>
                </div>
                <div className="relative mt-16 max-w-6xl mx-auto">
                    <Image
                        src="https://images.unsplash.com/photo-1549492423-400259a5e5a4?q=80&w=2070"
                        alt="World Map"
                        width={1200}
                        height={600}
                        className="w-full h-auto object-contain opacity-20"
                        data-ai-hint="world map illustration"
                    />
                    {cities.map(city => (
                        <div key={city.name} className="absolute" style={{ left: city.x, top: city.y }}>
                            <div className="relative group">
                                <div className="absolute w-4 h-4 bg-primary rounded-full animate-ping"></div>
                                <div className="w-4 h-4 bg-primary rounded-full border-2 border-primary-foreground"></div>
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max bg-card text-card-foreground p-2 rounded-lg text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="font-bold">{city.name}</p>
                                    <p className="text-primary">{userCounts[city.name] || 0} مستخدم نشط</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


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
        { icon: Wand2, title: t('landing.features.group1.item1.title'), description: t('landing.features.group1.item1.description') },
        { icon: Calculator, title: t('landing.features.group1.item2.title'), description: t('landing.features.group1.item2.description') },
        { icon: GanttChartIcon, title: t('landing.features.group1.item3.title'), description: t('landing.features.group1.item3.description') },
        { icon: UsersGroupIcon, title: t('landing.features.group1.item4.title'), description: t('landing.features.group1.item4.description') },
    ],
    execution: [
        { icon: Briefcase, title: t('landing.features.group2.item1.title'), description: t('landing.features.group2.item1.description') },
        { icon: FileSignature, title: t('landing.features.group2.item2.title'), description: t('landing.features.group2.item2.description') },
        { icon: BrainCircuit, title: t('landing.features.group2.item3.title'), description: t('landing.features.group2.item3.description') },
    ],
    analysis: [
        { icon: FilePieChart, title: t('landing.features.group3.item1.title'), description: t('landing.features.group3.item1.description') },
        { icon: FileText, title: t('landing.features.group3.item2.title'), description: t('landing.features.group3.item2.description') },
        { icon: ShieldAlert, title: t('landing.features.group3.item3.title'), description: t('landing.features.group3.item3.description') },
        { icon: Send, title: t('landing.features.group3.item4.title'), description: t('landing.features.group3.item4.description') },
    ],
    resources: [
        { icon: Warehouse, title: t('landing.features.group4.item1.title'), description: t('landing.features.group4.item1.description') },
        { icon: ListChecks, title: t('landing.features.group4.item2.title'), description: t('landing.features.group4.item2.description') },
        { icon: ClipboardType, title: t('landing.features.group4.item3.title'), description: t('landing.features.group4.item3.description') },
        { icon: LayoutDashboard, title: t('landing.features.group4.item4.title'), description: t('landing.features.group4.item4.description') },
    ]
};

const testimonials = [
  { name: t('landing.testimonials.1.name'), title: t('landing.testimonials.1.title'), quote: t('landing.testimonials.1.quote'), avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: t('landing.testimonials.2.name'), title: t('landing.testimonials.2.title'), quote: t('landing.testimonials.2.quote'), avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: t('landing.testimonials.3.name'), title: t('landing.testimonials.3.title'), quote: t('landing.testimonials.3.quote'), avatar: "https://randomuser.me/api/portraits/men/46.jpg" },
  { name: "فاطمة الزهراني", title: "مهندسة معمارية مستقلة، جدة", quote: "تحليل المخططات بالذكاء الاصطناعي يوفر عليّ أيامًا من العمل اليدوي، ويعطيني رؤى لم أكن لأنتبه لها.", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
  { name: "سلطان الحربي", title: "مدير مشتريات، شركة التوريدات المتحدة، الدمام", quote: "إدارة الموردين وأوامر الشراء أصبحت مركزية ومنظمة. لم نعد نفقد أي طلب شراء.", avatar: "https://randomuser.me/api/portraits/men/55.jpg" },
  { name: "Dr. Aisha Al-Farsi", title: "Real Estate Analyst, Muscat", quote: "The financial intelligence tool provides deep project analysis, helping us better evaluate investment feasibility.", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
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
                        {t('landing.hero.tagline')}
                    </Badge>
                </motion.div>

                <motion.h1 
                    variants={variants}
                    className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight mt-6"
                >
                    {t('landing.hero.superTitle')}
                </motion.h1>

                <motion.p 
                    variants={variants}
                    className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80"
                >
                    {t('landing.hero.description')}
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
                    <div className="flex justify-center items-center gap-12 mt-6 flex-wrap">
                        {trustedPartners.map((partner, index) => (
                          <Image key={`${partner.name}-${index}`} src={partner.logo} alt={partner.name} width={120} height={40} className="max-h-10 w-auto object-contain brightness-0 invert-[0.5] dark:invert-0 hover:brightness-100 dark:hover:invert transition-all" />
                        ))}
                      
                    </div>
                </motion.div>
            </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
                <Badge variant="default" className="text-sm px-4 py-1.5">{t('landing.features.mainTitle')}</Badge>
                <h2 className="text-3xl font-bold md:text-5xl mt-4">{t('landing.features.superTitle')}</h2>
                <p className="mt-6 text-lg text-muted-foreground">
                    {t('landing.features.description')}
                </p>
            </div>
            <div className="mt-20 space-y-24">
              {/* Planning Group */}
              <div>
                  <h3 className="text-2xl font-bold text-center md:text-3xl mb-12">{t('landing.features.group1.title')}</h3>
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
                  <h3 className="text-2xl font-bold text-center md:text-3xl mb-12">{t('landing.features.group2.title')}</h3>
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
                  <h3 className="text-2xl font-bold text-center md:text-3xl mb-12">{t('landing.features.group3.title')}</h3>
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
                   <h3 className="text-2xl font-bold text-center md:text-3xl mb-12">{t('landing.features.group4.title')}</h3>
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

        {/* World Map Section */}
        <WorldMapSection />

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 md:py-32 bg-background overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold md:text-5xl">{t('landing.testimonials.title')}</h2>
              <p className="mt-6 text-lg text-muted-foreground">
                {t('landing.testimonials.description')}
              </p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                 {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={`${testimonial.name}-${index}`}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: (index % 3) * 0.2 }}
                      variants={variants}
                    >
                        <Card className="p-8 shadow-lg rounded-2xl h-full flex flex-col bg-card/50 backdrop-blur-sm">
                            <CardContent className="p-0 flex-1 flex flex-col">
                            <p className="text-lg text-muted-foreground mb-6 flex-grow">"{testimonial.quote}"</p>
                            <div className="flex items-center gap-4 pt-6 border-t">
                                <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="w-12 h-12 rounded-full" data-ai-hint="person face" />
                                <div>
                                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                </div>
                            </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
             </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 md:py-32 bg-secondary/20">
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
