<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'text'>
}>()
</script>

<template>
  <div
    class="text font-body text-headline leading-relaxed max-w-prose px-4 sm:px-8 md:px-0"
    :class="{ 'mx-auto': block.content.alignment === 'center' }"
    v-html="block.content.text"
  />
</template>

<style scoped>
.text {
  max-width: 48ch;
}
</style>
