import { defineStore } from "pinia";
import { supabase } from "../supabase/supabaseClient";

type Product = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export const useAllProductsStore = defineStore("allProducts", {
  state: () => ({
    loading: false,
    products: [] as Product[],
    subscribed: false,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      const { data, error } = await supabase.from("product").select("*");
      if (error) {
        console.error("Error fetching products:", error);
        this.loading = false;
        return;
      }
      this.products = data as Product[];
      this.loading = false;
    },

    subscribeToProductChanges() {
      if (this.subscribed) return;

      const channel = supabase.channel("product-changes");

      channel
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "product" },
          (payload) => {
            console.log("Realtime payload received:", payload);
            const { eventType, new: newItem, old: oldItem } = payload;

            switch (eventType) {
              case "INSERT":
                this.products.push(newItem as Product);
                break;
              case "UPDATE":
                this.products = this.products.map((p) =>
                  p.id === newItem.id ? (newItem as Product) : p
                );
                break;
              case "DELETE":
                this.products = this.products.filter(
                  (p) => p.id !== oldItem.id
                );
                break;
            }
          }
        )
        .subscribe((status) => {
          console.log("Subscription status:", status);
        });

      this.subscribed = true;
    },
  },
});
