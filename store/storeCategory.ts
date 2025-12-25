import { Category } from "@/lib/models/category";
import { create } from "zustand";


interface CategoryState {
    loading: boolean
    categoryAll: Category[] | null
    setLoading: (loading: boolean) => void
    setAllCategory: (details: Category[] | null) => void
    setCategory: (details: Category | null) => void
    addCategory: (category: Category) => void;
    updateCategory: (category: Category) => void;
    removeCategory: (categoryId: string) => void;
}


const storeCategory = create<CategoryState>((set) => ({
    categoryAll: null,
    loading: false,

    setLoading: (value: boolean) => set({ loading: value }),

    setAllCategory: (value) => set({ categoryAll: value }),

    setCategory: (value) => {
        const arr: Category[] = [];
        if (value) arr.push(value);
        set({ categoryAll: arr })
    },

    addCategory: (category) => set((state) => ({
        categoryAll: state.categoryAll
            ? [...state.categoryAll, category]
            : [category],
    })),

    updateCategory: (category) => set((state) => ({
        categoryAll: state.categoryAll
            ? state.categoryAll.map((c) => c.categoryId === category.categoryId
                ? { ...c, ...category } : c)
            : [category],
    })),

    removeCategory: (categoryId) => set((state) => ({
        categoryAll: state.categoryAll
            ? state.categoryAll.filter((c) => c.categoryId !== categoryId) : null,
    })),

}));

export default storeCategory;
