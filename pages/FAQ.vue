<template>
  <div class="section bg-black text-white">
    <div class="container mx-auto p-8">
      <h1 class="text-4xl font-bold mb-6">FAQ</h1>
      <div
        v-for="item in page.faqs"
        :key="item.question"
        class="faq-item border-b border-gray-600 mb-4 last:border-b-0"
      >
        <div class="cursor-pointer py-2" @click="toggle(item)">
          <div class="text-xl font-semibold">{{ item.question }}</div>
          <div class="text-sm text-gray-400">Click to expand</div>
        </div>
        <div v-if="item.showAnswer" class="text-base py-2">
          {{ item.answer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggle(item) {
      item.showAnswer = !item.showAnswer
    },
  },
}
</script>

<script setup>
const { data } = await useKql({
  query: `page("${useRoute().path}")`,
  select: {
    id: true,
    title: true,
    faqs: {
      query: 'page.faqs.toStructure',
      select: {
        question: true,
        answer: true,
      },
    },
  },
})

console.log(data)

// Set the current page data for the global page context
const page = data.value?.result
setPage(page)
</script>

<style scoped>
.faq-item:last-child {
  border-bottom: none;
}
</style>
