<script setup lang="ts">
import {
  LazyKirbyBlockButton,
  LazyKirbyBlockHeading,
  LazyKirbyBlockImage,
  LazyKirbyBlockLargeButton,
  LazyKirbyBlockLine,
  LazyKirbyBlockList,
  LazyKirbyBlockQuote,
  LazyKirbyBlockText,
  LazyKirbyBlockVideo,
} from '#components'

import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  blocks: KirbyBlock<string>[]
  offset: string
}>()

type Component = abstract new (...args: any) => any

const blockComponents: Partial<Record<string, Component>> = {
  heading: LazyKirbyBlockHeading,
  image: LazyKirbyBlockImage,
  line: LazyKirbyBlockLine,
  list: LazyKirbyBlockList,
  quote: LazyKirbyBlockQuote,
  text: LazyKirbyBlockText,
  video: LazyKirbyBlockVideo,
  button: LazyKirbyBlockButton,
  largebutton: LazyKirbyBlockLargeButton,
}
</script>

<template>
  <div v-router-links>
    <template v-for="(block, index) in blocks" :key="index">
      <component
        :is="blockComponents[block.type]"
        :block="block"
        :offset="offset"
      />
    </template>
  </div>
</template>
