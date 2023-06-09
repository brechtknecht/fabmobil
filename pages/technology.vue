<template>
  <div v-if="data">
    <h1 class="font-headline text-large-title font-bold">{{ title }}</h1>
    <p class="font-body text-body">{{ description }}</p>

    <div class="team-members">
      <div
        v-for="(technology, index) in technologies"
        :key="index"
        class="team-member"
      >
        <p class="font-body text-body font-bold">{{ technology.name }}</p>
        <p class="font-body text-body">{{ technology.category }}</p>
        <p class="font-body text-body">
          Link: <a :href="technology.link">{{ technology.link }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useKql({
  query: `page("/technology")`,
  select: {
    title: true,
    description: true,
    technologies: {
      query: 'page.technologies.toStructure',
      select: {
        name: true,
        category: true,
        link: true,
      },
    },
  },
})

// @ts-ignore
const { title, description, technologies } = data.value.result
</script>

<style scoped>
.team-members {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.team-member {
  flex: 0 1 calc(25% - 2rem);
}

.team-member img {
  width: 100%;
  height: auto;
}
</style>
