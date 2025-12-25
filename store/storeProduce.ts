import { Product } from "@/lib/models/product";
import { create } from "zustand";


interface ProductState {
    loading: boolean
    productDetails: Product | null
    setLoading: (loading: boolean) => void
    setProductDetails: (details: Product | null) => void
}


const storeProduct = create<ProductState>((set, get) => ({
    productDetails: null,
    loading: false,

    setLoading: (value: boolean) => set({ loading: value }),

    setProductDetails: (value) => set({ productDetails: value }),



}));

export default storeProduct;
