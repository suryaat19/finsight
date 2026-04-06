import { create } from 'zustand';

export type TransactionType = 'INCOME' | 'EXPENSE';
export type WalletType = 'CARD' | 'UPI' | 'CASH';

export interface Wallet {
  id: string;
  name: string;
  type: WalletType;
  balance: number;
  accountNumber?: string;
  colorFrom: string;
  colorTo: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  name: string;
  method: string;
  category: string;
  type: TransactionType;
  walletId: string;
}

interface FinanceState {
  wallets: Wallet[];
  transactions: Transaction[];
  goals: Goal[];

  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addWallet: (wallet: Omit<Wallet, 'id'>) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  addMoneyToGoal: (goalId: string, amount: number) => void;

  getTotalIncome: () => number;
  getTotalExpense: () => number;
  getBalance: () => number;
}

const initialWallets: Wallet[] = [
  { id: "w1", name: "Main Cash", type: "CASH", balance: 0, colorFrom: "from-emerald-400", colorTo: "to-emerald-600" },
];

const initialTransactions: Transaction[] = [];
const initialGoals: Goal[] = [];

export const useFinanceStore = create<FinanceState>((set, get) => ({
  wallets: initialWallets,
  transactions: initialTransactions,
  goals: initialGoals,

  addTransaction: (transaction) => set((state) => {
    const updatedWallets = state.wallets.map(wallet => {
      if (wallet.id === transaction.walletId) {
        const newBalance = transaction.type === 'INCOME'
          ? wallet.balance + transaction.amount
          : wallet.balance - transaction.amount;
        return { ...wallet, balance: newBalance };
      }
      return wallet;
    });
    return { wallets: updatedWallets, transactions: [{ ...transaction, id: Date.now().toString() }, ...state.transactions] };
  }),

  addWallet: (wallet) => set((state) => ({
    wallets: [...state.wallets, { ...wallet, id: `w-${Date.now()}` }]
  })),

  addGoal: (goal) => set((state) => ({
    goals: [...state.goals, { ...goal, id: `g-${Date.now()}` }]
  })),

  addMoneyToGoal: (goalId, amount) => set((state) => ({
    goals: state.goals.map(g => g.id === goalId ? { ...g, currentAmount: g.currentAmount + amount } : g)
  })),

  getTotalIncome: () => get().transactions.filter(t => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0),
  getTotalExpense: () => get().transactions.filter(t => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0),
  getBalance: () => get().wallets.reduce((sum, w) => sum + w.balance, 0)
}));