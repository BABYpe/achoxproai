
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
      transactions: {},
      addTransaction: (projectId, transaction) => {
        const currentTransactions = get().transactions[projectId] || [];
        set({
          transactions: {
            ...get().transactions,
            [projectId]: [...currentTransactions, transaction],
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
