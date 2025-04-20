<script lang="ts" setup>
import { ref } from 'vue';
import { useSound } from '@vueuse/sound';
import bgMusic from '../assets/sound/bg-music-grocery-store.mp3'
import reyValera from '../assets/sound/naaalala-ka-rey-valera.mp3'

const isPlaying = ref(true);
const isPlaying2 = ref(true);
const { play, stop } = useSound(bgMusic, {
    volume: 0.5,
    loop: true,
    autoplay: true,
})

const { play: play2, pause } = useSound(reyValera, {
    volume: 0.2,
    loop: true,
    autoplay: true,
})
</script>

<template>
    <div class="flex gap-10">
        <div>
            <button v-if="isPlaying" @click="() => { play(); isPlaying = false; }"
                class="bg-green-400 px-8 py-2 hover:bg-green-500 cursor-pointer">PLAY</button>
            <button v-else @click="() => { stop(); isPlaying = true; }"
                class="bg-red-400 px-8 py-2 hover:bg-red-500 cursor-pointer">STOP</button>
        </div>
        <div>
            <button v-if="isPlaying2" @click="() => { play2(); isPlaying2 = false; }"
                class="bg-yellow-400 px-8 py-2 hover:bg-orange-500 cursor-pointer">PLAY</button>
            <div v-else class="flex flex-col justify-center">
                <button @click="() => { pause(); isPlaying2 = true; }"
                    class="bg-red-400 px-8 py-2 hover:bg-red-500 cursor-pointer">PAUSE</button>
                <div class="flex-col text-center text-white hidden xl:flex">
                    <p class="text-2xl">Playing Naaalala Ka</p>
                    <p>by</p>
                    <p class="text-2xl">Rey Valera</p>
                </div>
            </div>
        </div>
    </div>
</template>