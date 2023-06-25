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
  <div>
    <section
      v-for="layout in layouts"
      :id="layout.content.id"
      :key="layout.content.id"
      class="grid padding-xl items-center"
      :class="{ 'text-white': layout.attrs.darkmode == 'true' }"
      :style="`--gutter: 1.5rem; background-color: ${layout.attrs.colors}; background-image: url('${layout.image?.url}'); background-size: cover;`"
    >
      <div
        v-for="(column, index) in layout.content.columns"
        :key="index"
        class="column max-w-[80%] mx-auto py-16"
        :style="`--columns: ${span(column.width)}`"
      >
        <KirbyBlocks :blocks="column.blocks" class="text" />
      </div>
    </section>
  </div>
</template>
