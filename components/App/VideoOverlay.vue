<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineProps<{
  url?: string
}>()

const el = ref(null)
const x = ref(0)
const y = ref(0)
const isHovered = ref(false)

const updateMouse = (e) => {
  if (isHovered.value) {
    const rect = el.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.value = (e.clientX - centerX) / 20
    y.value = (e.clientY - centerY) / 20
  }
}

onMounted(() => {
  window.addEventListener('mousemove', updateMouse)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMouse)
})
</script>

<template>
  <article
    ref="el"
    class="video-overlay drop-shadow-3 rounded-md"
    :class="{ 'outline outline-offset-2 drop-shadow-5 outline-2': isHovered }"
    :style="{
      transform: isHovered ? `translate(${x}px, ${y}px) scale(1.0)` : '',
    }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <NuxtLink :to="url ? `/${note?.id}` : '#'">
      <header style="--w: 16; --h: 9">
        <slot></slot>
      </header>
    </NuxtLink>
  </article>
</template>

<style lang="scss" scoped>
.grid > .column {
  margin-bottom: 0 !important;
}

figure {
  overflow: hidden;
  img {
    transition: 350ms cubic-bezier(0.04, 0.65, 0.7, 1.02);
    will-change: transform;
  }
}
.tutorial-excerpt {
  line-height: 1.5em;
  will-change: transform;
  transition: transform 0.08s linear;
}
.tutorial-excerpt header {
  margin-bottom: 1.5rem;
}

.drop-shadow-3 {
  box-shadow: 0px 0px 0.5px 0px rgba(0, 0, 0, 0.15),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 5px 12px 0px rgba(0, 0, 0, 0.13);
}

.drop-shadow-5 {
  box-shadow: 0px 0px 0.5px 0px rgba(0, 0, 0, 0.08),
    0px 2px 5px 0px rgba(0, 0, 0, 0.15), 0px 10px 24px 0px rgba(0, 0, 0, 0.18) !important;
}
</style>
