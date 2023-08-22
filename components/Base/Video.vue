<template>
  <div
    class="video-container relative w-full items-center justify-center p-24 rounded-none 3xl:rounded-xl overflow-hidden 3xl:border border-gray"
  >
    <iframe
      id="youtube"
      class="rounded-none 3xl:rounded-xl overflow-hidden 3xl:border border-gray bg-black absolute top-0 left-0 w-full h-full"
      title="youtube-player"
      :src="youtubeUrl"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ url?: string }>()

const youtubeUrl = computed(() => {
  if (props.url && props.url.includes('youtube.com/watch?v=')) {
    return props.url.replace('watch?v=', 'embed/')
  } else {
    return props.url
  }
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
