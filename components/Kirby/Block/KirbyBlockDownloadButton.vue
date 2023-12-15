<template>
  <div class="flex flex-row gap-4">
    <a
      v-for="button in props.block.content.buttons"
      :key="button.text"
      :href="button.link"
      target="_blank"
      class="button transform rounded-md h-fit flexitems-start justify-items-start flex-col md:flex-row w-64 py-1.5 px-4 cursor-pointe"
      :class="{
        'bg-black': button.dark == 'true',
        'bg-white': button.dark !== 'true',
      }"
    >
      <span
        v-if="button.dark == 'true'"
        class="text-paragraph text-large-title text-white leading-tight"
        >{{ button.text }}</span
      >
      <span
        v-else
        class="text-paragraph text-large-title text-black leading-tight"
        >{{ button.text }}</span
      >

      <img
        v-if="button.dark == 'true'"
        class="w-20 pb-4 mt-24"
        src="/assets/img/components/arrow-right.svg"
      />
      <img
        v-else
        class="w-20 pb-4 mt-24"
        src="/assets/img/components/arrow-right-dark.svg"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { KirbyBlock } from '#nuxt-kql'

const props = defineProps<{
  block: KirbyBlock<'video'>
}>()
</script>

<style scoped>
a {
  text-decoration: none;
}

@media (min-width: 768px) {
  .button {
    transform: rotate(-30deg) skewX(-30deg) scale(0.864);
    transition: 200ms ease-out;
  }

  .button:hover {
    transform: rotate(0) skewX(0) scale(1);
  }
}
</style>
