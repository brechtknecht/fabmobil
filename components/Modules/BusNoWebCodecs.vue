<template>
  <div class="section bg-black">
    <div class="container mx-auto">
      <div class="scrolly-video-container relative">
        <BaseBusOverlays
          v-show="isInViewport"
          class="sticky w-full h-full z-40"
          :scroll-percentage="progressPercentage"
        />

        <video-player
          ref="videoPlayer"
          class="sticky video-player-box"
          src="/assets/video/sequence-compressed.mp4"
          poster="/your-path/poster.jpg"
          controls
          :autoplay="true"
          :loop="true"
          :volume="0.6"
        />
        <pre class="sticky top-32 text-white"
          >{{ progressPercentage }} — {{ isInViewport }}</pre
        >
      </div>
    </div>
  </div>
</template>

<script>
import { VideoPlayer } from '@videojs-player/vue'

export default {
  data() {
    return {
      isInViewport: false,
      progressPercentage: 0,
      observer: null, // Define observer here
    }
  },
  mounted() {
    this.$nextTick(() => {
      const containerElement = this.$el.querySelector(
        '.scrolly-video-container'
      )
      const videoElement = this.$refs.videoPlayer.$el.querySelector('video')

      videoElement.addEventListener('timeupdate', () => {
        this.progressPercentage =
          (videoElement.currentTime / videoElement.duration) * 100
      })

      // Create a new Intersection Observer
      this.observer = new IntersectionObserver(
        (entries) => {
          // If the element is in the viewport, set isInViewport to true, else false
          this.isInViewport = entries[0].intersectionRatio >= 0.5
        },
        {
          threshold: [0.5], // 50% visibility
        }
      )

      // Start observing the container element
      this.observer.observe(containerElement)
    })
  },
  beforeUnmount() {
    // Stop observing when the component is destroyed
    this.observer.disconnect()
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
