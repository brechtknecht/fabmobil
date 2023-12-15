<template>
  <div class="flex flex-row gap-4">
    <a :href="props.block.content.link" target="_blank" :class="buttonClasses">
      <div :class="buttonSizeClasses">
        {{ props.block.content.text }}
        <img
          v-if="isLargeButton"
          :src="buttonImageSrc"
          class="w-20 pb-4 mt-24"
        />
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { KirbyBlock } from '#nuxt-kql'

const props = defineProps<{
  block: KirbyBlock<'button'>
}>()

const isLargeButton = computed(() => props.block.content.size === 'large')
const isDarkMode = computed(() => props.block.content.dark === 'true')

const buttonClasses = computed(() => ({
  'text-decoration-none': true,
  // Add any common button styles here
}))

const buttonSizeClasses = computed(() => ({
  'border-2 rounded-lg px-3 py-2 cursor-pointer w-full': !isLargeButton.value,
  'button transform rounded-md h-fit flex items-start justify-items-start flex-col md:flex-row w-64 py-1.5 px-4 cursor-pointer':
    isLargeButton.value,
  'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-gray-200':
    !isDarkMode.value && !isLargeButton.value,
  'border-white text-white hover:bg-gray-200 hover:text-gray-800':
    isDarkMode.value && !isLargeButton.value,
  'bg-black text-white': isDarkMode.value && isLargeButton.value,
  'bg-white text-black': !isDarkMode.value && isLargeButton.value,
}))

const buttonImageSrc = computed(() => {
  return isDarkMode.value
    ? '/assets/img/components/arrow-right.svg'
    : '/assets/img/components/arrow-right-dark.svg'
})
</script>

<style scoped>
a {
  text-decoration: none;
}

@media (min-width: 768px) {
  .button {
    transform: rotate(-30deg) skewX(-30deg) scale(0.864);
    transition: 200ms ease-out;
  }

  .button:hover {
    transform: rotate(0) skewX(0) scale(1);
  }
}
</style>
