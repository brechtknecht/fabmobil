<template>
  <div>
    <h1 class="font-headline text-large-title font-bold">{{ title }}</h1>
    <p class="font-body text-body">{{ description }}</p>

    <div class="team-members">
      <div v-for="(member, index) in team" :key="index" class="team-member">
        <img
          v-if="member.image?.url"
          :src="member.image.url"
          :alt="member.name"
        />
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
