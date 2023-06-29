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

const handleScroll = () => {
  // Access ScrollyVideo's properties here
  console.log('ScrollyVideo props', scrollyVideo.value.scrollyVideo.currentTime)
  const scrollyVideoRef = scrollyVideo.value.scrollyVideo
  const calculateCurrentTimePercentage = (scrollyVideoRef) => {
    // Calculate the total duration of the video in seconds
    const totalDuration =
      scrollyVideoRef.frames.length / scrollyVideoRef.frameRate

    // Calculate the percentage of the current time
    const currentTimePercentage =
      (scrollyVideoRef.currentTime / totalDuration) * 100

    return currentTimePercentage
  }

  // Use the function
  const percentage = calculateCurrentTimePercentage(
    scrollyVideo.value.scrollyVideo
  )
  console.log('Current Time Percentage: ', percentage)
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
      <div class="scrolly-video-container">
        <!-- Assign the ref here -->
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
