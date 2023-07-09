<template>
  <div
    class="absolute top-0 right-0 p-4 bg-secondary bg-opacity-80 z-10 w-80 h-full w-full overflow-auto"
  >
    <button
      class="mb-6 w-full text-white bg-indigo-500 hover:bg-indigo-600 rounded py-2"
      @click="$emit('go-back')"
    >
      Back
    </button>
    <h1>{{ detail.city }}</h1>
    <p>{{ detail.date }}</p>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  detail: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['go-back'])
</script>

<style scoped>
/* Your styles here */
</style>
