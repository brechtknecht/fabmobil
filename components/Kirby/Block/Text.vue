<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'text'>
}>()
</script>

<template>
  <div
    class="font-body text-headline leading-relaxed max-w-prose px-4 sm:px-8 md:px-0"
    v-html="block.content.text"
  />
</template>
