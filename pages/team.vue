<template>
  <div>
    <div
      v-if="page.modules && page.modules.length > 0"
      class="app-hero-wrapper"
    >
      <AppHero
        v-for="(module, index) in page.modules"
        :key="index"
        :title="module.title"
        :description="module.description"
        :intro_text="module.intro_text"
        :background-color="module.backgroundColor"
        :foreground-color="module.foregroundColor"
        :image="module.image"
      />
    </div>
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
    <!-- Debug text -->
    <pre>{{ page }}</pre>
  </div>
</template>

<script setup lang="ts">
const { data } = await useKql({
  query: `page("/team")`,
  select: {
    title: true,
    description: true,
    modules: {
      // New modules field
      query: 'page.children.children',
      select: {
        id: true,
        title: true,
        description: true,
        intro_text: true,
        backgroundColor: true,
        foregroundColor: true,
        image: true,
      },
    },
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
const page = data.value?.result
setPage(page)
</script>

<style scoped>
.team-member img {
  width: 100%;
  height: 100%;
}
</style>
