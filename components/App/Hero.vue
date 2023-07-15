<template>
  <section
    :style="{ backgroundColor: backgroundColor }"
    class="hero relative text-white py-8 md:py-16 lg:py-60 overflow-hidden"
  >
    <img
      v-if="image"
      :src="image?.url"
      :alt="title"
      class="hero-image absolute top-0 left-0 w-full h-full object-cover opacity-1 z-10"
    />
    <div
      class="hero-content container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-20 relative"
      :style="{ color: foregroundColor }"
    >
      <h1
        class="font-headline text-large-title font-bold hero-title md:text-title-1 lg:text-title-2 xl:text-title-3 2xl:text-large-title"
      >
        {{ title }}
      </h1>
      <p
        class="hero-description text-body sm:text-callout md:text-subhead lg:text-headline xl:text-title-3 2xl:text-title-2"
      >
        {{ description }}
      </p>
      <p
        class="hero-intro-text text-callout sm:text-subhead md:text-headline lg:text-title-3 xl:text-title-2 2xl:text-title-1 col-span-full"
      >
        {{ introText }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  introText: {
    type: String,
    default: '',
  },
  backgroundColor: {
    type: String,
    default: '',
  },
  foregroundColor: {
    type: String,
    default: '',
  },
  image: {
    type: Object,
    default: function () {},
  },
})

const { title, description, introText, colors, image } = toRefs(props)
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
