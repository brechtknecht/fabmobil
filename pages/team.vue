<template>
  <div>
    <h1 class="font-headline text-large-title font-bold">{{ title }}</h1>
    <p class="font-body text-body">{{ description }}</p>

    <div
      class="team-members grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div
        v-for="(member, index) in team"
        :key="index"
        class="team-member flex flex-col justify-between"
      >
        <div class="aspect-w-1 aspect-h-1 mb-4">
          <img
            v-if="member.image?.url"
            :src="member.image.url"
            :alt="member.name"
            class="object-cover"
          />
        </div>
        <div>
          <p class="font-body text-body font-bold">{{ member.name }}</p>
          <p class="font-body text-body">{{ member.description }}</p>
          <p class="font-body text-body">
            Email: <a :href="'mailto:' + member.email">{{ member.email }}</a>
          </p>
          <p class="font-body text-body">
            Phone: <a :href="'tel:' + member.phone">{{ member.phone }}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useKql({
  query: `page("/team")`,
  select: {
    title: true,
    description: true,
    team: {
      query: 'page.children',
      select: {
        name: true,
        description: true,
        email: true,
        phone: true,
        contact: true,
        image: {
          query: 'page.image',
          select: {
            url: true,
          },
        },
      },
    },
  },
})

// @ts-ignore
const { title, description, team } = data.value.result
</script>

<style scoped>
.team-member img {
  width: 100%;
  height: 100%;
}
</style>
