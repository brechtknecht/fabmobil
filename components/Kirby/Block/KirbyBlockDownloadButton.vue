<template>
  <div class="flex flex-row gap-4">
    <a
      target="_blank"
      :href="fileData.url"
      class="button transform h-fit flexitems-start justify-items-start flex-col md:flex-row w-64 py-1.5 px-4 cursor-pointe border-2"
      :class="{
        'bg-black': props.block.content.dark == 'true',
        'bg-white': props.block.content.dark !== 'true',
      }"
    >
      <span
        v-if="props.block.content.dark == 'true'"
        class="text-paragraph text-large-title text-white leading-tight"
        >{{ props.block.content.text }}</span
      >
      <span
        v-else
        class="text-paragraph text-large-title text-black leading-tight"
        >{{ props.block.content.text }}</span
      >

      <img
        v-if="props.block.content.dark == 'true'"
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
import { ref, watch } from 'vue'
import type { KirbyBlock } from '#nuxt-kql'

const props = defineProps<{
  block: KirbyBlock<'downloadbutton'>
}>()

const { data } = await useKql({
  query: `file("${props.block.content.file}")`,
  select: {
    id: true,
    url: true,
  },
})

const fileData = ref(null)

// Watch for changes in data.value and update fileData accordingly
watch(
  () => data.value,
  (newValue) => {
    fileData.value = newValue?.result
  },
  { immediate: true }
)

console.log(fileData)
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
