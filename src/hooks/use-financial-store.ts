import { create } from 'zustand';
import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Transaction {
    id?: string;
    projectId: string;
    description: string;
    amount: number;
    category: string;
    date: string; // ISO string
}

interface FinancialState {
    transactions: { [projectId: string]: Transaction[] };
    isLoading: boolean;
    fetchTransactions: (projectId: string) => Promise<void>;
    addTransaction: (projectId: string, transaction: Omit<Transaction, 'id' | 'projectId'>) => Promise<void>;
}

export const useFinancialStore = create<FinancialState>((set, get) => ({
    transactions: {},
    isLoading: false,

    fetchTransactions: async (projectId: string) => {
        // Avoid refetching if already loaded
        if (get().transactions[projectId]) return;

        set({ isLoading: true });
        try {
            const q = query(collection(db, "transactions"), where("projectId", "==", projectId));
            const querySnapshot = await getDocs(q);
            const projectTransactions = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: (doc.data().date as Timestamp).toDate().toISOString(),
            } as Transaction));

            set(state => ({
                transactions: {
                    ...state.transactions,
                    [projectId]: projectTransactions
                },
                isLoading: false,
            }));
        } catch (error) {
            console.error("Error fetching transactions: ", error);
            set({ isLoading: false });
        }
    },

    addTransaction: async (projectId: string, transaction) => {
        try {
            const docRef = await addDoc(collection(db, "transactions"), {
                ...transaction,
                projectId,
                date: Timestamp.fromDate(new Date(transaction.date))
            });

            const newTransaction: Transaction = {
                id: docRef.id,
                projectId,
                ...transaction,
            };

            set(state => ({
                transactions: {
                    ...state.transactions,
                    [projectId]: [...(state.transactions[projectId] || []), newTransaction]
                }
            }));
        } catch (error) {
            console.error("Error adding transaction: ", error);
            throw error;
        }
    }
}));
