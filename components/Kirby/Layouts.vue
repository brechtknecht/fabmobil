<script setup lang="ts">
import { onMounted } from 'vue'
import { computed } from 'vue'
import type { KirbyLayout } from '#nuxt-kql'

defineProps<{
  layouts: KirbyLayout[]
  maxWidth: string // new prop
}>()

/** Returns the number of columns this column spans */
function span(width: `${string}/${string}`, columns = 12) {
  const [a, b] = width.split('/')
  return columns * (parseInt(a) / parseInt(b))
}

function getLayoutClass(layoutPosition) {
  switch (layoutPosition) {
    case 'top-center':
      return 'items-start justify-center'
    case 'top-left':
      return 'items-start justify-start'
    case 'top-right':
      return 'items-start justify-end'
    case 'center':
      return 'items-center justify-center'
    case 'bottom-left':
      return 'items-end justify-start'
    case 'bottom-center':
      return 'items-end justify-center'
    case 'bottom-right':
      return 'items-end justify-end'
    default:
      return ''
  }
}

// Set up ScrollReveal on client side
onMounted(async () => {
  if (process.client) {
    const ScrollReveal = await import('scrollreveal')
    const sr = ScrollReveal.default()

    sr.reveal('.reveal', {
      origin: 'bottom',
      distance: '72px',
      duration: 700,
      delay: 0,
      opacity: 0,
      scale: 1,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      mobile: false,
      reset: false,
    })
  }
})
</script>

<template>
  <div
    v-for="layout in layouts"
    :id="layout.content.id"
    :key="layout.content.id"
    :style="`--gutter: 1.5rem; background-color: ${layout.attrs.colors}; background-image: url('${layout.image?.url}'); background-size: cover;`"
    :class="[layout.attrs.verticalspace]"
  >
    <section
      class="container grid sm:padding-xl mx-auto px-8"
      :style="`max-width: ${maxWidth};`"
      :class="[
        { 'text-white': layout.attrs.darkmode == 'true' },
        getLayoutClass(layout.attrs.layoutposition),
      ]"
    >
      <div
        v-for="(column, index) in layout.content.columns"
        :key="index"
        class="column w-full"
        :class="{ reveal: layout.attrs.revealed == 'true' }"
        :style="`--columns: ${span(column.width)}`"
      >
        <!-- Wrapper with reveal class -->
        <KirbyBlocks
          :blocks="column.blocks"
          :offset="layout.attrs.offset"
          class="text w-full"
          :style="`color:${layout.attrs.foregroundcolor}`"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
.py-2 {
  padding: 2rem 0;
}
.py-4 {
  padding: 4rem 0;
}
.py-8 {
  padding: 8rem 0;
}
.py-12 {
  padding: 12rem 0;
}
.py-16 {
  padding: 16rem 0;
}
</style>
