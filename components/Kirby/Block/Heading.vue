<script setup lang="ts">
import slugify from '@sindresorhus/slugify'
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'heading'>
}>()
</script>

<template>
  <component
    :is="block.content.level"
    :id="slugify(block.content.text)"
    class="max-w-prose mx-auto"
  >
    <!-- H1 -->
    <div
      v-if="block.content.level == 'h1'"
      class="font-headline text-large-title font-bold leading-normal mb-8"
    >
      <span v-html="block.content.text" />
    </div>
    <!-- H2 -->
    <div
      v-else-if="block.content.level == 'h2'"
      class="font-headline text-title-1 leading-normal mb-8"
    >
      <span v-html="block.content.text" />
    </div>
    <!-- H3 -->
    <div
      v-else-if="block.content.level == 'h3'"
      class="font-headline text-title-2 leading-normal mb-16"
    >
      <span v-html="block.content.text" />
    </div>

    <!-- EVEYTHING ELSE -->
    <span v-else v-html="block.content.text" />
  </component>
</template>
