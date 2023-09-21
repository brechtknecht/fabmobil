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
const framesLength = ref(0)
const hasLoaded = ref(false) // New ref for hasLoaded
let observer
const isInViewport = ref(false)

let intervalId = null

const handleScroll = () => {
  const scrollyVideoRef = scrollyVideo.value.scrollyVideo

  framesLength.value = scrollyVideoRef.frames.length

  if (framesLength.value === 376) {
    if (intervalId) {
      clearInterval(intervalId)
    }
    console.log('ass', hasLoaded.value)
    hasLoaded.value = true // Set hasLoaded to true
  }

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

  intervalId = setInterval(handleScroll, 10000)
})

onBeforeUnmount(() => {
  observer.disconnect()
  window.removeEventListener('scroll', handleScroll)

  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="section bg-black">
    <div class="container mx-auto">
      <div
        class="scrolly-video-container relative"
        :style="{ height: hasLoaded == false ? '100vh' : '600vh' }"
      >
        <pre class="sticky top-32 text-white">{{ scrollPercentage }}</pre>
        <pre class="sticky top-36 text-white">{{ hasLoaded }}</pre>

        <!-- Pass scrollPercentage to VideoOverlay -->
        <BaseBusOverlays
          v-if="isInViewport"
          class="appe w-full h-full relative z-40"
          :scroll-percentage="scrollPercentage"
        />

        <!-- Loading overlay -->
        <div
          v-if="!hasLoaded"
          class="absolute top-0 left-0 w-full h-screen flex items-center justify-center bg-black opacity-75 z-40"
        >
          <div role="status flex items-center justify-center">
            <svg
              aria-hidden="true"
              class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>

        <!-- ScrollyVideo component -->
        <ScrollyVideo
          ref="scrollyVideo"
          class="relative scale-75 flex justify-center items-center h-full scrolly-video"
          src="/assets/video/output-new.mp4"
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

<style lang="scss">
.scrolly-video-container {
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

.scrolly-video > video {
  display: none;
}

.scrolly-video-container {
  canvas {
    position: relative;
    transform: translate(0, -50%);
    top: 50%;
  }
}
</style>
