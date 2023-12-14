<script setup lang="ts">
const homeData = await useKql({
  query: 'page("home")',
  select: {
    id: true,
    title: true,
    sponsors: {
      query: 'page.sponsors.toStructure',
      select: {
        linkName: true,
        url: true,
        image: {
          query: 'structureItem.image.toFile', // Followed the pattern in technology.yml
          select: {
            url: true,
          },
        },
      },
    },
  },
})

console.log('HOMEDATA:', homeData.data.value?.result)

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

// Combine the data from both calls
const page = {
  ...data.value?.result, // assuming this is the format of your data
  home: homeData.data.value?.result, // add the home data
}

console.log(page)

// Set the current page data for the global page context
setPage(page)
</script>

<template>
  <div id="about">
    <BaseFloatingImages
      :speed="0.000000000000000001"
      :scale="5"
      :backgroundcolor="'#FFFFFF'"
      number-of-images-to-use="32"
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
    <ModulesSponsors
      v-if="page.home.sponsors"
      class="bg-white"
      :sponsors="page.home.sponsors"
    />
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
