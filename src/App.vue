<script setup lang="ts">
import Forms from './components/Forms.vue';
import { useAllProductsStore } from './stores/allProducts';
import { onMounted, ref, watch, nextTick } from 'vue';
import Button from './components/Button.vue';
import { addItem } from './utils/actions';
import MusicPlayer from './components/MusicPlayer.vue';

const products = useAllProductsStore();

const loading = ref(true);
const product_name = ref("");
const price = ref(0);
const quantity = ref(1)
const scrollContainer = ref<HTMLElement | null>(null);

// mag watch siya if naay bago na item na ma add, then mag scroll to that item
watch(
  () => products.products.length,
  async () => {
    await nextTick();
    if (scrollContainer.value) {
      scrollContainer.value.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
);

const add = async () => {
  if(product_name.value === "") {
    alert("Enter Product Name")
    return;
  } else if (price.value <= 0){
    alert("Enter Valid Price")
    return;
  } else if (quantity.value <= 0){
    alert("Enter Valid Quantity")
    return;
  }
  await addItem(product_name.value, price.value, quantity.value);
  product_name.value = "";
  price.value = 0;
  quantity.value = 0;
};


onMounted(async () => {
  await products.fetchProducts();
  products.subscribeToProductChanges();
  await delay(200);
  loading.value = false;
})

// delay for loading state ni shea
const delay = (ms: number) => new Promise(resolve => {
  setTimeout(() => {
    resolve(true);
  }, ms);
});


</script>

<template>
  <main class="h-screen flex items-center justify-center w-full md:w-[60%] md:mx-auto xl:w-[40%]">

    <MusicPlayer class="absolute top-0 left-[25%] md:left-[5%] md:top-[5%]" />

    <!-- RECEIPT CARD -->
    <div
      class="grid h-[90%] bg-white w-[90%] text-center p-4  bg-[url('./assets/paper-texture.jpg')] bg-cover bg-no-repeat bg-center border-y-4 border-dashed border-gray-700 card-shadow">

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
      <div ref="scrollContainer" class="h-[400px] overflow-y-scroll">
        <div v-if="loading">
          <p class="text-2xl">Loading groceries. Mag wait ka dawg!</p>
        </div>
        <div v-else>
          <Forms v-for="product in products.sortedProducts" :name="product.name" :price="product.price"
            :quantity="product.quantity" :id="product.id" :key="product.id" />
        </div>
      </div>

      <!-- BOTTOM (FOOTER?) -->
      <div class="flex flex-col gap-2">
        <div class="flex gap-4">
          <input type="text" placeholder="Input an item"
            class="md:text-2xl w-full border-y-2 focus:outline-none md:px-4" v-model="product_name" @keyup.enter="add">
          <div class="flex gap-2">
            <input type="number" placeholder="Price" class="md:text-2xl w-full border-y-2 focus:outline-none md:px-4"
              v-model="price" @keyup.enter="add">
            <input type="number" placeholder="Qty" class="md:text-2xl w-full border-y-2 focus:outline-none md:px-4"
              v-model="quantity" @keyup.enter="add">
          </div>
          <Button msg="Add" class="hover:bg-green-400" @click="add" />
        </div>
        <div class="flex justify-between border-y border-dotted text-4xl">
          <p>TOTAL</p>
          <p>&#x20B1 {{ products.totalPrice.toFixed(2) }}</p>
        </div>
        <div class="flex justify-between md:text-xl">
          <p>18/04/2025</p>
          <p>SPARCS APPLICATION</p>
        </div>
        <div class="md:w-[70%] mx-auto">
          <p class="text-1xl md:text-4xl">Thank You For Supporting Local Business!</p>
        </div>
      </div>
    </div>
  </main>
</template>
