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
    <div class="bg-secondary h-fit">
      <div class="h-[100vh] text-primary">
        <ModulesTourMap />
      </div>
    </div>
    <!-- Debug text -->
    <!-- <pre>{{ page }}</pre> -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
const showInfo = reactive({})
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
        pronoun: true,
        category: true,
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

const { title, description, team } = data.value.result
const page = data.value?.result
setPage(page)
</script>

<style scoped>
.info-overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.info-overlay:hover {
  opacity: 1;
}

.info-details {
  text-align: center;
  max-width: 80%;
}

.mask-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
