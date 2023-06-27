<script setup lang="ts">
import { tutorialsQuery } from '~/material'

const route = useRoute()
const { data } = await useKql(tutorialsQuery)

// Set the current page data for the global page context
const page = data.value?.result
setPage(page)

const tag = computed(() => route.query.tag as string)

// Filter page children by tags
const tutorials = computed(() =>
  (page?.children ?? []).filter((i: any) =>
    tag.value ? i.tags?.includes(tag.value) : true
  )
)
</script>

<template>
  <section class="bg-secondary">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="text-primary">test</div>
    </div>
  </section>
</template>
