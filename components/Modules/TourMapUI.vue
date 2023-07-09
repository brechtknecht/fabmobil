<template>
  <div
    class="absolute bg-secondary top-0 right-0 p-4 bg-opacity-80 z-10 w-80 h-screen overflow-auto"
  >
    <div v-for="(cityData, index) in cityDataList" :key="index" class="mb-6">
      <h2 class="text-lg font-semibold text-white mb-1">
        Animating Year: {{ currentYear }}
      </h2>
      <p class="text-white">{{ cityData.city }}: {{ cityData.coordinates }}</p>
      <button
        class="mt-2 w-full text-white bg-indigo-500 hover:bg-indigo-600 rounded py-2"
        @click="handleClick(cityData)"
      >
        Go to this location
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, watch } from 'vue'

const props = defineProps(['animationYear'])
const currentYear = ref(null)

const data = [
  {
    city: 'Dresden',
    coordinates: [13.73, 51.05],
    date: new Date(),
  },
  {
    city: 'Chemnitz',
    coordinates: [12.92, 50.83],
    date: new Date(),
  },
]

watch(
  () => props.animationYear,
  (newYear) => {
    currentYear.value = newYear
  }
)

const cityDataList = ref(data)

const emit = defineEmits(['go-to-coordinate', 'reset-zoom'])

const handleClick = (cityData) => {
  emit('go-to-coordinate', cityData.coordinates, cityData)
}

const handleResetZoom = () => {
  emit('reset-zoom')
}
</script>

<style scoped></style>
