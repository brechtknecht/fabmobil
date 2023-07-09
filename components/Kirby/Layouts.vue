<script setup lang="ts">
import type { KirbyLayout } from '#nuxt-kql'

defineProps<{
  layouts: KirbyLayout[]
}>()

/** Returns the number of columns this column spans */
function span(width: `${string}/${string}`, columns = 12) {
  const [a, b] = width.split('/')
  return columns * (parseInt(a) / parseInt(b))
}
</script>

<template>
  <div
    v-for="layout in layouts"
    :id="layout.content.id"
    :key="layout.content.id"
    :style="`--gutter: 1.5rem; background-color: ${layout.attrs.colors}; background-image: url('${layout.image?.url}'); background-size: cover;`"
  >
    <section
      class="container grid padding-xl items-center mx-auto"
      :class="{ 'text-white': layout.attrs.darkmode == 'true' }"
    >
      <div
        v-for="(column, index) in layout.content.columns"
        :key="index"
        class="column mx-auto py-8 w-full"
        :style="`--columns: ${span(column.width)}`"
      >
        <KirbyBlocks :blocks="column.blocks" class="text w-full" />
      </div>
    </section>
  </div>
</template>
