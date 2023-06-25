<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'list'>
}>()
</script>

<template>
  <div class="font-body text-body" v-html="block.content.text" />
</template>
