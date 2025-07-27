import { create } from 'zustand';
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Interfaces
export interface Supplier {
  id?: string;
  name: string;
  specialty: string;
  rating: number;
  phone: string;
  email: string;
}

export interface PurchaseOrder {
  id?: string;
  supplier: string;
  date: string;
  status: 'تم التسليم' | 'قيد المعالجة' | 'بانتظار الموافقة' | 'ملغي';
  total: number;
  items: any[];
  projectId: string;
  notes?: string;
}

export interface Quote {
    id?: string;
    projectId: string;
    projectName: string;
    clientName: string;
    date: string; // YYYY-MM-DD
    totalAmount: number;
    status: 'مسودة' | 'تم الإرسال' | 'مقبول' | 'مرفوض';
    markdownContent: string;
}


interface ProcurementState {
  suppliers: Supplier[];
  purchaseOrders: PurchaseOrder[];
  quotes: Quote[];
  isLoading: boolean;
  fetchSuppliers: () => Promise<void>;
  addSupplier: (supplier: Omit<Supplier, 'id'>) => Promise<void>;
  fetchPurchaseOrders: () => Promise<void>;
  addPurchaseOrder: (po: Omit<PurchaseOrder, 'id'>) => Promise<void>;
  fetchQuotes: () => Promise<void>;
  addQuote: (quote: Omit<Quote, 'id'>) => Promise<void>;
}

const initialSuppliers = [
  { name: "شركة مواد البناء الحديثة", specialty: "مواد بناء عامة", rating: 4.8, phone: "011-456-7890", email: "sales@modernb.com" },
  { name: "مصنع الخرسانة الجاهزة", specialty: "خرسانة وحديد", rating: 4.5, phone: "012-654-3210", email: "info@readymix.sa" },
  { name: "تكنو للأدوات الكهربائية", specialty: "كهرباء وإضاءة", rating: 4.2, phone: "013-789-0123", email: "contact@techno-electric.com" },
  { name: "مورد مواد السباكة", specialty: "سباكة وصرف صحي", rating: 4.6, phone: "055-123-4567", email: "plumbing.supplies@email.com" },
];


export const useProcurementStore = create<ProcurementState>((set, get) => ({
  suppliers: [],
  purchaseOrders: [],
  quotes: [],
  isLoading: false,

  fetchSuppliers: async () => {
    if (get().suppliers.length > 0) return; // Avoid refetching
    set({ isLoading: true });
    try {
        const suppliersCollection = collection(db, "suppliers");
        const querySnapshot = await getDocs(suppliersCollection);
        if (querySnapshot.empty) {
            // Seed initial data if collection is empty
            const seedingPromises = initialSuppliers.map(s => addDoc(suppliersCollection, s));
            await Promise.all(seedingPromises);
            const newSnapshot = await getDocs(suppliersCollection);
            const suppliersList = newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Supplier));
            set({ suppliers: suppliersList, isLoading: false });
        } else {
            const suppliersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Supplier));
            set({ suppliers: suppliersList, isLoading: false });
        }
    } catch (error) {
      console.error("Error fetching suppliers: ", error);
      set({ isLoading: false });
    }
  },

  addSupplier: async (supplier) => {
    try {
      const docRef = await addDoc(collection(db, 'suppliers'), supplier);
      set(state => ({
        suppliers: [...state.suppliers, { id: docRef.id, ...supplier }]
      }));
    } catch (error) {
      console.error("Error adding supplier: ", error);
    }
  },

  fetchPurchaseOrders: async () => {
     if (get().purchaseOrders.length > 0) return;
     set({ isLoading: true });
     try {
         const poCollection = collection(db, "purchaseOrders");
         const q = query(poCollection, orderBy("date", "desc"));
         const querySnapshot = await getDocs(q);
         const poList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PurchaseOrder));
         set({ purchaseOrders: poList, isLoading: false });

     } catch (error) {
         console.error("Error fetching POs: ", error);
         set({ isLoading: false });
     }
  },

  addPurchaseOrder: async (po) => {
    try {
        const docRef = await addDoc(collection(db, 'purchaseOrders'), po);
        set(state => ({
            purchaseOrders: [{ id: docRef.id, ...po }, ...state.purchaseOrders]
        }));
    } catch (error) {
        console.error("Error adding PO: ", error);
    }
  },

  fetchQuotes: async () => {
      if (get().quotes.length > 0) return;
      set({ isLoading: true });
      try {
        const quotesCollection = collection(db, "quotes");
        const q = query(quotesCollection, orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const quotesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Quote));
        set({ quotes: quotesList, isLoading: false });
      } catch (error) {
        console.error("Error fetching quotes: ", error);
        set({ isLoading: false });
      }
  },

  addQuote: async (quote) => {
    try {
        const docRef = await addDoc(collection(db, 'quotes'), quote);
         set(state => ({
            quotes: [{ id: docRef.id, ...quote }, ...state.quotes]
        }));
    } catch (error) {
        console.error("Error adding quote: ", error);
    }
  },

}));
