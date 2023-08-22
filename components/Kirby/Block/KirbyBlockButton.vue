<template>
  <div class="flex flex-row gap-4">
    <a
      v-for="button in props.block.content.buttons"
      :key="button.text"
      :href="button.link"
      target="_blank"
    >
      <div
        class="border-2 border-gray-800 rounded-lg px-3 py-2 text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-gray-200 w-full"
      >
        {{ button.text }}
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { KirbyBlock } from '#nuxt-kql'

const props = defineProps<{
  block: KirbyBlock<'video'>
}>()
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
