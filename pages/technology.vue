<template>
  <section class="bg-secondary">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div>
        <div class="flex flex-row pb-32">
          <div class="category-list sticky top-0 w-4/12 hidden md:block">
            <h1
              class="font-headline text-primary text-large-title font-bold leading-tight py-4"
            >
              {{ page.title }}
            </h1>
            <ul>
              <li
                v-for="(category, index) in categoryData?.result.categories"
                :key="index"
                class="font-headline text-title-3 text-primary cursor-pointer flex justify-between items-center hover:bg-primary hover:text-white transition-colors duration-300 pr-40"
                @click="scrollToTechnology(index)"
                @mouseover="hoveredIndex = index"
                @mouseleave="hoveredIndex = null"
              >
                {{ category.name }}
                <svg
                  v-if="hoveredIndex === index"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-5 h-5 inline-block ml-1 transition-all ease-in-out duration-300 transform translate-x-0 opacity-0"
                  :class="{
                    'translate-x-2 opacity-100': hoveredIndex === index,
                  }"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </li>
            </ul>
          </div>

          <div class="tech-grid w-full md:w-8/12 pt-16">
            <div
              v-for="(tech, index) in technologyData?.result.technologies"
              :key="index"
              ref="technologies"
              class="tech-item border-b border-white py-8"
            >
              <div class="flex flex-col md:flex-row">
                <div class="left-side w-full md:w-1/2">
                  <img :src="tech.image.url" :alt="tech.name" class="w-72" />
                </div>
                <div class="right-side w-full md:w-1/2 h-auto flex flex-col">
                  <h2 class="font-headline text-primary text-large-title">
                    {{ tech.name }}
                  </h2>
                  <KirbyBlocks
                    :blocks="tech.description ?? []"
                    class="note text text-primary"
                  />

                  <a
                    v-if="tech.link"
                    :href="tech.link"
                    target="_blank"
                    class="text-white border border-white rounded p-2 w-fit"
                  >
                    Link →
                  </a>

                  <button
                    class="text-accent rounded-md flex flex-row mt-4 mb-8"
                    @click="tech.showDevices = !tech.showDevices"
                  >
                    Unsere Empfehlungen
                    <span
                      class="inline-block transform transition-transform duration-200 mt-[3px] ml-1"
                      :class="{ 'rotate-[180deg]': tech.showDevices }"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              <transition name="slide-fade" mode="in-out">
                <div
                  v-show="tech.showDevices"
                  class="devices pt-20 pb-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4"
                >
                  <div
                    v-for="(device, index) in tech.devices"
                    :key="index"
                    class="flex flex-col justify-center align-start"
                  >
                    <h2
                      class="font-headline text-primary text-title-1 text-center"
                    >
                      {{ device.title }}
                    </h2>
                    <img
                      v-if="device.image"
                      :src="device.image.url"
                      :srcset="device.image.srcset"
                      :alt="device.name"
                      class="w-54"
                    />
                    <a
                      v-if="device.link"
                      :href="device.link"
                      target="_blank"
                      class="text-white border border-white rounded p-2 w-fit mx-auto my-4"
                    >
                      Link zum Produkt →
                    </a>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>

      <!-- DEBUG -->
      <!-- <pre class="text-white">{{ technologyData }}</pre> -->
      <!-- <pre>{{ categoryData }}</pre> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const { data } = await useKql({
  query: 'page("technology")',
  select: {
    title: true,
  },
})

const page = data.value?.result

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
        link: true,
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

const technologies = ref(null)
const hoveredIndex = ref(null)

function scrollToTechnology(index) {
  technologies.value[index].scrollIntoView({
    behavior: 'smooth',
  })
}

onMounted(() => {
  for (const tech of technologyData.value?.result.technologies ?? []) {
    tech.showDevices = false
  }
})
</script>

<style scoped>
.category-list {
  position: sticky;
  top: 9rem;
  height: 100vh;
  overflow-y: auto;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(0);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(10px);
}

.rotate-180 {
  rotate: 180deg;
}

li:hover {
  background-color: var(--color-primary);
  color: white;
}

li svg {
  transition: all 0.3s ease;
}
</style>
