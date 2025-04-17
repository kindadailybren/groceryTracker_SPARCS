import { defineStore } from "pinia";

type Item = {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export const useItemStore = defineStore("item", {
  state: () => ({ items: {} as Record<number, Item> }),
  getters: {
    getItems: (state) => {
      return state.items;
    },
  },

  actions: {
    addItem(item: Item) {
      this.items[item.id] = item;
    },
    removeItem(id: number) {
      delete this.items[id];
    },
  },
})
