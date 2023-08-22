<script setup lang="ts">
import { onMounted } from 'vue'
import type { KirbyLayout } from '#nuxt-kql'

defineProps<{
  layouts: KirbyLayout[]
}>()

/** Returns the number of columns this column spans */
function span(width: `${string}/${string}`, columns = 12) {
  const [a, b] = width.split('/')
  return columns * (parseInt(a) / parseInt(b))
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
  >
    <section
      class="container grid padding-xl items-center mx-auto"
      :class="[
        { 'text-white': layout.attrs.darkmode == 'true' },
        layout.attrs.verticalspace,
      ]"
    >
      <div
        v-for="(column, index) in layout.content.columns"
        :key="index"
        class="column mx-auto w-full reveal"
        :style="`--columns: ${span(column.width)}`"
      >
        <!-- Wrapper with reveal class -->
        <KirbyBlocks :blocks="column.blocks" class="text w-full" />
      </div>
    </section>
  </div>
</template>
