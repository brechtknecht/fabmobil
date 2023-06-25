<template>
  <header
    class="bg-accent fixed top-0 w-full z-50 h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8"
  >
    <NuxtLink to="/" class="logo flex-shrink-0 flex items-center">
      <img src="/assets/img/logo.svg" :alt="site.title" />
    </NuxtLink>

    <div class="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
      <NuxtLink
        v-for="item in listedChildren"
        :key="item.id"
        :to="`/${item.id}`"
        class="text-sm font-medium text-white"
        :aria-current="
          route.path.startsWith(`/${item.id}`) ? 'page' : undefined
        "
      >
        {{ item.title }}
      </NuxtLink>
      <NuxtLink :to="`#`" class="text-sm font-medium text-white">
        Spenden
      </NuxtLink>
    </div>

    <div class="-mr-2 flex items-center sm:hidden">
      <button
        class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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

    <div
      v-if="open"
      class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right sm:hidden"
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
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
          <NuxtLink
            to="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-accent"
          >
            Spenden
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
  <!-- Spacer to prevent content jump when header becomes fixed -->
  <div class="h-16 md:h-20"></div>
  <!-- Remaining content of the page goes here -->
  <BaseBreadcrumb />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSite } from '~/composables/site'

const route = useRoute()
const site = useSite()

const open = ref(false)

const listedChildren = computed(() =>
  (site.value?.children ?? []).filter((i) => i.isListed)
)
</script>

<style scoped>
.header {
  position: fixed;
  margin: 0;
  width: 100vw;
  padding: 0.5rem 1.5rem;
}

.menu {
  display: flex;
}
.menu a {
  padding: 1rem;
  display: block;
}
.menu a[aria-current] {
  text-decoration: underline;
}
</style>
