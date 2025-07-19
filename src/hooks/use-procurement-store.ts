
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Supplier {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  phone: string;
  email: string;
}

export interface PurchaseOrderItem {
    description: string;
    quantity: number;
    unitPrice: number;
}

export interface PurchaseOrder {
  id: string;
  supplier: string;
  date: string;
  status: 'بانتظار الموافقة' | 'قيد المعالجة' | 'تم التسليم' | 'ملغي';
  total: number;
  items: PurchaseOrderItem[];
  projectId: string;
  notes?: string;
}

export interface Quote {
    id: string;
    projectId: string;
    projectName: string;
    clientName: string;
    date: string;
    totalAmount: number;
    status: 'مسودة' | 'تم الإرسال' | 'مقبول' | 'مرفوض';
    markdownContent: string;
}

interface ProcurementState {
  suppliers: Supplier[];
  purchaseOrders: PurchaseOrder[];
  quotes: Quote[];
  addSupplier: (supplier: Supplier) => void;
  addPurchaseOrder: (po: PurchaseOrder) => void;
  addQuote: (quote: Quote) => void;
}

const initialSuppliers: Supplier[] = [
  { id: 1, name: "شركة مواد البناء الحديثة", specialty: "مواد بناء عامة", rating: 4.8, phone: "011-456-7890", email: "sales@modernb.com" },
  { id: 2, name: "مصنع الخرسانة الجاهزة", specialty: "خرسانة وحديد", rating: 4.5, phone: "012-654-3210", email: "info@readymix.sa" },
  { id: 3, name: "تكنو للأدوات الكهربائية", specialty: "كهرباء وإضاءة", rating: 4.2, phone: "013-789-0123", email: "contact@techno-electric.com" },
  { id: 4, name: "مورد مواد السباكة", specialty: "سباكة وصرف صحي", rating: 4.6, phone: "055-123-4567", email: "plumbing.supplies@email.com" },
];

const initialPOs: PurchaseOrder[] = [
  { id: "PO-2024-001", supplier: "شركة مواد البناء الحديثة", date: "2024-07-15", status: "تم التسليم", total: 15450, items: [], projectId: "proj_villa_1" },
  { id: "PO-2024-002", supplier: "مصنع الخرسانة الجاهزة", date: "2024-07-18", status: "قيد المعالجة", total: 88000, items: [], projectId: "proj_tower_3" },
];


export const useProcurementStore = create<ProcurementState>()(
  persist(
    (set) => ({
      suppliers: initialSuppliers,
      purchaseOrders: initialPOs,
      quotes: [],
      addSupplier: (supplier) => {
        set((state) => ({
          suppliers: [...state.suppliers, supplier],
        }));
      },
      addPurchaseOrder: (po) => {
        set((state) => ({
          purchaseOrders: [po, ...state.purchaseOrders],
        }));
      },
      addQuote: (quote) => {
        set((state) => ({
            quotes: [quote, ...state.quotes],
        }))
      }
    }),
    {
      name: 'procurement-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
