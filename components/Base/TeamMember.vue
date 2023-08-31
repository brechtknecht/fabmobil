<template>
  <div class="team-member flex flex-col justify-between">
    <div
      class="aspect-w-1 aspect-h-1 mb-4 relative flex flex-col h-full justify-between"
    >
      <p class="font-body text-body font-bold text-center pt-4">
        {{ member.jobtitle }}
        <!-- <span><br />{{ member.category }}</span> -->
      </p>
      <div class="image-wrapper">
        <img
          v-if="member.image?.url"
          :src="member.image.url"
          :alt="member.name"
          class="object-cover"
        />
      </div>
      <div
        class="info-overlay text-center px-8 text-green rounded-md"
        @mouseover="showInfo = true"
        @mouseleave="showInfo = false"
      >
        <div v-if="showInfo" class="info-details overflow-visible">
          <p
            v-if="member.description"
            class="font-callout text-body text-purple"
          >
            <span>{{ member.description }}</span>
          </p>
          <p v-if="member.contact === 'true'" class="font-body text-body">
            <a :href="'mailto:' + member.email">{{ member.email }}</a>
          </p>
          <p v-if="member.website" class="font-body text-body">
            <a :href="member.website">{{ member.website }}</a>
          </p>
          <p v-if="member.contact === 'true'" class="font-body text-body">
            <a :href="'tel:' + member.phone">{{ member.phone }}</a>
          </p>
        </div>
      </div>
      <p class="font-body text-body font-bold text-center pt-4">
        {{ member.name }} <span> {{ member.pronoun }}</span>
        <!-- <span><br />{{ member.category }}</span> -->
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

const showInfo = ref(false)

const props = defineProps<{
  member: {
    name: string
    description: string
    jobtitle: string
    pronoun: string
    category: string
    email: string
    website: string
    phone: string
    contact: boolean
    image: { url: string }
  }
}>()
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
  opacity: 0.2;
  transition: opacity 0.3s;
  cursor: pointer;
  backdrop-filter: blur(4px) brightness(10%); /* Removed quotes around blur(5px) */
}

.info-overlay:hover {
  opacity: 1;
}
</style>
