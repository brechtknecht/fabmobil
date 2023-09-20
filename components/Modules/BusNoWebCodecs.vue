<template>
  <div class="section bg-black">
    <div class="container mx-auto">
      <div class="scrolly-video-container relative">
        <BaseBusOverlays
          class="appe w-full h-full relative z-40"
          :scroll-percentage="progressPercentage"
        />
        <video-player
          ref="videoPlayer"
          class="video-player-box"
          src="/assets/video/sequence-compressed.mp4"
          poster="/your-path/poster.jpg"
          controls
          :autoplay="true"
          :loop="true"
          :volume="0.6"
        />
        <pre class="sticky top-32 text-white">{{ progressPercentage }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { VideoPlayer } from '@videojs-player/vue'

export default {
  components: {
    VideoPlayer,
  },
  data() {
    return {
      progressPercentage: 0,
    }
  },
  mounted() {
    this.$nextTick(() => {
      const videoElement = this.$refs.videoPlayer.$el.querySelector('video')
      videoElement.addEventListener('timeupdate', () => {
        this.progressPercentage =
          (videoElement.currentTime / videoElement.duration) * 100
      })
    })
  },
}
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
