<template>
  <header
    class="bg-[#DDBBFC] fixed top-0 w-full z-50 h-20 flex items-center justify-between px-4 py-0 md:py-12 sm:px-6 lg:px-8"
    :class="{ 'scrolled-up': isScrolledUp, 'scrolled-down': isScrolledDown }"
  >
    <NuxtLink to="/" class="flex-shrink-0 items-center sm:inline-block hidden">
      <img
        class="h-8 xl:h-12 sm:inline-block hidden"
        src="/assets/img/logo.svg"
        :alt="site.title"
      />
    </NuxtLink>
    <NuxtLink to="/" class="flex-shrink-0 items-center sm:hidden inline-block">
      <img
        class="h-8 xl:h-12"
        src="/assets/img/shortlogo.svg"
        :alt="site.title"
      />
    </NuxtLink>

    <div
      class="hidden header-breakpoint:ml-4 header-breakpoint:flex xl:items-center header-breakpoint:space-x-12"
    >
      <BaseAnimatedNuxtLink
        v-for="item in listedChildren"
        :key="item.id"
        :to="`/${item.id}`"
        :title-a="item.title.replace(/ /g, '\u00A0')"
        :title-b="item.title.replace(/ /g, '\u00A0')"
        :aria-current="
          route.path.startsWith(`/${item.id}`) ? 'page' : undefined
        "
      />
    </div>
    <div class="flex gap-8">
      <div class="hidden sm:ml-8 sm:flex sm:items-center sm:space-x-12">
        <BaseAnimatedNuxtLink
          to="#"
          :title-a="'Anfragen'.replace(/ /g, '\u00A0')"
          :title-b="'Anfragen'.replace(/ /g, '\u00A0')"
          :aria-current="
            route.path.startsWith('/your-desired-path') ? 'page' : undefined
          "
          @click="openModal"
        >
          Anfragen
        </BaseAnimatedNuxtLink>
        <NuxtLink
          to="https://www.instagram.com/fabmobil/"
          class="logo flex-shrink-0 flex items-center"
          target="_blank"
        >
          <img class="h-8" src="/assets/img/insta-icon.svg" alt="Instagram" />
        </NuxtLink>
      </div>

      <div class="-mr-2 flex items-center header-breakpoint:hidden">
        <button
          class="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          @click="open = !open"
        >
          <span class="sr-only">Open main menu</span>
          <!-- Icon when menu is closed. -->
          <svg
            v-if="!open"
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <!-- Icon when menu is open. -->
          <svg
            v-else
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="open"
      class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right header-breakpoint z-50"
    >
      <div
        class="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
      >
        <div class="px-5 pt-4 flex items-center justify-between">
          <div>
            <img class="h-8 w-auto" src="/assets/img/logo.svg" alt="Logo" />
          </div>
          <div class="-mr-2">
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-gray hover:text-white hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              @click="open = !open"
            >
              <span class="sr-only">Close menu</span>
              <!-- Icon when menu is open. -->
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
            v-for="item in listedChildren"
            :key="item.id"
            :to="`/${item.id}`"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-accent"
            :aria-current="
              route.path.startsWith(`/${item.id}`) ? 'page' : undefined
            "
          >
            {{ item.title }}
          </NuxtLink>

          <!-- <Button
            to="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-accent"
            @click="openModal"
          >
            Anfragen
          </Button> -->
        </div>
      </div>
    </div>
  </header>
  <!-- Spacer to prevent content jump when header becomes fixed -->
  <div class="h-16 md:h-20"></div>
  <!-- Remaining content of the page goes here -->
  <BaseBreadcrumb />
  <ModalsContact v-model:is-modal-open="isModalOpen" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSite } from '~/composables/site'

const route = useRoute()
const site = useSite()

const open = ref(false)
const isScrolledUp = ref(false)
const isScrolledDown = ref(false)
const lastScrollPosition = ref(0)
const isModalOpen = ref(false)

const listedChildren = computed(() =>
  (site.value?.children ?? []).filter(
    (i) =>
      i.isListed && !['faq', 'impress', 'coc', 'codeofconduct'].includes(i.id)
  )
)

const openModal = () => {
  isModalOpen.value = true
}

onMounted(() => {
  const checkScroll = () => {
    const currentScrollPosition = window.pageYOffset
    const threshold = 100 // Set your desired threshold here

    if (currentScrollPosition < threshold) {
      // If we're within the threshold from the top, always show the navbar
      isScrolledDown.value = false
      isScrolledUp.value = true
    } else if (
      currentScrollPosition > 50 &&
      lastScrollPosition.value <= currentScrollPosition
    ) {
      // Otherwise, hide or show the navbar based on scroll direction
      isScrolledDown.value = true
      isScrolledUp.value = false
    } else if (
      isScrolledDown.value &&
      currentScrollPosition + 10 < lastScrollPosition.value
    ) {
      isScrolledDown.value = false
      isScrolledUp.value = true
    }

    lastScrollPosition.value = currentScrollPosition
  }

  window.addEventListener('scroll', checkScroll)

  onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll)
  })

  // Close the mobile navigation when route changes
  watch(route, () => {
    open.value = false
  })
})
</script>

<style scoped>
.scrolled-down {
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;
}
.scrolled-up {
  transform: translateY(0);
  transition: transform 0.3s ease-in-out;
}
</style>
