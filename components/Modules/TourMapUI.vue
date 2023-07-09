<template>
  <div>
    <div id="control-panel">
      <div v-for="(cityData, index) in cityDataList" :key="index">
        Animating Year: {{ currentYear }}
        <p>{{ cityData.city }}: {{ cityData.coordinates }}</p>
        <button @click="handleClick(cityData.coordinates)">
          Go to this location
        </button>
      </div>
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

const emit = defineEmits(['go-to-coordinate'])

const handleClick = (coord) => {
  emit('go-to-coordinate', coord)
}
</script>

<style scoped>
#control-panel {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1em;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
  width: 20rem;
  max-height: 100vh;
  overflow: scroll;
}
</style>
