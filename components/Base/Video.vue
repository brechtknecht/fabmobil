<template>
  <div
    ref="videoContainer"
    class="video-container relative w-full items-center justify-center p-24 rounded-none 3xl:rounded-xl overflow-hidden 3xl:border border-gray h-fill"
  >
    <iframe
      v-if="videoVisible"
      id="video-iframe"
      class="rounded-none 3xl:rounded-xl overflow-hidden 3xl:border border-gray bg-black absolute top-0 left-0 w-full h-full"
      title="video-player"
      :src="videoUrl"
      frameborder="0"
      allowfullscreen
      allow="autoplay; fullscreen"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{ url?: string }>()

const videoContainer = ref(null)
const videoVisible = ref(false)

const videoUrl = computed(() => {
  const url = props.url || ''
  if (url.includes('vimeo.com/')) {
    // Vimeo URL processing
    return `https://player.vimeo.com/video/${url.split('/').pop()}`
  } else if (url.includes('youtube.com/watch?v=')) {
    // YouTube URL processing
    const videoId = url.split('watch?v=')[1].split('&')[0] // Assumes no other URL params are present
    return `https://www.youtube.com/embed/${videoId}`
  } else if (url.includes('youtu.be/')) {
    // Shortened YouTube URL processing
    const videoId = url.split('youtu.be/')[1]
    return `https://www.youtube.com/embed/${videoId}`
  } else {
    return '' // No valid URL provided
  }
})

const checkVisibility = () => {
  if (videoContainer.value) {
    const rect = videoContainer.value.getBoundingClientRect()
    const inViewport = rect.top <= window.innerHeight && rect.bottom >= 0
    if (inViewport && !videoVisible.value) {
      videoVisible.value = true
      // Once the video is loaded, we can remove the event listener
      window.removeEventListener('scroll', checkVisibility)
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', checkVisibility)
  // Check initially if the video is in viewport, without waiting for scroll
  checkVisibility()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkVisibility)
})
</script>

<style scoped>
.video-container {
  box-shadow: 0px 7.0074076652526855px 7.935121059417725px 0px
      rgba(0, 0, 0, 0.03),
    0px 16.83977508544922px 16.866830825805664px 0px rgba(0, 0, 0, 0.04),
    0px 31.707799911499023px 27.85359001159668px 0px rgba(0, 0, 0, 0.05),
    0px 56.56129837036133px 43.64020538330078px 0px rgba(0, 0, 0, 0.07),
    0px 105.79168701171875px 74.64582061767578px 0px rgba(0, 0, 0, 0.08),
    0px 253.22579956054688px 202.5806427001953px 0px rgba(124, 0, 255, 0.11);
}
.video-container {
  /* padding-bottom: 56.25%;  */
  padding-bottom: 49.1%;
  height: 0;
  position: relative;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
