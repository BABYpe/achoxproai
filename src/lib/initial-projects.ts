
import { Project } from "@/hooks/use-project-store";

export const initialProjects: Omit<Project, 'id'>[] = [
  {
    title: "بناء فيلا فاخرة في حي الياسمين",
    status: "قيد التنفيذ",
    variant: "default",
    location: "الرياض، حي الياسمين",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600",
    imageHint: "luxury villa modern",
    progress: 65,
    budget: 3500000,
    currency: "SAR",
    lat: 24.8136,
    lng: 46.6753,
    manager: "علي محمد",
    endDate: "2025-12-31",
    createdAt: "2024-01-15T10:00:00Z",
    projectType: 'residential_villa',
    quality: 'luxury',
    scopeOfWork: 'بناء فيلا سكنية فاخرة بمساحة 600 متر مربع في حي الياسمين بالرياض، تتكون من دورين وملحق علوي. يشمل العمل جميع مراحل الإنشاء من الحفر والأساسات والخرسانات والمباني، بالإضافة إلى أعمال التشطيبات الداخلية والخارجية بمستوى فاخر، وتنسيق الحدائق والمسبح الخارجي.',
    ganttChartData: [
        { id: 1, task: 'مرحلة التصميم والترخيص', responsible: 'الاستشاري والمالك', start: '2024-01-15', end: '2024-03-15', duration: 60, progress: 100 },
        { id: 2, task: 'أعمال الحفر والأساسات', responsible: 'المقاول', start: '2024-03-16', end: '2024-05-15', duration: 60, progress: 100 },
        { id: 3, task: 'أعمال الهيكل الخرساني', responsible: 'المقاول', start: '2024-05-16', end: '2024-11-15', duration: 180, progress: 80 },
        { id: 4, task: 'أعمال المباني والتشطيبات الأولية', responsible: 'المقاول', start: '2024-11-16', end: '2025-05-15', duration: 180, progress: 40 },
        { id: 5, task: 'أعمال التشطيبات النهائية', responsible: 'المقاول', start: '2025-05-16', end: '2025-11-15', duration: 180, progress: 10 },
        { id: 6, task: 'تنسيق الموقع والتسليم', responsible: 'المقاول والمالك', start: '2025-11-16', end: '2025-12-31', duration: 45, progress: 0 },
    ],
    costEstimation: {
        totalEstimatedCost: "3,500,000 SAR",
        boq: [
            { id: "C-101", category: "أعمال خرسانية", description: "خرسانة مسلحة للقواعد والأساسات", unit: "m³", quantity: 250, unitPrice: 480, total: 120000 },
            { id: "M-201", category: "أعمال مباني", description: "بناء جدران خارجية معزولة", unit: "m²", quantity: 800, unitPrice: 150, total: 120000 },
            { id: "F-301", category: "أعمال تشطيبات", description: "تشطيبات رخام فاخرة للأرضيات", unit: "m²", quantity: 600, unitPrice: 850, total: 510000 }
        ],
        crewRecommendation: { totalPersonnel: 25, breakdown: { "مدير مشروع": 1, "مهندس موقع": 2, "مشرف": 3, "عامل": 19 } },
        ganttChartData: [
             { id: 1, task: 'التصميم والترخيص', responsible: 'الاستشاري', start: '2024-01-15', end: '2024-03-15', duration: 60, progress: 100 },
             { id: 2, task: 'الهيكل الخرساني', responsible: 'المقاول', start: '2024-05-16', end: '2024-11-15', duration: 180, progress: 80 },
        ],
        financialRisks: [
            { risk: "تقلب أسعار المواد الخام (الحديد والأسمنت).", mitigation: "توقيع عقود توريد بأسعار ثابتة قدر الإمكان وتخصيص 5% من الميزانية للطوارئ." },
        ],
    },
    riskAnalysis: {
        risks: [
            { category: "Financial", description: "تجاوز الميزانية بسبب ارتفاع أسعار التشطيبات الفاخرة.", impact: "High", probability: "Medium", mitigation: "اعتماد جميع المواد والعينات قبل البدء في التنفيذ." },
            { category: "Operational", description: "تأخير في توريد المواد المستوردة.", impact: "Medium", probability: "High", mitigation: "الطلب المبكر للمواد وتحديد موردين بدلاء." }
        ]
    }
  },
  {
    title: "تجهيز فعالية إطلاق سيارة كهربائية",
    status: "مكتمل",
    variant: "secondary",
    location: "الدمام، مركز المعارض",
    imageUrl: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=600",
    imageHint: "event stage setup",
    progress: 100,
    budget: 850000,
    currency: "SAR",
    lat: 26.3927,
    lng: 49.9774,
    manager: "نورة القحطاني",
    endDate: "2024-06-15",
    createdAt: "2024-04-01T14:00:00Z",
    projectType: 'event_setup',
    quality: 'premium',
    scopeOfWork: 'تجهيز كامل لفعالية إطلاق سيارة كهربائية جديدة، يشمل بناء المسرح الرئيسي، وتوفير أنظمة الصوت والإضاءة والشاشات، وتصميم وتصنيع أجنحة العرض، وتنظيم منطقة استقبال كبار الشخصيات.',
     ganttChartData: [
        { id: 1, task: 'التصميم والتعاقدات', responsible: 'المنظم', start: '2024-04-01', end: '2024-04-30', duration: 30, progress: 100 },
        { id: 2, task: 'تصنيع الديكورات والأجنحة', responsible: 'الموردون', start: '2024-05-01', end: '2024-05-30', duration: 30, progress: 100 },
        { id: 3, task: 'التركيب والتجهيز في الموقع', responsible: 'فريق العمل', start: '2024-06-01', end: '2024-06-13', duration: 13, progress: 100 },
        { id: 4, task: 'يوم الفعالية', responsible: 'الجميع', start: '2024-06-14', end: '2024-06-14', duration: 1, progress: 100 },
        { id: 5, task: 'التفكيك والتسليم', responsible: 'فريق العمل', start: '2024-06-15', end: '2024-06-15', duration: 1, progress: 100 },
    ],
    costEstimation: {
        totalEstimatedCost: "850,000 SAR",
        boq: [
            { id: "L-101", category: "إضاءة وصوتيات", description: "تأجير وتركيب نظام إضاءة متكامل للمسرح", unit: "مقطوعية", quantity: 1, unitPrice: 150000, total: 150000 },
            { id: "S-201", category: "هياكل وديكور", description: "بناء وتركيب المسرح الرئيسي مع شاشة LED", unit: "m²", quantity: 100, unitPrice: 2500, total: 250000 }
        ],
        crewRecommendation: { totalPersonnel: 40, breakdown: { "مدير فعالية": 1, "فني إضاءة": 4, "فني صوت": 4, "منظم": 31 } },
        ganttChartData: [
             { id: 1, task: 'التصميم والتعاقدات', responsible: 'المنظم', start: '2024-04-01', end: '2024-04-30', duration: 30, progress: 100 },
             { id: 2, task: 'يوم الفعالية', responsible: 'الجميع', start: '2024-06-14', end: '2024-06-14', duration: 1, progress: 100 },
        ],
        financialRisks: [],
    },
    riskAnalysis: {
        risks: [
            { category: "Technical", description: "عطل فني في أنظمة الصوت أو الإضاءة أثناء الفعالية.", impact: "High", probability: "Low", mitigation: "توفير فريق فني متخصص في الموقع وفحص جميع المعدات مسبقًا." },
            { category: "External", description: "ظروف جوية سيئة تؤثر على حضور الجمهور (إذا كانت الفعالية خارجية).", impact: "Medium", probability: "Low", mitigation: "وضع خطة بديلة لموقع داخلي." }
        ]
    }
  },
    {
    title: "تشطيبات فندق 5 نجوم في الخبر",
    status: "قيد التنفيذ",
    variant: "default",
    location: "الخبر، الكورنيش",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600",
    imageHint: "hotel lobby luxury",
    progress: 75,
    budget: 45000000,
    currency: "SAR",
    lat: 26.2173,
    lng: 50.2078,
    manager: "سارة عبدالله",
    endDate: "2025-02-28",
    createdAt: "2023-07-01T12:00:00Z",
    projectType: 'interior_finishing',
    quality: 'luxury',
    scopeOfWork: 'أعمال التشطيبات الداخلية الفاخرة لفندق 5 نجوم، تشمل 200 غرفة وجناح، بالإضافة إلى البهو الرئيسي والمطاعم والقاعات والسبا، باستخدام مواد عالية الجودة وتصاميم مخصصة.',
    ganttChartData: [
        { id: 1, task: 'تجهيز الموقع وأعمال الكهروميكانيك الأولية', responsible: 'المقاول', start: '2023-07-01', end: '2023-12-01', duration: 150, progress: 100 },
        { id: 2, task: 'تشطيبات الغرف والأجنحة (نموذج)', responsible: 'المقاول', start: '2023-12-02', end: '2024-03-01', duration: 90, progress: 100 },
        { id: 3, task: 'تشطيبات الغرف والأجنحة (باقي الطوابق)', responsible: 'المقاول', start: '2024-03-02', end: '2024-12-01', duration: 270, progress: 50 },
        { id: 4, task: 'تشطيبات المناطق العامة (اللوبي، المطاعم)', responsible: 'المقاول', start: '2024-09-01', end: '2025-01-31', duration: 150, progress: 30 },
        { id: 5, task: 'التأثيث والتسليم النهائي', responsible: 'المقاول والمالك', start: '2025-02-01', end: '2025-02-28', duration: 28, progress: 0 },
    ],
    costEstimation: {
        totalEstimatedCost: "45,000,000 SAR",
        boq: [
            { id: "F-301", category: "تشطيبات", description: "توريد وتركيب رخام كرارة للبهو الرئيسي", unit: "m²", quantity: 2000, unitPrice: 1200, total: 2400000 },
            { id: "J-401", category: "نجارة", description: "أبواب خشبية مقاومة للحريق للغرف", unit: "عدد", quantity: 200, unitPrice: 3500, total: 700000 }
        ],
        crewRecommendation: { totalPersonnel: 150, breakdown: { "مدير مشروع": 1, "مهندس ديكور": 5, "مشرف تشطيبات": 10, "فني": 134 } },
        ganttChartData: [
            { id: 1, task: 'تشطيبات الغرف', responsible: 'المقاول', start: '2024-03-02', end: '2024-12-01', duration: 270, progress: 50 },
            { id: 2, task: 'تشطيبات المناطق العامة', responsible: 'المقاول', start: '2024-09-01', end: '2025-01-31', duration: 150, progress: 30 },
        ],
        financialRisks: [
             { risk: "تلف المواد الفاخرة أثناء النقل أو التركيب.", mitigation: "التأمين على جميع المواد وتدريب العمالة على التعامل معها بحرص." },
        ],
    },
    riskAnalysis: {
        risks: [
            { category: "Operational", description: "عدم تطابق التشطيبات النهائية مع العينات المعتمدة.", impact: "High", probability: "Medium", mitigation: "وجود إشراف هندسي دائم ومراقبة جودة صارمة في كل مرحلة." },
            { category: "Financial", description: "الحاجة إلى عمالة فنية ماهرة ومتخصصة بتكلفة أعلى من المتوقع.", impact: "Medium", probability: "High", mitigation: "التعاقد مع مقاولي باطن معتمدين ولديهم سابقة أعمال في المشاريع الفندقية." }
        ]
    }
  },
];
