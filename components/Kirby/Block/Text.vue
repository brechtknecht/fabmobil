<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'text'>
}>()
</script>

<template>
  <div
    class="font-body text-body leading-relaxed max-w-prose mx-auto px-4 sm:px-8 md:px-0"
    v-html="block.content.text"
  />
</template>
