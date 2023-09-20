<script setup>
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.vue'

const Component = defineComponent({
  components: {
    ScrollyVideo,
  },
})

// Create refs for ScrollyVideo, loading state, and progress
const scrollyVideo = ref(null)
const loadingState = ref(false) // Ref for loading state
const progressPercentage = ref(0) // Ref for progress percentage
const scrollPercentage = ref(0)

let observer
const isInViewport = ref(false)

const handleScroll = () => {
  const scrollyVideoRef = scrollyVideo.value.scrollyVideo
  let totalDuration = 0
  if (!scrollyVideoRef.isSafari) {
    totalDuration = scrollyVideoRef.frames.length / scrollyVideoRef.frameRate
  } else {
    totalDuration = scrollyVideoRef.video.duration
  }

  // Update the scroll percentage ref
  scrollPercentage.value = (scrollyVideoRef.currentTime / totalDuration) * 100

  // console.log(scrollPercentage.value)
}

onMounted(() => {
  const scrollyVideoElement = scrollyVideo.value.$el

  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isInViewport.value = true
    } else {
      isInViewport.value = false
    }
  })

  observer.observe(scrollyVideoElement)

  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  observer.disconnect()
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="section bg-black">
    <div class="container mx-auto">
      <div class="scrolly-video-container relative">
        <pre class="sticky top-32 text-white">{{ scrollPercentage }}</pre>

        <!-- Pass scrollPercentage to VideoOverlay -->
        <BaseBusOverlays
          v-if="isInViewport"
          class="appe w-full h-full relative z-40"
          :scroll-percentage="scrollPercentage"
        />

        <!-- ScrollyVideo component -->
        <ScrollyVideo
          ref="scrollyVideo"
          class="relative scale-75 flex justify-center items-center h-full scrolly-video"
          src="/assets/video/sequence-compressed.mp4"
          transition-speed="0.0001"
          debug="true"
          :cover="false"
          :track-scroll="true"
          :style="{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scrolly-video-container {
  height: 600vh;
  background: black;

  canvas,
  video {
    width: 100% !important; /* This will make the width equal to the full width of its container */
    // height: 100% !important;
    height: auto !important;
    aspect-ratio: 1192 / 1080 !important;
  }
}

.scrolly-video {
  overflow: visible !important;
}

.scrolly-video-container {
  canvas {
    position: relative;
    transform: translate(0, -50%);
    top: 50%;
  }
}
</style>
