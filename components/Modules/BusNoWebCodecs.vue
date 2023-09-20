<template>
  <div class="section bg-black">
    <div class="container mx-auto">
      <div class="scrolly-video-container relative">
        <video-player
          class="video-player-box"
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

export default defineComponent({
  components: {
    VideoPlayer,
  },
})
</script>

<style lang="scss" scoped>
.scrolly-video-container {
  height: 100vh;
  background: black;
}
.video-player-box {
  width: 100% !important;
  height: 70vh !important;
}

#vjs_video_3_html5_api {
  width: 100% !important;
  height: 70vh !important;
}
.video-player-box > div,
.video-player-box > video {
  width: 100% !important;
  height: 70vh !important;
}
</style>
