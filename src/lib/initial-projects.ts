
import { type Project } from "@/hooks/use-project-store";

export const initialProjects: Omit<Project, 'id'>[] = [
  {
    name: "بناء فيلا فاخرة في حي الياسمين",
    status: "قيد التنفيذ",
    variant: "default",
    location: "الرياض، حي الياسمين",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600",
    imageHint: "luxury villa modern",
    progress: 65,
    estimatedBudget: 3500000,
    currency: "SAR",
    lat: 24.8136,
    lng: 46.6753,
    manager: "علي محمد",
    endDate: "2025-12-31",
    createdAt: "2024-01-15T10:00:00Z",
    ownerId: "user-123",
    projectType: 'residential_villa',
    quality: 'luxury',
    scopeOfWork: 'بناء فيلا سكنية فاخرة بمساحة 600 متر مربع في حي الياسمين بالرياض، تتكون من دورين وملحق علوي. يشمل العمل جميع مراحل الإنشاء من الحفر والأساسات والخرسانات والمباني، بالإضافة إلى أعمال التشطيبات الداخلية والخارجية بمستوى فاخر، وتنسيق الحدائق والمسبح الخارجي.',
    ganttChartDataJson: JSON.stringify([
        { id: 1, task: 'مرحلة التصميم والترخيص', responsible: 'الاستشاري والمالك', start: '2024-01-15', end: '2024-03-15', duration: 60, progress: 100 },
        { id: 2, task: 'أعمال الحفر والأساسات', responsible: 'المقاول', start: '2024-03-16', end: '2024-05-15', duration: 60, progress: 100 },
        { id: 3, task: 'أعمال الهيكل الخرساني', responsible: 'المقاول', start: '2024-05-16', end: '2024-11-15', duration: 180, progress: 80 },
        { id: 4, task: 'أعمال المباني والتشطيبات الأولية', responsible: 'المقاول', start: '2024-11-16', end: '2025-05-15', duration: 180, progress: 40 },
        { id: 5, task: 'أعمال التشطيبات النهائية', responsible: 'المقاول', start: '2025-05-16', end: '2025-11-15', duration: 180, progress: 10 },
        { id: 6, task: 'تنسيق الموقع والتسليم', responsible: 'المقاول والمالك', start: '2025-11-16', end: '2025-12-31', duration: 45, progress: 0 },
    ]),
    costEstimationJson: JSON.stringify({
        totalEstimatedCost: "3,500,000 SAR",
        boq: [
            { id: "C-101", category: "أعمال خرسانية", description: "خرسانة مسلحة للقواعد والأساسات", unit: "m³", quantity: 250, unitPrice: 480, total: 120000 },
            { id: "M-201", category: "أعمال مباني", description: "بناء جدران خارجية معزولة", unit: "m²", quantity: 800, unitPrice: 150, total: 120000 },
            { id: "F-301", category: "أعمال تشطيبات", description: "تشطيبات رخام فاخرة للأرضيات", unit: "m²", quantity: 600, unitPrice: 850, total: 510000 }
        ],
        crewRecommendation: { totalPersonnel: 25, breakdown: { "مدير مشروع": 1, "مهندس موقع": 2, "مشرف": 3, "عامل": 19 } },
        financialRisks: [
            { risk: "تقلب أسعار المواد الخام (الحديد والأسمنت).", mitigation: "توقيع عقود توريد بأسعار ثابتة قدر الإمكان وتخصيص 5% من الميزانية للطوارئ." },
        ],
    }),
    riskAnalysisJson: JSON.stringify({
        risks: [
            { category: "Financial", description: "تجاوز الميزانية بسبب ارتفاع أسعار التشطيبات الفاخرة.", impact: "High", probability: "Medium", mitigation: "اعتماد جميع المواد والعينات قبل البدء في التنفيذ." },
            { category: "Operational", description: "تأخير في توريد المواد المستوردة.", impact: "Medium", probability: "High", mitigation: "الطلب المبكر للمواد وتحديد موردين بدلاء." }
        ]
    })
  },
  {
    name: "تجهيز فعالية إطلاق سيارة كهربائية",
    status: "مكتمل",
    variant: "secondary",
    location: "الدمام، مركز المعارض",
    imageUrl: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=600",
    imageHint: "event stage setup",
    progress: 100,
    estimatedBudget: 850000,
    currency: "SAR",
    lat: 26.3927,
    lng: 49.9774,
    manager: "نورة القحطاني",
    endDate: "2024-06-15",
    createdAt: "2024-04-01T14:00:00Z",
    ownerId: "user-456",
    projectType: 'event_setup',
    quality: 'premium',
    scopeOfWork: 'تجهيز كامل لفعالية إطلاق سيارة كهربائية جديدة، يشمل بناء المسرح الرئيسي، وتوفير أنظمة الصوت والإضاءة والشاشات، وتصميم وتصنيع أجنحة العرض، وتنظيم منطقة استقبال كبار الشخصيات.',
    ganttChartDataJson: JSON.stringify([
        { id: 1, task: 'التصميم والتعاقدات', responsible: 'المنظم', start: '2024-04-01', end: '2024-04-30', duration: 30, progress: 100 },
        { id: 2, task: 'تصنيع الديكورات والأجنحة', responsible: 'الموردون', start: '2024-05-01', end: '2024-05-30', duration: 30, progress: 100 },
        { id: 3, task: 'التركيب والتجهيز في الموقع', responsible: 'فريق العمل', start: '2024-06-01', end: '2024-06-13', duration: 13, progress: 100 },
        { id: 4, task: 'يوم الفعالية', responsible: 'الجميع', start: '2024-06-14', end: '2024-06-14', duration: 1, progress: 100 },
        { id: 5, task: 'التفكيك والتسليم', responsible: 'فريق العمل', start: '2024-06-15', end: '2024-06-15', duration: 1, progress: 100 },
    ]),
    costEstimationJson: JSON.stringify({
        totalEstimatedCost: "850,000 SAR",
        boq: [
            { id: "L-101", category: "إضاءة وصوتيات", description: "تأجير وتركيب نظام إضاءة متكامل للمسرح", unit: "مقطوعية", quantity: 1, unitPrice: 150000, total: 150000 },
            { id: "S-201", category: "هياكل وديكور", description: "بناء وتركيب المسرح الرئيسي مع شاشة LED", unit: "m²", quantity: 100, unitPrice: 2500, total: 250000 }
        ],
        crewRecommendation: { totalPersonnel: 40, breakdown: { "مدير فعالية": 1, "فني إضاءة": 4, "فني صوت": 4, "منظم": 31 } },
        financialRisks: [],
    }),
    riskAnalysisJson: JSON.stringify({
        risks: [
            { category: "Technical", description: "عطل فني في أنظمة الصوت أو الإضاءة أثناء الفعالية.", impact: "High", probability: "Low", mitigation: "توفير فريق فني متخصص في الموقع وفحص جميع المعدات مسبقًا." },
            { category: "External", description: "ظروف جوية سيئة تؤثر على حضور الجمهور (إذا كانت الفعالية خارجية).", impact: "Medium", probability: "Low", mitigation: "وضع خطة بديلة لموقع داخلي." }
        ]
    })
  },
  {
    name: "إنشاء برج المكاتب الذكي بجدة",
    status: "قيد التنفيذ",
    variant: "default",
    location: "جدة، طريق الملك عبدالعزيز",
    imageUrl: "https://images.unsplash.com/photo-1519999499802-9a3b1c557117?q=80&w=600",
    imageHint: "skyscraper office building",
    progress: 40,
    estimatedBudget: 120000000,
    currency: "SAR",
    lat: 21.5433,
    lng: 39.1728,
    manager: "أحمد منصور",
    endDate: "2026-12-31",
    createdAt: "2023-03-01T09:00:00Z",
    ownerId: "user-789",
    projectType: 'commercial_building',
    quality: 'luxury',
    scopeOfWork: 'إنشاء برج مكاتب من 30 طابقًا على طريق الملك عبدالعزيز في جدة، بمساحة بناء إجمالية 50,000 متر مربع. يتضمن المشروع أنظمة ذكية لإدارة المباني (BMS)، وواجهات زجاجية حديثة، ومواقف سيارات متعددة الطوابق.',
    ganttChartDataJson: JSON.stringify([
      { id: 1, task: 'أعمال الأساسات العميقة والحفر', responsible: 'المقاول', start: '2023-03-01', end: '2023-10-01', duration: 210, progress: 100 },
      { id: 2, task: 'بناء الهيكل الخرساني (30 طابق)', responsible: 'المقاول', start: '2023-10-02', end: '2025-04-01', duration: 540, progress: 45 },
      { id: 3, task: 'تركيب الواجهات الزجاجية', responsible: 'مقاول الواجهات', start: '2024-06-01', end: '2025-10-01', duration: 480, progress: 15 },
      { id: 4, task: 'الأعمال الكهروميكانيكية والتشطيبات', responsible: 'مقاول التشطيبات', start: '2025-01-01', end: '2026-09-01', duration: 600, progress: 0 },
      { id: 5, task: 'الاختبار والتسليم', responsible: 'الجميع', start: '2026-09-02', end: '2026-12-31', duration: 120, progress: 0 },
    ]),
    costEstimationJson: JSON.stringify({
        totalEstimatedCost: "120,000,000 SAR",
        boq: [
          { id: "STR-1", category: "الهيكل", description: "أعمال الهيكل الخرساني الكاملة للبرج", unit: "مقطوعية", quantity: 1, unitPrice: 45000000, total: 45000000 },
          { id: "FAC-1", category: "الواجهات", description: "توريد وتركيب واجهات زجاجية (Curtain Wall)", unit: "m²", quantity: 15000, unitPrice: 2500, total: 37500000 }
        ],
        crewRecommendation: { totalPersonnel: 350, breakdown: { "مدير مشروع": 2, "مهندس إنشائي": 5, "مهندس معماري": 4, "مساح": 4, "مشرف": 20, "عامل": 315 } },
        financialRisks: [
          { risk: "تغير سعر صرف العملات للمواد المستوردة (الواجهات).", mitigation: "التحوط ضد تقلبات أسعار الصرف وإبرام العقود بالعملة المحلية إن أمكن." },
          { risk: "تكاليف غير متوقعة في أعمال الأساسات العميقة.", mitigation: "إجراء دراسة جيوتقنية مفصلة جداً وتخصيص ميزانية طوارئ بنسبة 10% لأعمال الأساسات."}
        ]
    }),
    riskAnalysisJson: JSON.stringify({
        risks: [
          { category: "Technical", description: "تحديات لوجستية في رفع المواد للطوابق العليا.", impact: "High", probability: "High", mitigation: "استخدام رافعات برجية حديثة وجدولة دقيقة لعمليات الرفع." },
          { category: "Legal", description: "تأخير في الحصول على تصاريح العمل في الارتفاعات العالية.", impact: "Medium", probability: "Medium", mitigation: "البدء في إجراءات التصاريح مبكراً والتنسيق المستمر مع الجهات المعنية." }
        ]
    })
  },
  {
    name: "تطوير حديقة الملك سلمان العامة",
    status: "مخطط له",
    variant: "outline",
    location: "الرياض",
    imageUrl: "https://images.unsplash.com/photo-1542892945-9310b4150498?q=80&w=600",
    imageHint: "public park landscape",
    progress: 0,
    estimatedBudget: 25000000,
    currency: "SAR",
    lat: 24.7136,
    lng: 46.6753,
    manager: "فهد العتيبي",
    endDate: "2026-06-30",
    createdAt: "2024-07-10T11:00:00Z",
    ownerId: "user-123",
    projectType: 'other',
    quality: 'premium',
    scopeOfWork: 'تطوير حديقة عامة بمساحة 200,000 متر مربع تشمل أعمال تسوية، زراعة مسطحات خضراء وأشجار، إنشاء شبكات ري حديثة، ممرات للمشاة والدراجات، مناطق ألعاب أطفال، ومباني خدمية (دورات مياه، أكشاك).',
    ganttChartDataJson: null,
    costEstimationJson: null,
    riskAnalysisJson: null
  },
  {
    name: "مجمع فلل الأصالة السكني",
    status: "متأخر",
    variant: "destructive",
    location: "الخبر، حي العزيزية",
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=600",
    imageHint: "residential compound houses",
    progress: 80,
    estimatedBudget: 85000000,
    currency: "SAR",
    lat: 26.2173,
    lng: 50.2078,
    manager: "علي محمد",
    endDate: "2024-05-30",
    createdAt: "2022-01-20T15:00:00Z",
    ownerId: "user-456",
    projectType: 'residential_villa',
    quality: 'standard',
    scopeOfWork: 'بناء مجمع سكني يضم 50 فيلا متطابقة بنظام تسليم المفتاح، مع تطوير كامل للبنية التحتية للمجمع من طرق وأرصفة وشبكات كهرباء ومياه وصرف صحي.',
    ganttChartDataJson: JSON.stringify([
      { id: 1, task: 'أعمال البنية التحتية', responsible: 'المقاول', start: '2022-02-01', end: '2022-08-01', duration: 180, progress: 100 },
      { id: 2, task: 'بناء هياكل الفلل (المجموعة الأولى)', responsible: 'المقاول', start: '2022-08-02', end: '2023-05-01', duration: 270, progress: 100 },
      { id: 3, task: 'بناء هياكل الفلل (المجموعة الثانية)', responsible: 'المقاول', start: '2023-05-02', end: '2024-02-01', duration: 270, progress: 95 },
      { id: 4, task: 'أعمال التشطيبات والتسليم', responsible: 'المقاول', start: '2023-11-01', end: '2024-05-30', duration: 210, progress: 60 },
    ]),
    costEstimationJson: JSON.stringify({
        totalEstimatedCost: "85,000,000 SAR",
        boq: [
          { id: "INF-1", category: "بنية تحتية", description: "أعمال الطرق والأسفلت", unit: "m²", quantity: 15000, unitPrice: 90, total: 1350000 },
          { id: "VIL-1", category: "إنشاءات", description: "تكلفة بناء الفيلا الواحدة (تسليم مفتاح)", unit: "فيلا", quantity: 50, unitPrice: 1500000, total: 75000000 }
        ],
        crewRecommendation: { totalPersonnel: 200, breakdown: { "مدير مشروع": 1, "مهندس موقع": 4, "مراقب": 10, "عامل": 185 } },
        financialRisks: [
          { risk: "تباطؤ المبيعات وتأثيره على التدفقات النقدية للمشروع.", mitigation: "تطبيق خطط تسويق مرنة وتقديم عروض للمشترين." },
        ]
    }),
    riskAnalysisJson: JSON.stringify({
        risks: [
          { category: "Operational", description: "صعوبة إدارة جودة التشطيبات في 50 فيلا بشكل متطابق.", impact: "High", probability: "High", mitigation: "استخدام نظام checklists للجودة وتعيين فريق متخصص لمراقبة الجودة لكل مجموعة فلل." }
        ]
    })
  },
  {
    name: "تشطيب داخلي لمكاتب شركة تقنية",
    status: "مكتمل",
    variant: "secondary",
    location: "الرياض، واجهة الرياض",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600",
    imageHint: "modern office interior",
    progress: 100,
    estimatedBudget: 2200000,
    currency: "SAR",
    lat: 24.8136,
    lng: 46.6753,
    manager: "سارة عبدالله",
    endDate: "2024-03-30",
    createdAt: "2023-12-01T09:30:00Z",
    ownerId: "user-789",
    projectType: 'interior_finishing',
    quality: 'premium',
    scopeOfWork: 'أعمال التشطيب الداخلي لمقر شركة تقنية بمساحة 1500 متر مربع، يشمل مساحات عمل مفتوحة، غرف اجتماعات، منطقة استراحة، وقواطع زجاجية.',
    ganttChartDataJson: null,
    costEstimationJson: null,
    riskAnalysisJson: null
  }
];
