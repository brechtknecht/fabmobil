<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineProps<{
  note?: Record<string, any>
  excerpt?: boolean
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
    class="tutorial-excerpt drop-shadow-3 rounded-md"
    :class="{
      'outline drop-shadow-5 outline-2 outline-green': isHovered,
    }"
    :style="{
      transform: isHovered ? `translate(${x}px, ${y}px) scale(1.0)` : '',
    }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <NuxtLink :to="`/${note?.id}`">
      <header>
        <figure class="img rounded-t-md" style="--w: 16; --h: 9">
          <img
            :src="note?.cover?.url ?? note?.images?.[0]?.url"
            alt=""
            class="rounded-t-md"
            :style="{
              transform: isHovered
                ? `translate(${x / 10}px, ${y / 10}px) scale(1.1)`
                : '',
            }"
          />
        </figure>

        <h2
          class="note-excerpt-title text-secondary text-headline font-light p-4"
        >
          {{ note?.title }}
        </h2>
      </header>

      <div v-if="excerpt" class="note-excerpt-text">
        {{ note?.text }}
      </div>
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
