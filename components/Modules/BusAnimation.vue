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
  <div>
    <div class="scrolly-video-container">
      <ScrollyVideo src="/assets/video/bussl.mp4" transition-speed="0.005" />
    </div>
  </div>
</template>

<style>
.scrolly-video-container {
  height: 300vh;
  margin: 0;
  padding: 0;
}
</style>
