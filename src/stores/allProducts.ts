import { defineStore } from "pinia";
import { supabase } from "../supabase/supabaseClient";

type Product = {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export const useAllProductsStore = defineStore("allProducts", {
    state: () => ({
        loading: false,
        products: [] as Product[],
    }),
    actions: {
        async fetchProducts() {
            this.loading = true
            const {data, error} = await supabase.from('product').select('*');
            if (error) {
                console.error('Error fetching products:', error);
                this.loading = false;
                return;
            } else {
                this.products = data as Product[];
                this.loading = false;
            }
        }
    }
})