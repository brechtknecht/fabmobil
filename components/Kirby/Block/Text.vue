<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'text'>
}>()
</script>

<template>
  <div
    class="font-body text-body leading-relaxed"
    v-html="block.content.text"
  />
</template>
