<template>
  <section :style="{ backgroundColor: colors }" class="hero">
    <img :src="image.url" :alt="title" class="hero-image" />
    <div class="hero-content">
      <h1 class="hero-title">{{ title }}</h1>
      <p class="hero-description">{{ description }}</p>
      <p class="hero-intro-text">{{ intro_text }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  intro_text: String,
  colors: String,
  image: Object,
})

const { title, description, intro_text, colors, image } = toRefs(props)
</script>

<style scoped>
.hero {
  position: relative;
  padding: 2em;
  color: white;
  text-align: center;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.hero-description {
  margin-bottom: 1em;
}

.hero-intro-text {
  font-size: 1.2em;
}
</style>
