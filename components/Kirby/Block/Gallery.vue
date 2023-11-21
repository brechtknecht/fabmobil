<script setup lang="ts">
import type { KirbyBlock, KirbyGallery } from '#nuxt-kql'

const props = defineProps<{
  block: KirbyBlock<'gallery'> // Change to 'gallery'
  offset: string
}>()

const page = usePage()

// Initialize images as a reactive reference
const images = ref([])

// Watch for changes in page.value.images and update images accordingly
watch(
  () => page.value.images,
  (newImages) => {
    images.value =
      props.block.content.images?.map((imageUuid) =>
        newImages.find((img) => img.uuid === imageUuid)
      ) || []
  },
  { immediate: true }
)

const ratio = props.block.content.ratio || 'auto'
let size: { w?: string; h?: string } = {}

if (ratio !== 'auto') {
  const [w = '1', h = '1'] = ratio.split('/')
  size = { w, h }
}

const figure = ref<HTMLElement | undefined>()
const { width } = useElementSize(figure)
</script>

<template>
  <figure v-if="images.length" ref="figure" class="p-4">
    <!-- Flex container with wrap and justify-center for centering incomplete rows -->
    <div class="flex flex-wrap justify-center gap-8">
      <!-- Each image container -->
      <div
        v-for="(image, index) in images"
        :key="image.uuid || index"
        class="flex-none w-full sm:w-full md:w-1/2 lg:w-1/3"
      >
        <img
          :src="image.url"
          :alt="image.alt || 'Gallery Image ' + (index + 1)"
          class="h-64 object-contain mx-auto"
        />
      </div>
    </div>

    <figcaption
      v-if="props.block.content.caption"
      class="text-center text-sm mt-4"
      v-html="props.block.content.caption"
    />
  </figure>
</template>

<style>
.translate-y-0 {
  transform: translateY(0);
}
.translate-y-8 {
  transform: translateY(4rem);
}
.translate-y-24 {
  transform: translateY(6rem);
}
.translate-y-32 {
  transform: translateY(12rem);
}
.translate-y-42 {
  transform: translateY(16rem);
}

/* Media query to disable transforms under 960px width */
@media only screen and (max-width: 959px) {
  .translate-y-0,
  .translate-y-8,
  .translate-y-24,
  .translate-y-32,
  .translate-y-42 {
    transform: translateY(0) !important;
  }
}
</style>
