<template>
  <div class="text-black">
    <div class="">
      <KirbyLayouts :layouts="page.layouts ?? []" class="px-12" />
      <!-- <pre class="text-white">{{ page }}</pre> -->
    </div>
  </div>
</template>

<script setup>
const { data } = await useKql({
  query: `page("${useRoute().path}")`,
  select: {
    id: true,
    title: true,
    layouts: {
      query: 'page.layout.toLayouts',
      select: {
        content: 'layout',
        attrs: 'layout.attrs',
        image: {
          query: 'layout.attrs.image.toFile',
        },
      },
    },
    images: {
      query: 'page.images',
      select: ['id', 'uuid', 'url', 'alt'],
    },
  },
})

console.log(data)

// Set the current page data for the global page context
const page = data.value?.result
setPage(page)
</script>
