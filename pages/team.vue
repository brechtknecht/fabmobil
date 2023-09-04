<template>
  <div class="bg-secondary py-32">
    <!-- Hero modules -->
    <BaseFloatingImages
      :speed="speed"
      :scale="5"
      backgroundcolor="#1A1A1A"
      @update-speed="updateSpeed"
    >
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

      <div>
        <!-- Team Categories -->
        <div v-for="category in page.categories" :key="category.name">
          <div
            class="team-members grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-primary container mx-auto sm:px-8 mt-16"
          >
            <KirbyLayouts :layouts="category.layouts" />
          </div>
          <div
            class="team-members grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-primary container mx-auto px-16 sm:px-8"
          >
            <BaseTeamMember
              v-for="member in team.filter((m) => m.category === category.name)"
              :key="member.name"
              :member="member"
            />
          </div>
        </div>

        <!-- Unassigned Team Members -->
        <div
          class="team-members grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-primary container mx-auto sm:px-8"
        >
          <BaseTeamMember
            v-for="member in team.filter((m) => !m.category)"
            :key="member.name"
            :member="member"
          />
        </div>
      </div>
    </BaseFloatingImages>
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
    categories: {
      query: 'page.categories.toStructure',
      select: {
        name: true,
        layouts: {
          query: 'structureItem.layout.toLayouts',
          select: {
            content: 'layout',
            attrs: 'layout.attrs',
            image: {
              query: 'layout.attrs.image.toFile',
            },
          },
        },
      },
    },
    team: {
      query: 'page.team.toStructure', // Adjusted to reflect structure
      select: {
        name: true,
        description: true,
        jobtitle: true,
        pronoun: true,
        links: 'structureItem.links.toStructure',
        category: true,
        email: true,
        phone: true,
        contact: true,
        image: {
          query: 'structureItem.image.toFile', // Followed the pattern in technology.yml
          select: {
            url: true,
          },
        },
      },
    },
  },
})

const { title, description, team, categories } = data.value.result

const categorizedTeam = reactive({})
const unassignedTeam = ref([])

team.forEach((member) => {
  if (member.category) {
    if (!categorizedTeam[member.category]) {
      categorizedTeam[member.category] = []
    }
    categorizedTeam[member.category].push(member)
  } else {
    unassignedTeam.value.push(member)
  }
})

const page = data.value?.result
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
