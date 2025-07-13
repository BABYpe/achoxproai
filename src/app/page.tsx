
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, GanttChartSquare, FileScan, CheckCircle, ArrowLeft, Globe } from 'lucide-react';
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

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
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
            <Button asChild className="shadow-lg shadow-primary/20">
                <Link href="/register">
                    {t('landing.header.getStarted')}
                </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 text-center overflow-hidden">
             <Image
                src="https://placehold.co/1920x1080.png"
                alt="Construction site background"
                fill
                style={{objectFit: "cover", objectPosition: "center"}}
                className="absolute inset-0 z-0"
                priority
                data-ai-hint="construction site"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-black/30 z-0"></div>
            <div className="container relative z-20 mx-auto px-4 text-white">
                <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl [text-shadow:_0_2px_4px_rgb(0_0_0_/_50%)]">
                    {t('landing.hero.title1')}
                    <br />
                    <span className="text-primary">{t('landing.hero.title2')}</span> {t('landing.hero.title3')}
                </h1>
                <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 [text-shadow:_0_1px_2px_rgb(0_0_0_/_50%)]">
                    {t('landing.hero.description')}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Button size="lg" asChild className="w-full sm:w-auto text-lg py-7 px-8 shadow-lg shadow-primary/30">
                        <Link href="/register">{t('landing.hero.cta.startTrial')}</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-lg py-7 px-8 bg-white/10 border-white/50 text-white hover:bg-white/20">
                        <Link href="/dashboard">
                           {t('landing.hero.cta.explore')}
                           <ArrowLeft className="mr-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
                <div className="mt-12 text-center">
                    <span className="text-sm font-semibold text-white/80 [text-shadow:_0_1px_2px_rgb(0_0_0_/_40%)]">{t('landing.hero.trustedBy')}</span>
                    <div className="mt-4 flex justify-center gap-8 items-center text-white/90 [text-shadow:_0_1px_2px_rgb(0_0_0_/_40%)]">
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
                <span className="text-primary font-semibold">{t('landing.features.tagline')}</span>
                <h2 className="text-3xl font-bold md:text-4xl mt-2">{t('landing.features.title')}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    {t('landing.features.description')}
                </p>
            </div>
            <div className="mt-16 space-y-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="تحليل المستندات" className="rounded-2xl shadow-xl" data-ai-hint="data analysis interface"/>
                    </div>
                    <div>
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                            <FileScan className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold">{t('landing.features.1.title')}</h3>
                        <p className="mt-2 text-muted-foreground">{t('landing.features.1.description')}</p>
                    </div>
                </div>

                 <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="md:order-2">
                        <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="تسعير ذكي" className="rounded-2xl shadow-xl" data-ai-hint="financial planning dashboard"/>
                    </div>
                    <div className="md:order-1">
                         <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                            <Bot className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold">{t('landing.features.2.title')}</h3>
                        <p className="mt-2 text-muted-foreground">{t('landing.features.2.description')}</p>
                    </div>
                </div>

                 <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="إدارة المشاريع" className="rounded-2xl shadow-xl" data-ai-hint="construction site engineers"/>
                    </div>
                    <div>
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                            <GanttChartSquare className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold">{t('landing.features.3.title')}</h3>
                        <p className="mt-2 text-muted-foreground">{t('landing.features.3.description')}</p>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold md:text-4xl">{t('landing.testimonials.title')}</h2>
              <p className="mt-4 text-muted-foreground">
                {t('landing.testimonials.description')}
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-6 shadow-lg rounded-2xl transform hover:-translate-y-2 transition-transform duration-300">
                    <CardContent className="p-0">
                        <p className="text-muted-foreground mb-4">"{t('landing.testimonials.1.quote')}"</p>
                        <div className="flex items-center gap-4 pt-4 border-t">
                            <Image src="https://placehold.co/48x48.png" width={48} height={48} alt="User 1" className="rounded-full" data-ai-hint="person face" />
                            <div>
                                <h3 className="font-semibold">{t('landing.testimonials.1.name')}</h3>
                                <p className="text-sm text-muted-foreground">{t('landing.testimonials.1.title')}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="p-6 shadow-lg rounded-2xl transform hover:-translate-y-2 transition-transform duration-300">
                    <CardContent className="p-0">
                        <p className="text-muted-foreground mb-4">"{t('landing.testimonials.2.quote')}"</p>
                         <div className="flex items-center gap-4 pt-4 border-t">
                            <Image src="https://placehold.co/48x48.png" width={48} height={48} alt="User 2" className="rounded-full" data-ai-hint="woman face" />
                            <div>
                                <h3 className="font-semibold">{t('landing.testimonials.2.name')}</h3>
                                <p className="text-sm text-muted-foreground">{t('landing.testimonials.2.title')}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="p-6 shadow-lg rounded-2xl transform hover:-translate-y-2 transition-transform duration-300">
                    <CardContent className="p-0">
                       <p className="text-muted-foreground mb-4">"{t('landing.testimonials.3.quote')}"</p>
                         <div className="flex items-center gap-4 pt-4 border-t">
                            <Image src="https://placehold.co/48x48.png" width={48} height={48} alt="User 3" className="rounded-full" data-ai-hint="man face" />
                            <div>
                                <h3 className="font-semibold">{t('landing.testimonials.3.name')}</h3>
                                <p className="text-sm text-muted-foreground">{t('landing.testimonials.3.title')}</p>
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
                    <h2 className="text-3xl font-bold md:text-4xl">{t('landing.pricing.title')}</h2>
                    <p className="mt-4 text-muted-foreground">
                        {t('landing.pricing.description')}
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-center">
                    {/* Free Plan */}
                    <Card className="shadow-lg rounded-2xl border-2 flex flex-col h-full">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl">{t('landing.pricing.basic.title')}</CardTitle>
                             <p className="text-muted-foreground">{t('landing.pricing.basic.description')}</p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                           <div className="text-4xl font-bold">{t('landing.pricing.basic.price')}</div>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.basic.feature1')}</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.basic.feature2')}</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.basic.feature3')}</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.basic.feature4')}</li>
                            </ul>
                        </CardContent>
                        <div className="p-6 pt-4">
                           <Button className="w-full" variant="outline" asChild><Link href="/register">{t('landing.pricing.basic.button')}</Link></Button>
                        </div>
                    </Card>
                    {/* Pro Plan */}
                    <Card className="shadow-2xl rounded-2xl border-2 border-primary relative flex flex-col h-full scale-105">
                        <div className="absolute top-0 right-4 -mt-3 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">{t('landing.pricing.pro.tag')}</div>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl">{t('landing.pricing.pro.title')}</CardTitle>
                            <p className="text-muted-foreground">{t('landing.pricing.pro.description')}</p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <div className="text-4xl font-bold">{t('landing.pricing.pro.price')}</div>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.pro.feature1')}</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.pro.feature2')}</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.pro.feature3')}</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.pro.feature4')}</li>
                            </ul>
                        </CardContent>
                        <div className="p-6 pt-4">
                             <Button className="w-full" asChild><Link href="/register">{t('landing.pricing.pro.button')}</Link></Button>
                        </div>
                    </Card>
                    {/* Enterprise Plan */}
                    <Card className="shadow-lg rounded-2xl border-2 flex flex-col h-full">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl">{t('landing.pricing.enterprise.title')}</CardTitle>
                            <p className="text-muted-foreground">{t('landing.pricing.enterprise.description')}</p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                             <div className="text-4xl font-bold">{t('landing.pricing.enterprise.price')}</div>
                             <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.enterprise.feature1')}</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.enterprise.feature2')}</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.enterprise.feature3')}</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> {t('landing.pricing.enterprise.feature4')}</li>
                            </ul>
                        </CardContent>
                         <div className="p-6 pt-4">
                            <Button className="w-full" variant="outline" asChild><Link href="/contact-sales">{t('landing.pricing.enterprise.button')}</Link></Button>
                        </div>
                    </Card>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold md:text-4xl">{t('landing.faq.title')}</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                       {t('landing.faq.description')}
                    </p>
                </div>
                <div className="mt-12">
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-lg font-semibold">{t('landing.faq.1.question')}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                            {t('landing.faq.1.answer')}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-lg font-semibold">{t('landing.faq.2.question')}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                           {t('landing.faq.2.answer')}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-lg font-semibold">{t('landing.faq.3.question')}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                           {t('landing.faq.3.answer')}
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-4">
                            <AccordionTrigger className="text-lg font-semibold">{t('landing.faq.4.question')}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                           {t('landing.faq.4.answer')}
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
                    <p className="text-muted-foreground mt-2">{t('landing.footer.description')}</p>
                </div>
                 <div>
                    <h4 className="font-semibold mb-2">{t('landing.footer.product')}</h4>
                    <ul className="space-y-2">
                        <li><Link href="#features" className="text-muted-foreground hover:text-primary">{t('landing.header.features')}</Link></li>
                        <li><Link href="#pricing" className="text-muted-foreground hover:text-primary">{t('landing.header.pricing')}</Link></li>
                        <li><Link href="#faq" className="text-muted-foreground hover:text-primary">{t('landing.header.faq')}</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold mb-2">{t('landing.footer.company')}</h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">{t('landing.footer.aboutUs')}</Link></li>
                        <li><Link href="/contact-sales" className="text-muted-foreground hover:text-primary">{t('landing.footer.contactUs')}</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">{t('landing.footer.jobs')}</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">{t('landing.footer.legal')}</h4>
                    <ul className="space-y-2">
                        <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">{t('landing.footer.privacy')}</Link></li>
                        <li><Link href="/terms" className="text-muted-foreground hover:text-primary">{t('landing.footer.terms')}</Link></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
                 {t('landing.footer.copyright', { year: new Date().getFullYear() })}
            </div>
        </div>
      </footer>
    </div>
  );
}
