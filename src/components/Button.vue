<script lang="ts" setup>
defineProps<{ msg?: string }>()
</script>

<template>
    <button class="border-[1px] border-dashed px-4 py text-2xl cursor-pointer hover:bg-gray-300 transition-all duration-150">{{ msg }}</button>
</template>