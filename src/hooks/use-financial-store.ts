
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string; // ISO string format
}

interface FinancialState {
  transactions: Record<string, Transaction[]>; // projectId -> transactions array
  addTransaction: (projectId: string, transaction: Transaction) => void;
  // In a real app, you would add methods for updating and deleting transactions
}

export const useFinancialStore = create<FinancialState>()(
  persist(
    (set, get) => ({
      transactions: {
        "proj_villa_1": [
            { id: "txn1", description: "شراء أسمنت وحديد تسليح", amount: 150000, category: "مواد بناء", date: "2024-06-01T10:00:00Z" },
            { id: "txn2", description: "دفعة أولى لأجور العمال", amount: 75000, category: "أجور عمال", date: "2024-06-15T10:00:00Z" },
            { id: "txn3", description: "إيجار مضخة الخرسانة", amount: 12000, category: "معدات", date: "2024-06-20T10:00:00Z" },
            { id: "txn4", description: "رسوم استخراج رخصة البناء", amount: 25000, category: "رسوم وتصاريح", date: "2024-05-25T10:00:00Z" }
        ]
      },
      addTransaction: (projectId, transaction) => {
        const currentTransactions = get().transactions[projectId] || [];
        const updatedTransactions = [...currentTransactions, transaction].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        set({
          transactions: {
            ...get().transactions,
            [projectId]: updatedTransactions,
          },
        });
      },
    }),
    {
      name: 'financial-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
