<template>
  <div>
    <BaseVideo :url="block.content.url" />
    <!-- <div v-if="block.content.url" class="video-container w-full">
      <iframe
        :src="videoUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { KirbyBlock } from '#nuxt-kql'

const props = defineProps<{
  block: KirbyBlock<'video'>
}>()

const videoUrl = computed(() => {
  const url = new URL(props.block.content.url)
  if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
    url.hostname = 'www.youtube.com'
    url.pathname = `/embed/${url.searchParams.get('v')}`
    url.searchParams.delete('v')
  }
  return url.toString()
})
</script>

<style scoped>
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
