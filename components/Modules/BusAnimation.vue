<script setup>
import { defineComponent } from 'vue'
import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.vue'

const Component = defineComponent({
  components: {
    ScrollyVideo,
  },
})
</script>

<template>
  <div class="section bg-black">
    <div class="container mx-auto">
      <div class="scrolly-video-container">
        <ScrollyVideo
          class="relative p-20"
          src="/assets/video/bussl_neu.mp4"
          transition-speed="0.0001"
          :cover="false"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.scrolly-video-container {
  height: 600vh;
  background: black;

  canvas,
  video {
    width: 100% !important; /* This will make the width equal to the full width of its container */
    height: auto !important;
    aspect-ratio: 1192 / 1080 !important;
  }
}
</style>
