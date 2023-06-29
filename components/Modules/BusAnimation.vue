<script setup>
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.vue'

const Component = defineComponent({
  components: {
    ScrollyVideo,
  },
})

// Create a ref for ScrollyVideo
const scrollyVideo = ref(null)

// Ref for scroll percentage
const scrollPercentage = ref(0)

const handleScroll = () => {
  const scrollyVideoRef = scrollyVideo.value.scrollyVideo
  const totalDuration =
    scrollyVideoRef.frames.length / scrollyVideoRef.frameRate

  // Update the scroll percentage ref
  scrollPercentage.value = (scrollyVideoRef.currentTime / totalDuration) * 100

  // console.log(scrollPercentage.value)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="section bg-black">
    <div class="container mx-auto">
      <div class="scrolly-video-container relative">
        <!-- Pass scrollPercentage to VideoOverlay -->

        <!-- Pass scrollPercentage to VideoOverlay -->
        <BaseBusOverlays
          class="appe w-full h-full relative z-50"
          :scroll-percentage="scrollPercentage"
        />

        <!-- ScrollyVideo component -->
        <ScrollyVideo
          ref="scrollyVideo"
          class="relative p-20 scale-75"
          src="/assets/video/bussl_neu.mp4"
          transition-speed="0.0001"
          :cover="false"
          :track-scroll="true"
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
