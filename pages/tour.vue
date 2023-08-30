<template>
  <div>
    <!-- <div
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
    </div> -->
    <div
      class="section-tour bg-secondary h-fit border-t border-b border-black py-4"
    >
      <h2
        class="font-headline text-xl sm:text-5xl leading-relaxed text-primary text-large-title font-bold mb-4 sticky top-0 left-0 z-10 bg-secondary border-b border-black pt-4 pb-2 px-4"
      >
        Wo wir schon waren (2017 – 2023)
      </h2>
      <!-- Add Selector here -->
      <div class="sticky top-16 z-10 px-8">
        <!-- <h3 class="font-headline text-white">Select Category</h3> -->
        <div class="toggle-wrapper flex gap-4 py-4">
          <button
            v-for="(category, index) in categories"
            :key="index"
            :class="[
              'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow',
              { 'bg-black': selectedCategory.value === category },
            ]"
            @click="selectCategory(category)"
          >
            {{ category }}
          </button>
        </div>
      </div>
      <div class="h-[100vh] text-primary">
        <!-- Pass the tourdates as locations to the Map component -->
        <ModulesTourMap :tour-data="filteredTourDates" />
      </div>
    </div>

    <!-- New Section: Upcoming Dates -->
    <div class="bg-secondary">
      <div class="container mx-auto section-upcoming-date px-4 pt-12 pb-64">
        <h2 class="font-headline text-primary text-large-title font-bold mb-4">
          Die nächsten Spots:
        </h2>
        <div
          v-for="(tourDate, index) in upcomingTourDates"
          :key="index"
          class="mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full pb-4 sm:pb-0"
        >
          <div
            class="flex flex-col sm:flex-row items-baseline gap-0 pb-2 sm:pb-0 sm:gap-8"
          >
            <p class="font-headline text-title-3 text-primary leading-normal">
              {{ formatDate(tourDate.startdate) }} –
              {{ formatDate(tourDate.enddate) }}
            </p>
            <p class="font-paragraph text-white text-title-3 leading-normal">
              {{ tourDate.venuename }}
            </p>
          </div>
          <p
            v-if="tourDate.registration == 'true'"
            class="text-white border border-white rounded-md px-2"
          >
            Voranmeldung Nötig
          </p>
        </div>
      </div>
    </div>
    <!-- Debug text -->
    <!-- <pre>{{ page }}</pre> -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const { data } = await useKql({
  query: `page("/tour")`,
  select: {
    title: true,
    description: true,
    modules: {
      // New modules field
      query: 'page.children.children',
      select: {
        id: true,
        title: true,
        description: true,
        intro_text: true,
        backgroundColor: true,
        foregroundColor: true,
        image: true,
      },
    },
    tourdates: {
      query: 'page.tourdates.toStructure',
    },
  },
})

console.log(data)

const page = data.value?.result
setPage(page)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0') // January is 0!
  const yyyy = date.getFullYear()

  return dd + '.' + mm + '.' + yyyy
}

// Filter tour dates to include only upcoming dates
const upcomingTourDates = ref([])
if (page && page.tourdates) {
  upcomingTourDates.value = page.tourdates.filter(
    (tourDate) => new Date(tourDate.enddate) > new Date()
  )
}

// Initialize selectedCategory as a reactive ref, with a default value of 'All'
const selectedCategory = ref('All')

// Define a function to update selectedCategory
const selectCategory = (category) => {
  selectedCategory.value = category
  console.log('Changed Category to:', category)
}

// Assuming each tourDate has a category property, we can collect all unique categories this way:
const categories = computed(() => {
  if (page && page.tourdates) {
    const allCategories = page.tourdates.flatMap((tourDate) =>
      tourDate.category.split(', ')
    )
    const uniqueCategories = Array.from(new Set(allCategories))
    return ['All', ...uniqueCategories]
  }
  return ['All']
})

// Computed property for filteredTourDates
const filteredTourDates = computed(() => {
  if (page && page.tourdates) {
    console.log('Update filteredTourDates')
    return page.tourdates.filter(
      (tourDate: { enddate: string | number | Date; category: string }) =>
        selectedCategory.value === 'All' ||
        tourDate.category.split(', ').includes(selectedCategory.value)
    )
  }
  return []
})

watch(filteredTourDates, (newVal, oldVal) => {
  console.log('filteredTourDates changed:', newVal)
})
</script>

<style scoped>
.info-overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.info-overlay:hover {
  opacity: 1;
}

.info-details {
  text-align: center;
  max-width: 80%;
}

.mask-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
