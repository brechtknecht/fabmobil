<script setup lang="ts">
const { data } = await useKql({
  query: 'page("technology")',
  select: {
    title: true,
  },
})

// Set the current page data for the global page context
const page = data.value?.result
setPage(page)

const { data: technologyData } = await useKql({
  query: 'page("technology")',
  select: {
    name: true,
    category: true,
    technologies: {
      query: 'page.technologies.toStructure',
      select: {
        name: true,
        image: {
          query: 'structureItem.image.toFile',
          select: {
            url: true,
            srcset: 'file.srcset([300, 800, 1024])',
          },
        },
      },
    },
  },
})
</script>

<template>
  <div>
    <h1 class="font-headline text-large-title font-bold">{{ page.title }}</h1>

    <div class="tech-grid">
      <div
        v-for="(tech, index) in technologyData?.result.technologies"
        :key="index"
      >
        <img
          :src="tech.image.url"
          :srcset="tech.image.srcset"
          :alt="tech.name"
        />
        <h2 class="font-headline text-title-1">{{ tech.name }}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.test {
}
</style>
