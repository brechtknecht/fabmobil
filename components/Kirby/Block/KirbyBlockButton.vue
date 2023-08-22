<template>
  <div class="flex flex-row gap-4">
    <a
      v-for="button in props.block.content.buttons"
      :key="button.text"
      :href="button.link"
      target="_blank"
    >
      <div
        class="border-2 rounded-lg px-3 py-2 cursor-pointer w-full"
        :class="{
          'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-gray-200':
            button.dark !== 'true',
          'border-white text-white hover:bg-gray-200 hover:text-gray-800':
            button.dark == 'true',
        }"
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
