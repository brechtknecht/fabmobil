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
    <div class="bg-secondary">
      <div
        class="team-members grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-primary container mx-auto"
      >
        <div
          v-for="(member, index) in team"
          :key="index"
          class="team-member flex flex-col justify-between"
        >
          <div
            class="aspect-w-1 aspect-h-1 mb-4 relative flex flex-col h-full justify-between"
          >
            <div class="image-wrapper">
              <img
                v-if="member.image?.url"
                :src="member.image.url"
                :alt="member.name"
                class="object-cover"
              />
            </div>
            <div
              class="info-overlay"
              :style="{
                backdropFilter: 'blur(5px)',
              }"
              @mouseover="showInfo[index] = true"
              @mouseleave="showInfo[index] = false"
            >
              <div v-if="showInfo[index]" class="info-details">
                <p class="font-body text-body">{{ member.description }}</p>
                <p v-if="member.contact == 'true'" class="font-body text-body">
                  Email:
                  <a :href="'mailto:' + member.email">{{ member.email }}</a>
                </p>
                <p v-if="member.contact == 'true'" class="font-body text-body">
                  Phone: <a :href="'tel:' + member.phone">{{ member.phone }}</a>
                </p>
              </div>
            </div>
            <p class="font-body text-body font-bold">
              {{ member.name }} <span> {{ member.pronoun }}</span
              ><span
                ><br />
                {{ member.category }}</span
              >
            </p>
          </div>
        </div>
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
