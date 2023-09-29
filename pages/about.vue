<script setup lang="ts">
const { data } = await useKql({
  query: `page("${useRoute().path}")`,
  select: {
    id: true,
    title: true,
    intendedTemplate: true,
    // description: true,
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
    modules: {
      // New modules field
      query: 'page.children.children',
      select: {
        id: true,
        title: true,
        description: 'page.description.kirbytext',
        intro_text: true,
        backgroundColor: true,
        foregroundColor: true,
        image: true,
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
  <div id="about">
    <BaseFloatingImages
      :speed="0.000000000000000001"
      :scale="5"
      :backgroundcolor="'#FFFFFF'"
    >
      <div
        v-if="page.modules && page.modules.length > 0"
        class="app-hero-wrapper"
      >
        <AppHero
          v-for="(module, index) in page.modules"
          :key="index"
          :title="module.title"
          :description="module.description"
          :intro_text="module.intro_text"
          :background-color="module.backgroundColor"
          :foreground-color="module.foregroundColor"
          :image="module.image"
        />
      </div>
      <KirbyLayouts :layouts="page.layouts ?? []" class="px-12" />
    </BaseFloatingImages>
    <ModulesLokallaboreTeaser />
    <!-- Debug text -->
    <!-- <pre>{{ page }}</pre> -->
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

.grid > .column {
  grid-column: span var(--columns);
}
</style>
