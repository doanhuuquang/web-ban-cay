import { User } from "@/lib/models/user";
import { create } from "zustand";


interface AccountState {
    loading: boolean
    AccountAll: User[] | null
    setLoading: (loading: boolean) => void
    setAllAccount: (details: User[] | null) => void
    setAccount: (details: User | null) => void
    addAccount: (account: User) => void;
    updateAccount: (account: User) => void;
    removeAccount: (accountId: string) => void;
    updateStateLockAccount: (orderId: string, status: boolean) => void
}


const storeAccount = create<AccountState>((set) => ({
    AccountAll: null,
    loading: false,

    setLoading: (value: boolean) => set({ loading: value }),

    setAllAccount: (value) => set({ AccountAll: value }),

    setAccount: (value) => {
        const arr: User[] = [];
        if (value) arr.push(value);
        set({ AccountAll: arr })
    },

    addAccount: (account) => set((state) => ({
        AccountAll: state.AccountAll
            ? [...state.AccountAll, account]
            : [account],
    })),

    updateAccount: (account) => set((state) => ({
        AccountAll: state.AccountAll
            ? state.AccountAll.map((c) => c.id === account.id
                ? { ...c, ...account } : c)
            : [account],
    })),

    removeAccount: (accountId) => set((state) => ({
        AccountAll: state.AccountAll
            ? state.AccountAll.filter((c) => c.id !== accountId) : null,
    })),

    updateStateLockAccount: (orderId: string, status: boolean) =>
        set((state) => ({
            ...state,
            AccountAll: state.AccountAll
                ? state.AccountAll.map((c) =>
                    c.id === orderId
                        ? { ...c, enabled: !status }
                        : c
                )
                : null,
        })),

}));

export default storeAccount;
