<template>
  <nav
    v-if="breadcrumbs.length > 0"
    aria-label="breadcrumb"
    class="bg-secondary py-4 pb-4 md:py-2 drop-shadow-2"
  >
    <ol
      class="breadcrumb w-full px-4 sm:px-12 flex flex-col sm:flex-row mx-auto"
    >
      <li
        v-for="(route, index) in breadcrumbs"
        :key="index"
        class="breadcrumb-item text-primary weight-regular text-body font-medium"
      >
        <router-link v-if="index !== breadcrumbs.length - 1" :to="route.path">{{
          translate(route.name)
        }}</router-link>
        <span v-else>{{ translate(route.name) }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const breadcrumbDepth = ref(2)

const translate = (name) => {
  const dictionary = {
    Home: 'Startseite',
    About: 'Über uns',
    Contact: 'Kontakt',
    // Add your translations here
  }

  return dictionary[name] || name
}

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(Boolean)

  if (pathArray.length !== breadcrumbDepth.value) return []

  const breadcrumbs = pathArray.reduce((breadcrumbArray, path, i) => {
    return [
      ...breadcrumbArray,
      {
        path: '/' + (i !== 0 ? breadcrumbArray[i - 1].path : '') + '/' + path,
        name: path
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
      },
    ]
  }, [])

  return breadcrumbs
})
</script>

<style scoped>
/* Add your styles here */
.breadcrumb {
  background: none;
  position: sticky;
  top: 250px;
  margin-top: 1rem;
}

.breadcrumb-item {
  display: inline-block;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: '→';
  padding: 0 8px; /* Adjust spacing as needed */
}

.breadcrumb-item a {
  color: inherit;
}

.drop-shadow-2 {
  box-shadow: 0px 0px 0.5px 0px rgba(0, 0, 0, 0.18),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 3px 8px 0px rgba(0, 0, 0, 0.1);
}
</style>
