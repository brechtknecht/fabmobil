<script setup lang="ts">
import { tutorialsQuery } from '~/queries'

// Explicitly not using `computed` here
const page = usePage().value

const { data } = await useKql(tutorialsQuery)
const children = data.value?.result?.children
const pageIndex = children?.findIndex(({ id }: any) => id === page?.id)
</script>

<template>
  <nav class="blog-prevnext py-8">
    <h2 class="font-headline text-title-3 pb-4">Andere Materialien:</h2>

    <div class="autogrid" style="--gutter: 1.5rem">
      <AppNote
        v-if="pageIndex !== undefined && pageIndex > 0"
        :note="children[pageIndex - 1]"
        :excerpt="false"
      />
      <AppNote
        v-if="pageIndex !== undefined && pageIndex < children.length - 1"
        :note="children[pageIndex + 1]"
        :excerpt="false"
      />
    </div>
  </nav>
</template>
