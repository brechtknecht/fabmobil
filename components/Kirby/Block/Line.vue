<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'line'>
}>()
</script>

<template>
  <hr class="max-w-prose mx-auto" />
</template>
