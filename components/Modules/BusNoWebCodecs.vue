<template>
  <div class="section bg-black">
    <div class="container mx-auto">
      <div class="scrolly-video-container relative">
        <video-player
          src="/assets/video/sequence-compressed.mp4"
          poster="/your-path/poster.jpg"
          controls
          :loop="true"
          :volume="0.6"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

export default defineComponent({
  components: {
    VideoPlayer,
  },
})
</script>

<style lang="scss" scoped>
.nowebcodecs-video {
  max-width: 1000px;
  margin: 0 auto;
}
.scrolly-video-container {
  height: 100vh;
  background: black;

  video {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 1192 / 1080 !important;
  }
}
</style>
