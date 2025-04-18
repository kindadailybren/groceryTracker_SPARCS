<script setup lang="ts">
console.log("diri ang mga forms dawg!")
import { ref } from 'vue'
import { updateProduct, deleteProduct } from '../utils/actions.ts'
import Button from './Button.vue'
import Trash from './Trash.vue'


const props = defineProps({
  id: { type: String, required: false },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

// Mao ni akong ihatag sa update na function, para dynamic update pud
const nameRef = ref(props.name)
const quantityRef = ref(props.quantity)
const priceRef = ref(props.price)

const update = async () => {
  await updateProduct(props.id, nameRef.value, quantityRef.value, priceRef.value);
};

const deleteProd = async () => {
  await deleteProduct(props.id);
};

const decrement = () => {
  if (quantityRef.value > 0) {
    quantityRef.value--
  }
}

const isEditing = ref(false)
</script>


<template>
  <section>
    <div>


      <!-- task -->
      <div class="flex flex-col gap-4">
        <div class="flex justify-between text-2xl xl:text-3xl items-center">
          <p>{{ nameRef }}</p>

          <div class="flex gap-10">
            <div class="flex gap-2 xl:gap-4">
              <p>&#x20B1 {{ priceRef }}</p>
              <p>x</p>
              <p>{{ quantityRef }}</p>

            </div>

            <div>
              <button class="hover:cursor-pointer" @click="isEditing = !isEditing">
                Edit
              </button>
            </div>
          </div>
        </div>

        <!-- edit state -->

        <div v-if="isEditing" class="flex flex-col gap-2">
          <div class="flex items-center justify-between text-2xl gap-4">
            <input v-model="nameRef" type="text" :placeholder="name" class="w-full border-b border-dashed px-4" />
            <div class="flex items-center justify-center gap-1">
              <Button @click="decrement" msg="-" />
              <Button @click="quantityRef++" msg="+" class="hover:bg-green-400" />
              <button @click="deleteProd"
                class="border-[1px] border-dashed px-4 py-1 text-2xl cursor-pointer hover:bg-red-400 transition-all duration-150">
                <Trash class="w-6 h-6" />

              </button>
            </div>
          </div>

          <Button @click="update" msg="Save" class="hover:bg-green-400" />
        </div>

      </div>

    </div>
  </section>

</template>
