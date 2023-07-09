<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'list'>
}>()
</script>

<template>
  <div
    class="font-body text-body max-w-prose mx-auto"
    v-html="block.content.text"
  />
</template>
