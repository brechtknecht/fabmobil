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
        description: true,
        image: {
          query: 'structureItem.image.toFile',
          select: {
            url: true,
            srcset: 'file.srcset([300, 800, 1024])',
          },
        },
        devices: {
          query: 'structureItem.devices.toStructure',
          select: {
            title: true,
            image: {
              query: 'structureItem.image.toFile',
              select: {
                url: true,
                srcset: 'file.srcset([300, 800, 1024])',
              },
            },
            link: true,
          },
        },
      },
    },
  },
})
</script>

<template>
  <div>
    {{ technologyData }}
    <h1 class="font-headline text-large-title font-bold">{{ page.title }}</h1>

    <div class="tech-grid">
      <div
        v-for="(tech, index) in technologyData?.result.technologies"
        :key="index"
        class="tech-item"
      >
        <div class="flex flex-row">
          <div class="left-side w-1/2">
            <h2 class="font-headline text-title-1">{{ tech.name }}</h2>
            <img
              :src="tech.image.url"
              :srcset="tech.image.srcset"
              :alt="tech.name"
              class="w-72"
            />
          </div>
          <div class="right-side w-1/2">
            <p class="font-paragraph text-body">{{ tech.description }}</p>
          </div>
        </div>
        <div v-for="(device, index) in tech.devices" :key="index">
          <h2 class="font-headline text-title-1">{{ device.title }}</h2>
          <img
            v-if="device.image"
            :src="device.image.url"
            :srcset="device.image.srcset"
            :alt="device.name"
            class="w-36"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.test {
}
</style>
