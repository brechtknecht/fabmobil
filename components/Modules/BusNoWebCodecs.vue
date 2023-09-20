<template>
  <div class="section bg-black">
    <div class="container mx-auto">
      <div class="scrolly-video-container relative">
        <button style="color: white; background-color: red" @click="playVideo">
          Play
        </button>
        <button style="color: white; background-color: red" @click="pauseVideo">
          Pause
        </button>
        <div class="text-white">Video progress: {{ videoProgress }}</div>
        <input
          v-model="videoPercentage"
          type="range"
          min="0"
          max="1"
          step="0.01"
          @input="setVideoPercentage"
        />

        <video
          ref="video"
          class="relative scale-75 flex justify-center items-center h-full"
          src="/assets/video/sequence-compressed.mp4"
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

<script setup>
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

const Component = defineComponent({})

const video = ref(null)
const videoProgress = ref(0)
const playing = ref(false)
const videoPercentage = ref(0)

const playVideo = async () => {
  try {
    await video.value.play()
    playing.value = true
  } catch (err) {
    console.error('Failed to play the video:', err)
  }
}

const pauseVideo = () => {
  video.value.pause()
  playing.value = false
}

const setVideoPercentage = () => {
  video.value.currentTime = video.value.duration * videoPercentage.value
}

const updateVideoProgress = () => {
  videoProgress.value = video.value.currentTime / video.value.duration
}

onMounted(() => {
  video.value.addEventListener('loadedmetadata', updateVideoProgress, {
    once: true,
  })
  video.value.addEventListener('timeupdate', updateVideoProgress)
})

onUnmounted(() => {
  video.value.removeEventListener('timeupdate', updateVideoProgress)
})
</script>

<style lang="scss">
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
