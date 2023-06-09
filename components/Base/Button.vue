<template>
  <div
    class="button transform border-2 h-fit flexitems-start justify-items-start flex-col w-64 py-1.5 px-4"
  >
    <span class="text-paragraph text-primary text-large-title">{{
      label
    }}</span>
    <img class="w-20 pb-4 mt-24" src="/assets/img/components/arrow-right.svg" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  label: String,
})
</script>

<style>
.button {
  transform: rotate(-30deg) skewX(-30deg) scale(0.864);
  transition: 200ms ease-out;
}

.button:hover {
  transform: rotate(0) skewX(0) scale(1);
}
</style>
