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
        description: 'structureItem.description.toBlocks',
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

const { data: categoryData } = await useKql({
  query: 'page("technology")',
  select: {
    categories: {
      query: 'page.categories.toStructure',
      select: {
        name: true,
      },
    },
  },
})
</script>

<template>
  <div>
    <!-- {{ technologyData }} -->
    <h1 class="font-headline text-large-title font-bold">{{ page.title }}</h1>
    <div class="flex flex-row">
      <div class="category-list sticky top-0 w-2/12">
        <h2>All Available Categories</h2>
        <ul>
          <li
            v-for="(category, index) in categoryData?.result.categories"
            :key="index"
          >
            {{ category.name }}
          </li>
        </ul>
      </div>

      <div class="tech-grid w-10/12">
        <div
          v-for="(tech, index) in technologyData?.result.technologies"
          :key="index"
          class="tech-item"
        >
          <div class="flex flex-row">
            <div class="left-side w-1/2">
              <h2 class="font-headline text-large-title">{{ tech.name }}</h2>
              <img
                :src="tech.image.url"
                :srcset="tech.image.srcset"
                :alt="tech.name"
                class="w-72"
              />
            </div>
            <div class="right-side w-1/2">
              <KirbyBlocks :blocks="tech.description ?? []" class="note text" />
            </div>
          </div>
          <div class="flex flex-row">
            <div
              v-for="(device, index) in tech.devices"
              :key="index"
              class="w-1/4"
            >
              <h2 class="font-headline text-title-1 text-center">
                {{ device.title }}
              </h2>
              <img
                v-if="device.image"
                :src="device.image.url"
                :srcset="device.image.srcset"
                :alt="device.name"
                class="w-54"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-list {
  position: sticky;
  top: 12rem;
  height: 100vh; /* adjust this value as needed */
  overflow-y: auto;
}
</style>
