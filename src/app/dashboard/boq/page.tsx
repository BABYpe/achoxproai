
"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Upload, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCurrentUser } from "@/lib/auth";

const masterBoqItems = [
  // --- الأعمال الترابية ---
  { id: "EAR-001", category: "أعمال ترابية وحفريات", description: "حفر أساسات في تربة عادية", unit: "م³", quantity: 1, unitPrice: 45, total: 45 },
  { id: "EAR-002", category: "أعمال ترابية وحفريات", description: "حفر أساسات في تربة صخرية", unit: "م³", quantity: 1, unitPrice: 120, total: 120 },
  { id: "EAR-003", category: "أعمال ترابية وحفريات", description: "ردم من ناتج الحفر مع الرش والدك", unit: "م³", quantity: 1, unitPrice: 25, total: 25 },
  { id: "EAR-004", category: "أعمال ترابية وحفريات", description: "توريد رمل نظيف للردم", unit: "م³", quantity: 1, unitPrice: 60, total: 60 },
  { id: "EAR-005", category: "أعمال ترابية وحفريات", description: "توريد وتنفيذ طبقة إحلال (بيسكورس)", unit: "م³", quantity: 1, unitPrice: 80, total: 80 },
  { id: "EAR-006", category: "أعمال ترابية وحفريات", description: "اختبار دمك التربة (بروكتور)", unit: "عينة", quantity: 1, unitPrice: 400, total: 400 },
  
  // --- الأعمال الخرسانية ---
  { id: "CON-001", category: "أعمال خرسانية", description: "خرسانة نظافة أسفل القواعد", unit: "م³", quantity: 1, unitPrice: 380, total: 380 },
  { id: "CON-002", category: "أعمال خرسانية", description: "خرسانة مسلحة للقواعد (إجهاد 350 كجم/سم²)", unit: "م³", quantity: 1, unitPrice: 450, total: 450 },
  { id: "CON-003", category: "أعمال خرسانية", description: "خرسانة مسلحة للأعمدة (إجهاد 400 كجم/سم²)", unit: "م³", quantity: 1, unitPrice: 550, total: 550 },
  { id: "CON-004", category: "أعمال خرسانية", description: "خرسانة مسلحة للأسقف (Solid Slab)", unit: "م³", quantity: 1, unitPrice: 600, total: 600 },
  { id: "CON-005", category: "أعمال خرسانية", description: "خرسانة مسلحة للأسقف (Hordi Slab)", unit: "م²", quantity: 1, unitPrice: 180, total: 180 },
  { id: "CON-006", category: "أعمال خرسانية", description: "حديد تسليح (توريد وتركيب)", unit: "طن", quantity: 1, unitPrice: 4200, total: 4200 },
  { id: "CON-007", category: "أعمال خرسانية", description: "شدة خشبية للقواعد والأعمدة", unit: "م²", quantity: 1, unitPrice: 50, total: 50 },
  { id: "CON-008", category: "أعمال خرسانية", description: "شدة معدنية للأسقف", unit: "م²", quantity: 1, unitPrice: 70, total: 70 },
  { id: "CON-009", category: "أعمال خرسانية", description: "معالجة الخرسانة بالماء", unit: "مقطوعة", quantity: 1, unitPrice: 500, total: 500 },
  { id: "CON-010", category: "أعمال خرسانية", description: "خرسانة مطبوعة للأرصفة والممرات", unit: "م²", quantity: 1, unitPrice: 150, total: 150 },
  
  // --- أعمال المباني والبياض ---
  { id: "MAS-001", category: "أعمال مباني وبياض", description: "بناء بلوك أسمنتي مصمت 20 سم", unit: "م²", quantity: 1, unitPrice: 65, total: 65 },
  { id: "MAS-002", category: "أعمال مباني وبياض", description: "بناء بلوك أسمنتي مفرغ 20 سم", unit: "م²", quantity: 1, unitPrice: 55, total: 55 },
  { id: "MAS-003", category: "أعمال مباني وبياض", description: "بناء طوب أحمر فخاري", unit: "م²", quantity: 1, unitPrice: 75, total: 75 },
  { id: "MAS-004", category: "أعمال مباني وبياض", description: "لياسة (بياض) داخلية مع شبك فايبر", unit: "م²", quantity: 1, unitPrice: 32, total: 32 },
  { id: "MAS-005", category: "أعمال مباني وبياض", description: "لياسة (بياض) خارجية مع طبقة طرطشة", unit: "م²", quantity: 1, unitPrice: 40, total: 40 },
  { id: "MAS-006", category: "أعمال مباني وبياض", description: "سلم مباني 15 سم (القباني)", unit: "قطعة", quantity: 1, unitPrice: 4.60, total: 4.60 },
  { id: "MAS-007", category: "أعمال مباني وبياض", description: "سلم مباني 20 سم (القباني)", unit: "قطعة", quantity: 1, unitPrice: 4.60, total: 4.60 },
  { id: "MAS-008", category: "أعمال مباني وبياض", description: "سلم مباني 10 سم (القباني)", unit: "قطعة", quantity: 1, unitPrice: 4.60, total: 4.60 },
  { id: "MAS-009", category: "أعمال مباني وبياض", description: "سلم مباني 5 سم (القباني)", unit: "قطعة", quantity: 1, unitPrice: 4.60, total: 4.60 },
  { id: "MAS-010", category: "أعمال مباني وبياض", description: "زاوية مباني (القباني)", unit: "قطعة", quantity: 1, unitPrice: 0.90, total: 0.90 },

  // --- بلوك سيپوركس ---
  { id: "SIP-001", category: "بلوك سيپوركس", description: "بلوك سيپوركس 10 * 20 * 60", unit: "م³", quantity: 1, unitPrice: 180.00, total: 180.00 },
  { id: "SIP-002", category: "بلوك سيپوركس", description: "بلوك سيپوركس 15 * 20 * 60", unit: "م³", quantity: 1, unitPrice: 180.00, total: 180.00 },
  { id: "SIP-003", category: "بلوك سيپوركس", description: "بلوك سيپوركس 20 * 20 * 60", unit: "م³", quantity: 1, unitPrice: 180.00, total: 180.00 },
  { id: "SIP-004", category: "بلوك سيپوركس", description: "بلوك سيپوركس 20 * 25 * 60", unit: "م³", quantity: 1, unitPrice: 180.00, total: 180.00 },
  { id: "SIP-005", category: "بلوك سيپوركس", description: "منشار سيپوركس", unit: "قطعة", quantity: 1, unitPrice: 5.00, total: 5.00 },
  
  // --- أعمال العزل ---
  { id: "INS-001", category: "أعمال عزل", description: "عزل مائي للأسطح (لفائف بيتومين)", unit: "م²", quantity: 1, unitPrice: 40, total: 40 },
  { id: "INS-002", category: "أعمال عزل", description: "عزل حراري للأسطح (بوليسترين مبثوق)", unit: "م²", quantity: 1, unitPrice: 55, total: 55 },
  { id: "INS-003", category: "أعمال عزل", description: "عزل الحمامات والمطابخ (دهان أسمنتي)", unit: "م²", quantity: 1, unitPrice: 30, total: 30 },
  { id: "INS-004", category: "أعمال عزل", description: "عزل صوتي للجدران (صوف صخري)", unit: "م²", quantity: 1, unitPrice: 60, total: 60 },
  
  // --- أعمال الأرضيات والتشطيبات ---
  { id: "FLR-001", category: "أعمال الأرضيات والتشطيبات", description: "توريد وتركيب بلاط سيراميك للأرضيات", unit: "م²", quantity: 1, unitPrice: 80, total: 80 },
  { id: "FLR-002", category: "أعمال الأرضيات والتشطيبات", description: "توريد وتركيب بلاط بورسلان للأرضيات (60x60 سم)", unit: "م²", quantity: 1, unitPrice: 120, total: 120 },
  { id: "FLR-003", category: "أعمال الأرضيات والتشطيبات", description: "توريد وتركيب رخام للأرضيات (كرارة)", unit: "م²", quantity: 1, unitPrice: 250, total: 250 },
  { id: "FLR-004", category: "أعمال الأرضيات والتشطيبات", description: "توريد وتركيب باركيه HDF", unit: "م²", quantity: 1, unitPrice: 90, total: 90 },
  { id: "FLR-005", category: "أعمال الأرضيات والتشطيبات", description: "توريد وتركيب وزرات (نعلات) رخام", unit: "م.ط", quantity: 1, unitPrice: 45, total: 45 },
  { id: "FLR-006", category: "أعمال الأرضيات والتشطيبات", description: "توريد وتركيب سيراميك لجدران الحمامات", unit: "م²", quantity: 1, unitPrice: 95, total: 95 },
  
  // --- أعمال الدهانات ---
  { id: "PNT-001", category: "أعمال الدهانات", description: "دهان بلاستيك داخلي (وجهان)", unit: "م²", quantity: 1, unitPrice: 22, total: 22 },
  { id: "PNT-002", category: "أعمال الدهانات", description: "دهان خارجي (بروفايل)", unit: "م²", quantity: 1, unitPrice: 45, total: 45 },
  { id: "PNT-003", category: "أعمال الدهانات", description: "دهان ديكوري داخلي (تعتيق / ستوكو)", unit: "م²", quantity: 1, unitPrice: 60, total: 60 },
  { id: "PNT-004", category: "أعمال الدهانات", description: "دهان إيبوكسي للأرضيات", unit: "م²", quantity: 1, unitPrice: 50, total: 50 },
  
  // --- أعمال الأسقف ---
  { id: "CEI-001", category: "أعمال الأسقف", description: "توريد وتركيب أسقف جبس بورد عادية", unit: "م²", quantity: 1, unitPrice: 75, total: 75 },
  { id: "CEI-002", category: "أعمال الأسقف", description: "توريد وتركيب أسقف جبس بورد مقاومة للرطوبة (أخضر)", unit: "م²", quantity: 1, unitPrice: 90, total: 90 },
  { id: "CEI-003", category: "أعمال الأسقف", description: "توريد وتركيب شرائح ألومنيوم للأسقف", unit: "م²", quantity: 1, unitPrice: 110, total: 110 },
  
  // --- أعمال الأبواب والشبابيك ---
  { id: "DW-001", category: "أعمال الأبواب والشبابيك", description: "توريد وتركيب أبواب خشبية داخلية (MDF)", unit: "عدد", quantity: 1, unitPrice: 1200, total: 1200 },
  { id: "DW-002", category: "أعمال الأبواب والشبابيك", description: "توريد وتركيب أبواب خشب سنديان صلب", unit: "عدد", quantity: 1, unitPrice: 2800, total: 2800 },
  { id: "DW-003", category: "أعمال الأبواب والشبابيك", description: "توريد وتركيب أبواب حديد خارجية", unit: "م²", quantity: 1, unitPrice: 650, total: 650 },
  { id: "DW-004", category: "أعمال الأبواب والشبابيك", description: "توريد وتركيب شبابيك ألومنيوم (زجاج مزدوج)", unit: "م²", quantity: 1, unitPrice: 550, total: 550 },
  
  // --- لوازم كهربائية ---
  { id: "ELE-001", category: "لوازم كهربائية", description: "تأسيس نقطة إنارة (مواسير وعلب)", unit: "نقطة", quantity: 1, unitPrice: 180, total: 180 },
  { id: "ELE-002", category: "لوازم كهربائية", description: "تأسيس نقطة فيش كهرباء (بريزة)", unit: "نقطة", quantity: 1, unitPrice: 160, total: 160 },
  { id: "ELE-003", category: "لوازم كهربائية", description: "توريد وتركيب لوحة توزيع فرعية", unit: "عدد", quantity: 1, unitPrice: 800, total: 800 },
  { id: "ELE-004", category: "لوازم كهربائية", description: "توريد وتركيب لوحة توزيع رئيسية", unit: "عدد", quantity: 1, unitPrice: 2500, total: 2500 },
  { id: "ELE-005", category: "لوازم كهربائية", description: "تأسيس نقطة كاميرا مراقبة", unit: "نقطة", quantity: 1, unitPrice: 220, total: 220 },
  { id: "ELE-006", category: "لوازم كهربائية", description: "توريد وتركيب كشاف سبوت لايت LED", unit: "عدد", quantity: 1, unitPrice: 45, total: 45 },
  { id: "SUP-ELE-001", category: "لوازم كهربائية", description: "علبة حديد مجوز عميق", unit: "علبة", quantity: 1, unitPrice: 3.50, total: 3.50 },
  { id: "SUP-ELE-002", category: "لوازم كهربائية", description: "علبة حديد مفرد عميق", unit: "علبة", quantity: 1, unitPrice: 1.50, total: 1.50 },
  { id: "SUP-ELE-003", category: "لوازم كهربائية", description: "علبة حديد 147 الفنار", unit: "علبة", quantity: 1, unitPrice: 6.00, total: 6.00 },
  { id: "SUP-ELE-004", category: "لوازم كهربائية", description: "ملبوش ملم 25 نامكو دكت", unit: "قطعة", quantity: 1, unitPrice: 0.45, total: 0.45 },
  { id: "SUP-ELE-005", category: "لوازم كهربائية", description: "جلبة ملي 25 اسود نامكو دكت", unit: "قطعة", quantity: 1, unitPrice: 0.28, total: 0.28 },
  { id: "SUP-ELE-006", category: "لوازم كهربائية", description: "غراء تركيب كهرباء 8/1", unit: "قطعة", quantity: 1, unitPrice: 7.00, total: 7.00 },
  { id: "SUP-ELE-007", category: "لوازم كهربائية", description: "شطرطون رصاصي", unit: "قطعة", quantity: 1, unitPrice: 1.74, total: 1.74 },
  { id: "SUP-ELE-008", category: "لوازم كهربائية", description: "ماسوره ملي 25 اسود نامكو دکت", unit: "ماسورة", quantity: 1, unitPrice: 3.50, total: 3.50 },
  { id: "SUP-ELE-009", category: "لوازم كهربائية", description: "مسمار 6 سم جرام 2000", unit: "قطعة", quantity: 1, unitPrice: 8.70, total: 8.70 },
  { id: "SUP-ELE-010", category: "لوازم كهربائية", description: "قسام 2016", unit: "قطعة", quantity: 1, unitPrice: 3.48, total: 3.48 },

  // --- لوازم سباكة وتكييف ---
  { id: "MEC-001", category: "لوازم سباكة وتكييف", description: "تأسيس نقطة تغذية مياه (حار/بارد)", unit: "نقطة", quantity: 1, unitPrice: 250, total: 250 },
  { id: "MEC-002", category: "لوازم سباكة وتكييف", description: "تأسيس نقطة صرف صحي (PVC)", unit: "نقطة", quantity: 1, unitPrice: 200, total: 200 },
  { id: "MEC-003", category: "لوازم سباكة وتكييف", description: "توريد وتركيب وحدة تكييف سبليت (2 طن)", unit: "عدد", quantity: 1, unitPrice: 2800, total: 2800 },
  { id: "MEC-004", category: "لوازم سباكة وتكييف", description: "تأسيس مواسير نحاس لوحدة تكييف", unit: "م.ط", quantity: 1, unitPrice: 90, total: 90 },
  { id: "MEC-005", category: "لوازم سباكة وتكييف", description: "توريد وتركيب كرسي إفرنجي معلق", unit: "عدد", quantity: 1, unitPrice: 1300, total: 1300 },
  { id: "MEC-006", category: "لوازم سباكة وتكييف", description: "تأسيس نظام مكافحة حريق (رشاشات)", unit: "نقطة", quantity: 1, unitPrice: 350, total: 350 },
  { id: "MEC-007", category: "لوازم سباكة وتكييف", description: "توريد وتركيب مضخة مياه (1 حصان)", unit: "عدد", quantity: 1, unitPrice: 950, total: 950 },
  { id: "SUP-PLM-001", category: "لوازم سباكة وتكييف", description: "ماسورة 63 ملم كلاس 3 نبرو", unit: "ماسورة", quantity: 1, unitPrice: 33.00, total: 33.00 },
  { id: "SUP-PLM-002", category: "لوازم سباكة وتكييف", description: "كوع فاتح 63 ملي طويل نيبرو", unit: "كوع", quantity: 1, unitPrice: 12.00, total: 12.00 },
  { id: "SUP-PLM-003", category: "لوازم سباكة وتكييف", description: "ماسورة ملم 40 حراري المنيف", unit: "ماسورة", quantity: 1, unitPrice: 39.13, total: 39.13 },
  { id: "SUP-PLM-004", category: "لوازم سباكة وتكييف", description: "ماسورة ملم 32 حراري المنيف", unit: "ماسورة", quantity: 1, unitPrice: 26.09, total: 26.09 },
  { id: "SUP-PLM-005", category: "لوازم سباكة وتكييف", description: "جلبة 40 ملم حراري المنيف", unit: "جلبة", quantity: 1, unitPrice: 2.00, total: 2.00 },
  { id: "SUP-PLM-006", category: "لوازم سباكة وتكييف", description: "جلبة 32 ملم حراري المنيف", unit: "جلبة", quantity: 1, unitPrice: 1.00, total: 1.00 },
  { id: "SUP-PLM-007", category: "لوازم سباكة وتكييف", description: "كوع ملم 40 حراري المنيف", unit: "كوع", quantity: 1, unitPrice: 2.00, total: 2.00 },
  { id: "SUP-PLM-008", category: "لوازم سباكة وتكييف", description: "كوع ملم 32 حراري المنيف", unit: "كوع", quantity: 1, unitPrice: 2.82, total: 2.82 },
  { id: "SUP-PLM-009", category: "لوازم سباكة وتكييف", description: "ماسورة 75 ملم المنيف كلاس 4 غراء", unit: "ماسورة", quantity: 1, unitPrice: 44.00, total: 44.00 },
  { id: "SUP-PLM-010", category: "لوازم سباكة وتكييف", description: "جلبة 75 ملي المنيف غراء", unit: "جلبة", quantity: 1, unitPrice: 2.61, total: 2.61 },
  { id: "SUP-PLM-011", category: "لوازم سباكة وتكييف", description: "غراء 1 كيلو حار 714", unit: "قطعة", quantity: 1, unitPrice: 55.00, total: 55.00 },
  { id: "SUP-PLM-012", category: "لوازم سباكة وتكييف", description: "ماسورة ملم 20 حراري المنيف", unit: "ماسورة", quantity: 1, unitPrice: 11.00, total: 11.00 },
  { id: "SUP-PLM-013", category: "لوازم سباكة وتكييف", description: "ماسورة ملم 25 حراري المنيف", unit: "ماسورة", quantity: 1, unitPrice: 17.39, total: 17.39 },
  { id: "SUP-PLM-014", category: "لوازم سباكة وتكييف", description: "50 ماسورة ملي المنيف كلاس 4 غراء", unit: "ماسورة", quantity: 1, unitPrice: 23.00, total: 23.00 },
  { id: "SUP-PLM-015", category: "لوازم سباكة وتكييف", description: "32 ماسورة ملي رمادي المنيف", unit: "ماسورة", quantity: 1, unitPrice: 13.04, total: 13.04 },
  { id: "SUP-PLM-016", category: "لوازم سباكة وتكييف", description: "كوع فاتح 32 ملي رمادي المنيف", unit: "كوع", quantity: 1, unitPrice: 2.61, total: 2.61 },
  { id: "SUP-PLM-017", category: "لوازم سباكة وتكييف", description: "كوع 32 ملي رمادي غراء المنيف", unit: "كوع", quantity: 1, unitPrice: 2.61, total: 2.61 },
  { id: "SUP-PLM-018", category: "لوازم سباكة وتكييف", description: "جلبة 32 مم رمادي المنيف", unit: "جلبة", quantity: 1, unitPrice: 1.74, total: 1.74 },
  { id: "SUP-PLM-019", category: "لوازم سباكة وتكييف", description: "90 50 كوع ملم المنيف", unit: "كوع", quantity: 1, unitPrice: 3.70, total: 3.70 },
  { id: "SUP-PLM-020", category: "لوازم سباكة وتكييف", description: "كوع فاتح ملم 50 المنيف", unit: "كوع", quantity: 1, unitPrice: 3.48, total: 3.48 },
  { id: "SUP-PLM-021", category: "لوازم سباكة وتكييف", description: "جلبة ملم 50 المنيف", unit: "جلبة", quantity: 1, unitPrice: 3.50, total: 3.50 },
  { id: "SUP-PLM-022", category: "لوازم سباكة وتكييف", description: "محبس دفن نيبروبلاست مقاس 32 مم", unit: "قطعة", quantity: 1, unitPrice: 130.61, total: 130.61 },
  { id: "SUP-PLM-023", category: "لوازم سباكة وتكييف", description: "محبس دفن نیبروبلاست مقاس 25 مم", unit: "قطعة", quantity: 1, unitPrice: 66.00, total: 66.00 },
  { id: "SUP-PLM-024", category: "لوازم سباكة وتكييف", description: "كوع 25 ملم حراري المنيف", unit: "كوع", quantity: 1, unitPrice: 1.50, total: 1.50 },
  { id: "SUP-PLM-025", category: "لوازم سباكة وتكييف", description: "جلبة 25 ملم حراري المنيف", unit: "جلبة", quantity: 1, unitPrice: 0.80, total: 0.80 },
  { id: "SUP-PLM-026", category: "لوازم سباكة وتكييف", description: "كوع بسن داخلي *225/1 حراري المنيف", unit: "كوع", quantity: 1, unitPrice: 5.22, total: 5.22 },
  { id: "SUP-PLM-027", category: "لوازم سباكة وتكييف", description: "كوع 20 ملم حراري المنيف", unit: "كوع", quantity: 1, unitPrice: 0.80, total: 0.80 },
  { id: "SUP-PLM-028", category: "لوازم سباكة وتكييف", description: "جلبة 20 ملم حراري المنيف", unit: "جلبة", quantity: 1, unitPrice: 0.70, total: 0.70 },
  { id: "SUP-PLM-029", category: "لوازم سباكة وتكييف", description: "كوع سن حراري ×220/1 المنيف", unit: "كوع", quantity: 1, unitPrice: 5.10, total: 5.10 },
  { id: "SUP-PLM-030", category: "لوازم سباكة وتكييف", description: "تي سن 2/120 حراري المنيف", unit: "قطعة", quantity: 1, unitPrice: 5.00, total: 5.00 },
  { id: "SUP-PLM-031", category: "لوازم سباكة وتكييف", description: "تي ملم 25 حراري المنيف", unit: "قطعة", quantity: 1, unitPrice: 2.30, total: 2.30 },
  { id: "SUP-PLM-032", category: "لوازم سباكة وتكييف", description: "32 *25*32تي نقاص مم حراري المنيف", unit: "قطعة", quantity: 1, unitPrice: 3.24, total: 3.24 },
  { id: "SUP-PLM-033", category: "لوازم سباكة وتكييف", description: "نقاص حراري 2025 المنيف", unit: "قطعة", quantity: 1, unitPrice: 1.10, total: 1.10 },
  { id: "SUP-PLM-034", category: "لوازم سباكة وتكييف", description: "سدة اخضر حراري 2/1 اختبار", unit: "قطعة", quantity: 1, unitPrice: 1.00, total: 1.00 },
  { id: "SUP-PLM-035", category: "لوازم سباكة وتكييف", description: "شطرطون سباكه كبير", unit: "قطعة", quantity: 1, unitPrice: 3.50, total: 3.50 },
  
  // --- شبكات مياه وصرف صحي ---
  { id: "NET-001", category: "شبكات مياه وصرف صحي", description: "توصيلة مياه منزلية بقطر 20 مم", unit: "قطعة", quantity: 1, unitPrice: 2325.00, total: 2325.00 },
  { id: "NET-002", category: "شبكات مياه وصرف صحي", description: "توصيلة مياه منزلية بقطر 25 مم", unit: "قطعة", quantity: 1, unitPrice: 2400.00, total: 2400.00 },
  { id: "NET-003", category: "شبكات مياه وصرف صحي", description: "توصيلة مياه منزلية بقطر 32 مم", unit: "قطعة", quantity: 1, unitPrice: 2475.00, total: 2475.00 },
  { id: "NET-004", category: "شبكات مياه وصرف صحي", description: "توصيلة مياه منزلية بقطر 40 مم", unit: "قطعة", quantity: 1, unitPrice: 2550.00, total: 2550.00 },
  { id: "NET-005", category: "شبكات مياه وصرف صحي", description: "توصيلة مياه منزلية بقطر 50 مم", unit: "قطعة", quantity: 1, unitPrice: 2662.50, total: 2662.50 },
  { id: "NET-006", category: "شبكات مياه وصرف صحي", description: "توصيلة مياه منزلية بقطر 63 مم", unit: "قطعة", quantity: 1, unitPrice: 2775.00, total: 2775.00 },
  { id: "NET-007", category: "شبكات مياه وصرف صحي", description: "توصيلة مياه منزلية بقطر 100 مم", unit: "قطعة", quantity: 1, unitPrice: 3375.00, total: 3375.00 },
  { id: "NET-008", category: "شبكات مياه وصرف صحي", description: "توصيلة مياه منزلية بقطر 150 مم", unit: "قطعة", quantity: 1, unitPrice: 3750.00, total: 3750.00 },
  { id: "NET-009", category: "شبكات مياه وصرف صحي", description: "متر إضافي لتوصيلة مياه 20 مم", unit: "م.ط", quantity: 1, unitPrice: 142.50, total: 142.50 },
  { id: "NET-010", category: "شبكات مياه وصرف صحي", description: "متر إضافي لتوصيلة مياه 25 مم", unit: "م.ط", quantity: 1, unitPrice: 146.25, total: 146.25 },
  { id: "NET-011", category: "شبكات مياه وصرف صحي", description: "متر إضافي لتوصيلة مياه 32 مم", unit: "م.ط", quantity: 1, unitPrice: 150.00, total: 150.00 },
  { id: "NET-012", category: "شبكات مياه وصرف صحي", description: "متر إضافي لتوصيلة مياه 40 مم", unit: "م.ط", quantity: 1, unitPrice: 157.50, total: 157.50 },
  { id: "NET-013", category: "شبكات مياه وصرف صحي", description: "متر إضافي لتوصيلة مياه 50 مم", unit: "م.ط", quantity: 1, unitPrice: 165.00, total: 165.00 },
  { id: "NET-014", category: "شبكات مياه وصرف صحي", description: "متر إضافي لتوصيلة مياه 63 مم", unit: "م.ط", quantity: 1, unitPrice: 172.50, total: 172.50 },
  { id: "NET-015", category: "شبكات مياه وصرف صحي", description: "متر إضافي لتوصيلة مياه 100 مم", unit: "م.ط", quantity: 1, unitPrice: 225.00, total: 225.00 },
  { id: "NET-016", category: "شبكات مياه وصرف صحي", description: "متر إضافي لتوصيلة مياه 150 مم", unit: "م.ط", quantity: 1, unitPrice: 262.50, total: 262.50 },
  { id: "NET-017", category: "شبكات مياه وصرف صحي", description: "عداد مياه 0.5 بوصة (15 مم)", unit: "عدد", quantity: 1, unitPrice: 525.00, total: 525.00 },
  { id: "NET-018", category: "شبكات مياه وصرف صحي", description: "عداد مياه 0.75 بوصة (20 مم)", unit: "عدد", quantity: 1, unitPrice: 562.50, total: 562.50 },
  { id: "NET-019", category: "شبكات مياه وصرف صحي", description: "عداد مياه 1.00 بوصة (25 مم)", unit: "عدد", quantity: 1, unitPrice: 712.50, total: 712.50 },
  { id: "NET-020", category: "شبكات مياه وصرف صحي", description: "عداد مياه 1.25 بوصة (32 مم)", unit: "عدد", quantity: 1, unitPrice: 862.50, total: 862.50 },
  { id: "NET-021", category: "شبكات مياه وصرف صحي", description: "عداد مياه 1.5 بوصة", unit: "عدد", quantity: 1, unitPrice: 1012.50, total: 1012.50 },
  { id: "NET-022", category: "شبكات مياه وصرف صحي", description: "عداد مياه 2.00 بوصة (50 مم)", unit: "عدد", quantity: 1, unitPrice: 1650.00, total: 1650.00 },
  { id: "NET-023", category: "شبكات مياه وصرف صحي", description: "عداد مياه 4 بوصة (100 مم)", unit: "عدد", quantity: 1, unitPrice: 29625.00, total: 29625.00 },
  { id: "NET-024", category: "شبكات مياه وصرف صحي", description: "عداد مياه 6 بوصة (150 مم)", unit: "عدد", quantity: 1, unitPrice: 33000.00, total: 33000.00 },
  { id: "NET-025", category: "شبكات مياه وصرف صحي", description: "صندوق عداد فيبرجلاس (GRP) للعدادات أقل من 4 بوصة", unit: "عدد", quantity: 1, unitPrice: 127.50, total: 127.50 },
  { id: "NET-026", category: "شبكات مياه وصرف صحي", description: "شبكة مياه 63 مم", unit: "مقطوعة", quantity: 1, unitPrice: 187.50, total: 187.50 },
  { id: "NET-027", category: "شبكات مياه وصرف صحي", description: "شبكة مياه 100 مم", unit: "مقطوعة", quantity: 1, unitPrice: 300.00, total: 300.00 },
  { id: "NET-028", category: "شبكات مياه وصرف صحي", description: "شبكة مياه 150 مم", unit: "مقطوعة", quantity: 1, unitPrice: 337.50, total: 337.50 },
  { id: "NET-029", category: "شبكات مياه وصرف صحي", description: "شبكة مياه 200 مم", unit: "مقطوعة", quantity: 1, unitPrice: 352.50, total: 352.50 },
  { id: "NET-030", category: "شبكات مياه وصرف صحي", description: "شبكة مياه 300 مم", unit: "مقطوعة", quantity: 1, unitPrice: 525.00, total: 525.00 },
  { id: "NET-031", category: "شبكات مياه وصرف صحي", description: "شبكة مياه 100 مم (HDPE)", unit: "مقطوعة", quantity: 1, unitPrice: 337.50, total: 337.50 },
  { id: "NET-032", category: "شبكات مياه وصرف صحي", description: "شبكة مياه 150 مم (HDPE)", unit: "مقطوعة", quantity: 1, unitPrice: 375.00, total: 375.00 },
  { id: "NET-033", category: "شبكات مياه وصرف صحي", description: "شبكة مياه 200 مم (HDPE)", unit: "مقطوعة", quantity: 1, unitPrice: 412.50, total: 412.50 },
  { id: "NET-034", category: "شبكات مياه وصرف صحي", description: "شبكة مياه 300 مم (HDPE)", unit: "مقطوعة", quantity: 1, unitPrice: 562.50, total: 562.50 },
  { id: "NET-035", category: "شبكات مياه وصرف صحي", description: "صندوق عدادات يتسع لـ 6 عدادات", unit: "عدد", quantity: 1, unitPrice: 1350.00, total: 1350.00 },
  { id: "NET-036", category: "شبكات مياه وصرف صحي", description: "صندوق عدادات يتسع لـ 12 عداد", unit: "عدد", quantity: 1, unitPrice: 1650.00, total: 1650.00 },
  { id: "NET-037", category: "شبكات مياه وصرف صحي", description: "توصيلة صرف صحي 150 مم (UPVC)", unit: "قطعة", quantity: 1, unitPrice: 4125.00, total: 4125.00 },
  { id: "NET-038", category: "شبكات مياه وصرف صحي", description: "توصيلة صرف صحي 200 مم (UPVC)", unit: "قطعة", quantity: 1, unitPrice: 4500.00, total: 4500.00 },
  { id: "NET-039", category: "شبكات مياه وصرف صحي", description: "توصيلة صرف صحي 300 مم (UPVC)", unit: "قطعة", quantity: 1, unitPrice: 5250.00, total: 5250.00 },
  { id: "NET-040", category: "شبكات مياه وصرف صحي", description: "متر إضافي لتوصيلة صرف صحي 150 مم", unit: "م.ط", quantity: 1, unitPrice: 262.50, total: 262.50 },
  { id: "NET-041", category: "شبكات مياه وصرف صحي", description: "متر إضافي لتوصيلة صرف صحي 200 مم", unit: "م.ط", quantity: 1, unitPrice: 277.50, total: 277.50 },
  { id: "NET-042", category: "شبكات مياه وصرف صحي", description: "متر إضافي لتوصيلة صرف صحي 300 مم", unit: "م.ط", quantity: 1, unitPrice: 300.00, total: 300.00 },
  { id: "NET-043", category: "شبكات مياه وصرف صحي", description: "غرفة تفتيش (Clean Out) 150 مم (UPVC)", unit: "عدد", quantity: 1, unitPrice: 1200.00, total: 1200.00 },
  { id: "NET-044", category: "شبكات مياه وصرف صحي", description: "غرفة تفتيش (Clean Out) 200 مم (UPVC)", unit: "عدد", quantity: 1, unitPrice: 1275.00, total: 1275.00 },
  { id: "NET-045", category: "شبكات مياه وصرف صحي", description: "إزالة خزان صرف صحي", unit: "مقطوعة", quantity: 1, unitPrice: 375.00, total: 375.00 },
  { id: "NET-046", category: "شبكات مياه وصرف صحي", description: "إزالة توصيلة مياه قائمة", unit: "مقطوعة", quantity: 1, unitPrice: 375.00, total: 375.00 },
  { id: "NET-047", category: "شبكات مياه وصرف صحي", description: "إزالة توصيلة صرف صحي قائمة", unit: "مقطوعة", quantity: 1, unitPrice: 562.50, total: 562.50 },

  // --- مشاريع الرعاية الصحية (مستشفيات ومستوصفات) ---
  { id: "HOS-001", category: "مشاريع الرعاية الصحية", description: "نظام استدعاء الممرضات (لكل سرير)", unit: "نقطة", quantity: 1, unitPrice: 1800, total: 1800 },
  { id: "HOS-002", category: "مشاريع الرعاية الصحية", description: "تمديدات الغازات الطبية (مخرج أكسجين)", unit: "نقطة", quantity: 1, unitPrice: 2500, total: 2500 },
  { id: "HOS-003", category: "مشاريع الرعاية الصحية", description: "تمديدات الغازات الطبية (مخرج شفط)", unit: "نقطة", quantity: 1, unitPrice: 2300, total: 2300 },
  { id: "HOS-004", category: "مشاريع الرعاية الصحية", description: "تجاليد جدران معزولة بالرصاص (لغرف الأشعة)", unit: "م²", quantity: 1, unitPrice: 950, total: 950 },
  { id: "HOS-005", category: "مشاريع الرعاية الصحية", description: "أرضيات فينيل مضادة للبكتيريا", unit: "م²", quantity: 1, unitPrice: 220, total: 220 },
  { id: "HOS-006", category: "مشاريع الرعاية الصحية", description: "وحدة مناولة هواء (HVAC) مع فلاتر HEPA", unit: "عدد", quantity: 1, unitPrice: 45000, total: 45000 },
  { id: "HOS-007", category: "مشاريع الرعاية الصحية", description: "أبواب أوتوماتيكية لغرف العمليات", unit: "عدد", quantity: 1, unitPrice: 22000, total: 22000 },
  
  // --- مشاريع الضيافة والمطاعم ---
  { id: "KIT-001", category: "مشاريع الضيافة والمطاعم", description: "نظام شفط مركزي للمطابخ (Hood)", unit: "م.ط", quantity: 1, unitPrice: 3000, total: 3000 },
  { id: "KIT-002", category: "مشاريع الضيافة والمطاعم", description: "مصيدة شحوم وزيوت (Grease Trap)", unit: "عدد", quantity: 1, unitPrice: 7500, total: 7500 },
  { id: "KIT-003", category: "مشاريع الضيافة والمطاعم", description: "تجاليد جدران ستانلس ستيل للمطابخ", unit: "م²", quantity: 1, unitPrice: 450, total: 450 },
  { id: "KIT-004", category: "مشاريع الضيافة والمطاعم", description: "أرضيات Quarry Tile للمطابخ", unit: "م²", quantity: 1, unitPrice: 280, total: 280 },
  { id: "KIT-005", category: "مشاريع الضيافة والمطاعم", description: "بناء غرفة تبريد (Walk-in Cooler)", unit: "م²", quantity: 1, unitPrice: 2200, total: 2200 },
  { id: "HOT-001", category: "مشاريع الضيافة والمطاعم", description: "نظام مفاتيح الغرف الإلكترونية (للباب)", unit: "عدد", quantity: 1, unitPrice: 1500, total: 1500 },
  { id: "HOT-002", category: "مشاريع الضيافة والمطاعم", description: "تجهيز منطقة استقبال (Lobby) - أعمال ديكور", unit: "مقطوعة", quantity: 1, unitPrice: 150000, total: 150000 },
  
  // --- مشاريع تجارية متخصصة ---
  { id: "GAS-001", category: "مشاريع تجارية متخصصة", description: "تركيب خزان وقود أرضي (سعة 50,000 لتر)", unit: "عدد", quantity: 1, unitPrice: 120000, total: 120000 },
  { id: "GAS-002", category: "مشاريع تجارية متخصصة", description: "تركيب مضخة وقود إلكترونية مزدوجة", unit: "عدد", quantity: 1, unitPrice: 65000, total: 65000 },
  { id: "GAS-003", category: "مشاريع تجارية متخصصة", description: "تركيب مظلة محطة الوقود (Canopy)", unit: "م²", quantity: 1, unitPrice: 850, total: 850 },
  { id: "GYM-001", category: "مشاريع تجارية متخصصة", description: "أرضيات مطاطية ممتصة للصدمات (للصالات الرياضية)", unit: "م²", quantity: 1, unitPrice: 350, total: 350 },
  { id: "GYM-002", category: "مشاريع تجارية متخصصة", description: "توريد وتركيب ساونا جافة", unit: "عدد", quantity: 1, unitPrice: 35000, total: 35000 },
  { id: "GYM-003", category: "مشاريع تجارية متخصصة", description: "توريد وتركيب غرفة بخار", unit: "عدد", quantity: 1, unitPrice: 42000, total: 42000 },
  
  // --- تجهيزات الفعاليات ---
  { id: "EVT-001", category: "تجهيزات فنية وتقنية (فعاليات)", description: "تأجير شاشة LED (سعر للمتر المربع/لليوم)", unit: "م²/يوم", quantity: 1, unitPrice: 350, total: 350 },
  { id: "EVT-002", category: "تجهيزات فنية وتقنية (فعاليات)", description: "نظام صوتي متكامل (سماعات، مايكروفون، خلاط صوت) - (لليوم)", unit: "مقطوعة", quantity: 1, unitPrice: 5000, total: 5000 },
  { id: "EVT-003", category: "تجهيزات فنية وتقنية (فعاليات)", description: "تأجير وحدة إضاءة مسرحية (Moving Head) - (لليوم)", unit: "عدد/يوم", quantity: 1, unitPrice: 250, total: 250 },
  { id: "EVT-004", category: "ديكورات وتشطيبات مؤقتة (فعاليات)", description: "بناء وتجهيز جناح معرض (ستاند)", unit: "م²", quantity: 1, unitPrice: 800, total: 800 },
  { id: "EVT-005", category: "ديكورات وتشطيبات مؤقتة (فعاليات)", description: "بناء مسرح (Stage) خشبي", unit: "م²", quantity: 1, unitPrice: 220, total: 220 },
  { id: "EVT-006", category: "خدمات مساندة للفعاليات", description: "خدمات تنظيم وإدارة حشود (للساعة/للفرد)", unit: "ساعة/فرد", quantity: 1, unitPrice: 120, total: 120 },
  { id: "EVT-007", category: "خدمات مساندة للفعاليات", description: "تأجير أثاث للفعالية (كرسي، طاولة)", unit: "قطعة/يوم", quantity: 1, unitPrice: 50, total: 50 },
  { id: "EVT-008", category: "تجهيزات فنية وتقنية (فعاليات)", description: "تصوير وتغطية فيديو للفعالية", unit: "مقطوعة", quantity: 1, unitPrice: 8000, total: 8000 },
];


const boqItemSchema = z.object({
  id: z.string().min(1, "رقم البند مطلوب"),
  description: z.string().min(1, "الوصف مطلوب"),
  category: z.string().min(1, "الفئة مطلوبة"),
  unit: z.string().min(1, "الوحدة مطلوبة"),
  quantity: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "الكمية يجب أن تكون رقمًا موجبًا")
  ),
  unitPrice: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "سعر الوحدة يجب أن تكون رقمًا موجبًا")
  ),
});

type BoqItemForm = z.infer<typeof boqItemSchema>;

export default function BoqPage() {
  const [boqItems, setBoqItems] = useState(masterBoqItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const currentUser = useCurrentUser();


  const { control, handleSubmit, reset } = useForm<BoqItemForm>({
    resolver: zodResolver(boqItemSchema),
    defaultValues: {
      id: `EXT-${Math.floor(Math.random() * 900) + 100}`,
      description: "",
      category: "بنود إضافية",
      unit: "مقطوعة",
      quantity: 1,
      unitPrice: 0,
    },
  });

  const onSubmit: SubmitHandler<BoqItemForm> = (data) => {
    const newItem = {
      ...data,
      total: data.quantity * data.unitPrice,
    };
    setBoqItems((prevItems) => [...prevItems, newItem]);
    toast({
      title: "تمت الإضافة بنجاح",
      description: `تمت إضافة البند "${data.description}" إلى قاعدة البيانات.`,
    });
    setIsDialogOpen(false);
    reset({
        id: `EXT-${Math.floor(Math.random() * 900) + 100}`,
        description: "",
        category: "بنود إضافية",
        unit: "مقطوعة",
        quantity: 1,
        unitPrice: 0,
    });
  };

  const categories = [...new Set(boqItems.map(item => item.category))];
  
  const handleImportExport = () => {
    if (currentUser.isAdmin) {
       toast({
        title: "صلاحيات المسؤول مفعلة",
        description: "ميزة الاستيراد والتصدير متاحة لك.",
       });
       // In a real app, you would trigger the actual import/export functionality here.
    } else {
        toast({
        title: "ميزة احترافية",
        description: "استيراد وتصدير جداول الكميات متاح في الخطط المدفوعة.",
        });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">قاعدة بيانات بنود الأعمال (Master BOQ)</h1>
          <div className="flex gap-2">
              <Button variant="outline" className="gap-1" onClick={handleImportExport}>
                  <Upload className="h-4 w-4" />
                  استيراد
              </Button>
              <Button variant="outline" className="gap-1" onClick={handleImportExport}>
                  <Download className="h-4 w-4" />
                  تصدير
              </Button>
              <Button className="gap-1" onClick={() => setIsDialogOpen(true)}>
                  <PlusCircle className="h-4 w-4" />
                  إضافة بند قياسي
              </Button>
          </div>
        </div>

        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>قائمة البنود القياسية</CardTitle>
            <CardDescription>هذه هي قاعدة البيانات المركزية لبنود الأعمال وتكاليفها التقديرية. تستخدم هذه البيانات في تسعير المشاريع الجديدة.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">رقم البند</TableHead>
                  <TableHead>الوصف</TableHead>
                  <TableHead>الوحدة</TableHead>
                  <TableHead className="text-right">التكلفة التقديرية للوحدة (ر.س)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map(category => (
                  <React.Fragment key={category}>
                    <TableRow className="bg-secondary/50 hover:bg-secondary/70">
                      <TableCell colSpan={4} className="font-bold text-primary">{category}</TableCell>
                    </TableRow>
                    {boqItems.filter(item => item.category === category).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell className="text-right font-mono text-primary font-semibold">{item.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة بند قياسي جديد</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل البند الجديد ليتم إضافته إلى قاعدة البيانات الرئيسية.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-id" className="text-right">رقم البند</Label>
                <Controller name="id" control={control} render={({ field }) => <Input id="item-id" className="col-span-3" {...field} />} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-desc" className="text-right">الوصف</Label>
                <Controller name="description" control={control} render={({ field }) => <Input id="item-desc" placeholder="وصف تفصيلي للبند" className="col-span-3" {...field} />} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-category" className="text-right">الفئة</Label>
                <Controller name="category" control={control} render={({ field }) => <Input id="item-category" placeholder="فئة البند" className="col-span-3" {...field} />} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-unit" className="text-right">الوحدة</Label>
                <Controller name="unit" control={control} render={({ field }) => <Input id="item-unit" className="col-span-3" {...field} />} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-price" className="text-right">التكلفة التقديرية للوحدة</Label>
                <Controller name="unitPrice" control={control} render={({ field }) => <Input id="item-price" type="number" placeholder="0.00" className="col-span-3" {...field} />} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">حفظ البند</Button>
              <DialogClose asChild>
                  <Button type="button" variant="secondary">إلغاء</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

    

    