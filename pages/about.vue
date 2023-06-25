<script setup lang="ts">
const { data } = await useKql({
  query: `page("${useRoute().path}")`,
  select: {
    id: true,
    title: true,
    intendedTemplate: true,
    // description: true,
    layoutsOld: 'page.layout.toLayouts',
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
    address: 'page.address.kirbytext',
    email: true,
    phone: true,
    social: 'page.social.toStructure',
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

<template>
  <div>
    <KirbyLayouts :layouts="page.layouts ?? []" />
  </div>
</template>

<style scoped>
.contact {
  padding: 3rem;
  border: 2px solid #000;
}
.contact .h1 {
  margin-bottom: 1.5rem;
}
</style>
