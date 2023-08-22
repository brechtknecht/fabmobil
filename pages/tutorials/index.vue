<template>
  <div class="bg-[#F2F2F2]">
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

    <div class="w-full max-w-xs mx-auto my-4">
      <select
        v-model="selectedCategory"
        class="w-full p-2 text-sm border rounded"
      >
        <option v-for="category in categories" :key="category">
          {{ category }}
        </option>
      </select>
    </div>

    <transition-group
      name="fade"
      tag="ul"
      class="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-[1920px] mx-auto px-4 py-16"
    >
      <li
        v-for="(item, index) in filteredTutorials"
        :key="index"
        class="column"
      >
        <AppTutorial :note="item" :excerpt="true" />
      </li>
    </transition-group>

    <div
      v-if="filteredTutorials.length === 0"
      class="w-full p-8 text-center text-gray-600"
    >
      <p>No tutorials available in this category.</p>
    </div>
    <!-- Debug text -->
    <!-- <pre>{{ page }}</pre> -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { tutorialsQuery } from '~/queries'

const route = useRoute()
const { data } = await useKql(tutorialsQuery)

// Set the current page data for the global page context
const page = data.value?.result

const tag = computed(() => route.query.tag as string)

// Filter page children by tags
const tutorials = computed(() =>
  (page?.children ?? []).filter((i: any) =>
    tag.value ? i.tags?.includes(tag.value) : true
  )
)

// Create a list of unique categories
const categories = computed(() => {
  const allCategories = new Set(
    tutorials.value.flatMap((tutorial) => tutorial.category)
  )
  return ['All Categories', ...Array.from(allCategories)]
})

// Add a reactive data property for the selected category
const selectedCategory = ref('All Categories')

// Create a filtered list of tutorials based on the selected category
const filteredTutorials = computed(() => {
  if (selectedCategory.value === 'All Categories') {
    return tutorials.value
  }
  return tutorials.value.filter((tutorial) =>
    tutorial.category.includes(selectedCategory.value)
  )
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.grid > .column {
  grid-column: initial;
}
</style>
