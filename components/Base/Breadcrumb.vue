<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="(route, index) in breadcrumbs"
        :key="index"
        class="breadcrumb-item"
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
import { useRoute } from 'vue-router'

const route = useRoute()

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
  const pathArray = route.path.split('/')
  pathArray.shift()

  const breadcrumbs = pathArray.reduce((breadcrumbArray, path, i) => {
    return [
      ...breadcrumbArray,
      {
        path: (i !== 0 ? breadcrumbArray[i - 1].path : '') + '/' + path,
        name: path.charAt(0).toUpperCase() + path.slice(1),
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

.breadcrumb-item + .breadcrumb-item::before {
  content: '>';
}

.breadcrumb-item a {
  color: inherit;
}
</style>
