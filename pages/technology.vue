<template>
  <section class="bg-secondary">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full my-4">
      <div>
        <div class="flex flex-row pb-32">
          <div class="category-list sticky top-0 max-w-sm hidden md:block">
            <h1
              class="font-headline text-primary text-large-title font-bold leading-tight py-4"
            >
              {{ page.title }}
            </h1>
            <ul class="pr-8 w-full">
              <h2
                class="text-lg text-white border border-white rounded-md px-4 my-2"
              >
                Hardware
              </h2>
              <BaseAnimatedNuxtLink
                v-for="(
                  category, index
                ) in categoryData?.result.categories.slice(0, 12)"
                :key="index"
                class="category-item font-body text-title-3 text-white cursor-pointer flex justify-between items-center hover:bg-primary hover:text-black transition-colors duration-300 px-4 py-2 my-1 w-full"
                :title-a="category.name"
                :title-b="category.name"
                font-a-color="text-black"
                font-b-color="text-black"
                border-radius="rounded-lg"
                hover-bg-color="hover:bg-green-500"
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
              </BaseAnimatedNuxtLink>
              <h2
                class="text-lg text-white border border-white rounded-md px-4 my-2"
              >
                Software
              </h2>
              <BaseAnimatedNuxtLink
                v-for="(
                  category, index
                ) in categoryData?.result.categories.slice(12)"
                :key="index"
                class="category-item font-body text-title-3 text-white cursor-pointer flex justify-between items-center hover:bg-primary hover:text-black transition-colors duration-300 px-4 py-2 my-1 w-full"
                :title-a="category.name"
                :title-b="category.name"
                font-a-color="text-black"
                font-b-color="text-black"
                border-radius="rounded-lg"
                hover-bg-color="hover:bg-green-500"
                @click="scrollToTechnology(index, 12)"
                @mouseover="hoveredIndex = index + 12"
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
              </BaseAnimatedNuxtLink>
            </ul>
          </div>

          <div class="tech-grid w-full pt-16">
            <div
              v-for="(tech, index) in technologyData?.result.technologies"
              :key="index"
              ref="technologies"
              class="tech-item border-b border-white border-opacity-30 py-8"
            >
              <div class="flex flex-col md:flex-row">
                <div
                  class="left-side w-full md:w-1/2 flex justify-center items-center"
                >
                  <img
                    :src="tech.image?.url"
                    :alt="tech.name"
                    style="max-width: 32rem"
                    class="object-contain p-12"
                  />
                </div>

                <div class="right-side w-full md:w-1/2 h-auto flex flex-col">
                  <h2
                    class="font-headline text-primary text-large-title px-8 md:px-0"
                  >
                    {{ tech.name }}
                  </h2>
                  <KirbyBlocks
                    :blocks="tech.description ?? []"
                    class="note text text-primary"
                  />

                  <div
                    v-for="(link, linkIndex) in tech.links"
                    :key="linkIndex"
                    class="py-4"
                  >
                    <a
                      v-if="link.url"
                      :href="link.url"
                      target="_blank"
                      class="text-white border border-white rounded p-2 w-fit mx-auto my-4"
                    >
                      {{ link.linkname || 'Link zum Produkt' }} →
                    </a>
                  </div>

                  <button
                    v-if="tech.devices.length > 0"
                    class="text-accent rounded-md flex flex-row mt-4 mb-8 px-8 md:px-0"
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
                    <div
                      v-for="(link, linkIndex) in device.links"
                      :key="linkIndex"
                      class="mx-auto py-4"
                    >
                      <a
                        v-if="link.url"
                        :href="link.url"
                        target="_blank"
                        class="text-white border border-white rounded p-2 w-fit mx-auto my-4"
                      >
                        {{ link.linkname || 'Link zum Produkt' }} →
                      </a>
                    </div>
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
    type: true,
    technologies: {
      query: 'page.technologies.toStructure',
      select: {
        name: true,
        description: 'structureItem.description.toBlocks',
        links: 'structureItem.links.toStructure',
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
            links: 'structureItem.links.toStructure',
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

function scrollToTechnology(index, offset = 0) {
  technologies.value[index + offset].scrollIntoView({
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
  top: 6rem;
  height: calc(100vh - 6rem);
  padding-top: 4rem;
  padding-bottom: 4rem;
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
