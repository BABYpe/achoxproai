
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TermsPage() {
    const { t } = useTranslation();

    return (
        <main className="bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="mb-8">
                    <Button variant="ghost" asChild>
                        <Link href="/">
                            <ArrowLeft className="ml-2 h-4 w-4" />
                            {t('returnToHome')}
                        </Link>
                    </Button>
                </div>
                <h1 className="text-4xl font-bold mb-4">{t('terms.title')}</h1>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-4">
                    <p>آخر تحديث: 12 يوليو 2025</p>

                    <h2 className="text-2xl font-semibold">1. قبول الشروط</h2>
                    <p>
                        من خلال الوصول إلى منصة AchoX Pro AI أو استخدامها، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على جميع الشروط والأحكام، فلا يجوز لك الوصول إلى المنصة أو استخدامها.
                    </p>

                    <h2 className="text-2xl font-semibold">2. استخدام المنصة</h2>
                    <p>
                        أنت توافق على استخدام المنصة فقط للأغراض المشروعة ووفقًا لجميع القوانين واللوائح المعمول بها. أنت توافق على عدم استخدام المنصة بأي طريقة قد تضر بالمنصة أو خدماتها أو شبكاتها.
                    </p>

                    <h2 className="text-2xl font-semibold">3. الحسابات</h2>
                    <p>
                        عند إنشاء حساب معنا، يجب عليك تزويدنا بمعلومات دقيقة وكاملة وحديثة في جميع الأوقات. يشكل عدم القيام بذلك خرقًا للشروط، مما قد يؤدي إلى الإنهاء الفوري لحسابك على خدمتنا.
                    </p>
                    
                    <h2 className="text-2xl font-semibold">4. الملكية الفكرية</h2>
                    <p>
                        المنصة ومحتواها الأصلي وميزاتها ووظائفها هي وستظل ملكية حصرية لشركة AchoX Pro AI ومرخصيها. الخدمة محمية بموجب حقوق النشر والعلامات التجارية والقوانين الأخرى في كل من المملكة العربية السعودية والدول الأجنبية.
                    </p>

                    <h2 className="text-2xl font-semibold">5. إنهاء الخدمة</h2>
                    <p>
                        يجوز لنا إنهاء أو تعليق وصولك إلى خدمتنا على الفور، دون إشعار مسبق أو مسؤولية، لأي سبب من الأسباب، بما في ذلك على سبيل المثال لا الحصر إذا قمت بخرق الشروط.
                    </p>

                     <h2 className="text-2xl font-semibold">6. تحديد المسؤولية</h2>
                    <p>
                        لا تتحمل شركة AchoX Pro AI أو مديروها أو موظفوها أو شركاؤها أو وكلاؤها أو موردوها أو الشركات التابعة لها بأي حال من الأحوال المسؤولية عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو تأديبية، بما في ذلك على سبيل المثال لا الحصر، خسارة الأرباح أو البيانات أو الاستخدام أو الشهرة أو الخسائر غير الملموسة الأخرى.
                    </p>

                    <h2 className="text-2xl font-semibold">7. تغيير الشروط</h2>
                    <p>
                        نحتفظ بالحق، وفقًا لتقديرنا الخاص، في تعديل أو استبدال هذه الشروط في أي وقت. إذا كان التعديل جوهريًا، فسنحاول تقديم إشعار قبل 30 يومًا على الأقل من دخول أي شروط جديدة حيز التنفيذ.
                    </p>

                    <h2 className="text-2xl font-semibold">8. اتصل بنا</h2>
                    <p>
                        إذا كانت لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا على: legal@achox.pro
                    </p>
                </div>
            </div>
        </main>
    );
}
