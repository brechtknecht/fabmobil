<script setup lang="ts">
defineProps<{
  note?: Record<string, any>
  excerpt?: boolean
}>()

function formatDateShort(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}
</script>

<template>
  <article class="note-excerpt">
    <NuxtLink :to="`/${note?.id}`">
      <header class="relative">
        <figure class="img rounded-md overflow-hidden" style="--w: 16; --h: 9">
          <div class="image-overlay"></div>
          <img
            :src="note?.cover?.url ?? note?.images?.[0]?.url"
            class="figure-img"
            alt=""
          />

          <h3 class="font-headline text-title-2 centered-title leading-tight">
            {{ note?.title }}
          </h3>
        </figure>
      </header>

      <div v-if="excerpt" class="note-excerpt-text">
        {{ note?.text }}
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.note-excerpt {
  line-height: 1.5em;
}
.note-excerpt:hover .note-excerpt-text,
.note-excerpt:hover .image-overlay,
.note-excerpt:hover .centered-title {
  opacity: 0;
}
.note-excerpt:hover .figure-img {
  transform: scale(1.15);
}
.note-excerpt header {
  margin-bottom: 1.5rem;
}
.note-excerpt figure {
  margin-bottom: 0.5rem;
  position: relative;
  overflow: hidden;
}
.note-excerpt .figure-img {
  transition: transform 0.3s cubic-bezier(0.59, 0.59, 0.18, 1);
  transform-origin: center;
}
.note-excerpt .image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease-in-out;
  z-index: 10;
}
.centered-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease-in-out;
  z-index: 100;
  color: white;
}
.note-excerpt-date {
  color: var(--color-text-grey);
}
</style>
