<script lang="ts">
export interface KirbyImage {
  id: string
  uuid: string
  url: string
  alt: string | null
}
</script>

<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

const props = defineProps<{
  block: KirbyBlock<'image'>
  offset: string
}>()

const page = usePage()

// Use static data to avoid reactivity when redirecting to another page
const images = page.value.images ?? [];

const ratio = props.block.content.ratio || 'auto'
let size: { w?: string; h?: string } = {}

if (ratio !== 'auto') {
  const [w = '1', h = '1'] = ratio.split('/')
  size = { w, h }
}

// Auto sizes for `srcset` attribute if used
const figure = ref<HTMLElement | undefined>()
const { width } = useElementSize(figure)
</script>

<template>
  <figure ref="figure">
    <component
      :is="block.content.link ? 'a' : 'div'"
      :href="block.content.link || undefined"
      :data-contain="block.content.crop === false || undefined"
      :class="[ratio === 'auto' ? 'auto' : 'img']"
      :style="`--w: ${block}; --h: ${size.h}; `"
    >
      <img
        v-if="block.content.location === 'web'"
        :src="block.content.src"
        :alt="block.content.alt"
        :class="`${props.offset}`"
      />
      <KirbyUuidResolver
        v-else
        v-slot="{ item: image }"
        :uuid="props.block.content.image?.[0] ?? []"
        :collection="images"
      >
        <img
          :src="image?.url"
          :sizes="`${width}px`"
          :alt="image.alt"
          :class="`${props.offset}`"
        />
      </KirbyUuidResolver>
    </component>

    <figcaption
      v-if="block.content.caption"
      class="img-caption"
      v-html="block.content.caption"
    />
  </figure>
</template>

<style>
.translate-y-0 {
  transform: translateY(0);
}
.translate-y-8 {
  transform: translateY(4rem);
}
.translate-y-24 {
  transform: translateY(6rem);
}
.translate-y-32 {
  transform: translateY(12rem);
}
.translate-y-42 {
  transform: translateY(16rem);
}

/* Media query to disable transforms under 960px width */
@media only screen and (max-width: 959px) {
  .translate-y-0,
  .translate-y-8,
  .translate-y-24,
  .translate-y-32,
  .translate-y-42 {
    transform: translateY(0) !important;
  }
}
</style>
