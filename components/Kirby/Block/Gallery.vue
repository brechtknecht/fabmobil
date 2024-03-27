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
    // Ensure `newImages` is an array before proceeding.
    if (!Array.isArray(newImages)) {
      images.value = [];
      return;
    }

    // Ensure `props.block.content.images` is an array before mapping.
    // This prevents runtime errors if `props.block.content.images` is undefined/null.
    const imageUuids = Array.isArray(props.block.content.images) ? props.block.content.images : [];

    // Map `imageUuids` to corresponding objects found in `newImages`.
    // The check for `imageUuid` ensures that we're only trying to find images for valid UUIDs.
    images.value = imageUuids.map((imageUuid) => {
      return newImages.find((img) => img.uuid === imageUuid);
    }).filter(image => image !== undefined); // Filter out any undefined entries if an image UUID wasn't found.

    // Alternatively, if you want to keep `undefined` entries (for some reason), you can omit the `.filter` part.
  },
  { immediate: true }
);


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
          :src="image?.url"
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
