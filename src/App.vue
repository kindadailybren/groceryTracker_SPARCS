<script setup lang="ts">
import Forms from './components/Forms.vue';
import { useItemStore } from './stores/item';
import { useAllProductsStore } from './stores/allProducts';
import { onMounted, ref } from 'vue';

const store = useItemStore();
store.addItem({
  id: Date.now(),
  name: 'Marlboro Pula',
  quantity: 5,
  price: 100,
});

const products = useAllProductsStore();
const loading = ref(true);

onMounted(async () => {
  await products.fetchProducts();
  await delay(200);
  loading.value = false;
})

const delay = (ms: number) => new Promise(resolve => {
  setTimeout(() => {
    resolve(true);
  }, ms);
});

// <Forms v-for="item in store.items" :key="item.id" :item="item" />

</script>

<template>
  <main class="h-screen flex items-center justify-center w-full md:w-[60%] md:mx-auto xl:w-[40%]">

    <!-- RECEIPT CARD -->
    <div
      class="grid h-[85%] bg-white w-[90%] text-center p-4  bg-[url('./assets/paper-texture.jpg')] bg-cover bg-no-repeat bg-center border-y-4 border-dashed border-gray-700 card-shadow overflow-y-scroll">

      <!-- HEADING -->
      <div class="flex flex-col">
        <h1 class="text-2xl md:text-4xl">GROCERY TRACKER</h1>
        <p class="md:text-xl">This is a project we made for phase 2 of the SPARCS application proccess.</p>
        <div class="flex justify-between border-b border-dotted">
          <p>kindadailybren</p>
          <p>ejminguez</p>
        </div>
      </div>

      <!-- FORM -->
      <div class="h-[400px]">
        <div v-if="loading">
          <p class="text-2xl">Loading groceries. Mag wait ka dawg!</p>
        </div>
        <div v-else>
          <Forms v-for="product in products.products" :name="product.name" :price="product.price" :quantity="product.quantity" :key="product.id" />
        </div>
      </div>

      <!-- BOTTOM (FOOTER?) -->
      <div>
        <div class="flex justify-between border-y border-dotted text-4xl">
          <p>TOTAL</p>
          <p>&#x20B1 100</p>
        </div>
        <div class="flex justify-between md:text-xl">
          <p>18/04/2025</p>
          <p>SPARCS APPLICATION</p>
        </div>
        <div class="md:w-[70%] mx-auto">
          <p class="text-2xl md:text-4xl">Thank You For Supporting Local Business!</p>
        </div>
      </div>
    </div>
  </main>
</template>
