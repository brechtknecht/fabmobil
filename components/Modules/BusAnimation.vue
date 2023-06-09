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
    <div class="content">
      <h1>This is a headline</h1>
      <p>this is sample content above the interacitve part</p>
    </div>
    <div class="scrolly-video-container">
      <ScrollyVideo src="/assets/video/bussl.mp4" transition-speed="0.1" />
    </div>
    <div class="content">
      <h1>This is a headline</h1>
      <p>this is sample content below the interacitve part</p>
    </div>
  </div>
</template>

<style>
.scrolly-video-container {
  height: 300vh;
  margin: 0;
  padding: 0;
}

.content {
  margin: 0 auto;
  max-width: 800px;
  padding: 20rem;
}

body,
html {
  font-family: 'Inter';
  margin: 0;
  padding: 0;
}
</style>
