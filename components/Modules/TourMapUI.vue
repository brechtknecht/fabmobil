<template>
  <div
    class="absolute bg-secondary top-0 right-0 p-4 bg-opacity-80 z-10 w-80 h-full overflow-auto"
  >
    <div
      v-for="(cityData, index) in props.cityDataList"
      :key="index"
      class="mb-6"
    >
      <h2 class="text-lg font-semibold text-white mb-1">
        {{ cityData.location.city }}
      </h2>
      <p class="text-white">
        {{ cityData.date }}
        <!-- {{ cityData.location.lon }},
        {{ cityData.location.lat }} -->
      </p>
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

const props = defineProps({
  cityDataList: {
    type: Array,
    default: () => [],
  },
  animationYear: {
    type: Number,
    default: 0,
  },
})

const currentYear = ref(null)
watch(
  () => props.animationYear,
  (newYear) => {
    currentYear.value = newYear
  }
)

const emit = defineEmits(['go-to-coordinate', 'reset-zoom'])

const handleClick = (cityData) => {
  emit(
    'go-to-coordinate',
    [cityData.location.lon, cityData.location.lat],
    cityData
  )
}

const handleResetZoom = () => {
  emit('reset-zoom')
}
</script>

<style scoped></style>
