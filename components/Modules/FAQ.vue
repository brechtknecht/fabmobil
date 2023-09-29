<template>
  <div class="section section-faq bg-black text-black">
    <div class="container mx-auto p-8">
      <h1 class="text-4xl font-bold mb-6">Häufig gestellte Fragen</h1>
      <div
        v-for="item in page.faqs.slice(0, displayLimit)"
        :key="item.question"
        class="faq-item border-b border-gray-600 mb-4 last:border-b-0"
      >
        <div
          class="cursor-pointer py-2 flex justify-between"
          @click="toggle(item)"
        >
          <div class="text-xl font-semibold">{{ item.question }}</div>
          <div v-if="!item.showAnswer" class="text-sm text-gray-700">
            &#8594;
            <!-- Unicode for right arrow -->
          </div>
          <div v-else class="text-sm text-gray-700">
            &#10005;
            <!-- Unicode for "x" symbol -->
          </div>
        </div>
        <div v-if="item.showAnswer" class="text-lg py-2">
          {{ item.answer }}
        </div>
      </div>
      <router-link
        v-if="page.faqs.length > displayLimit"
        to="/faq"
        class="text-base py-2 text-center w-full flex justify-center align-center"
      >
        Alle Anzeigen
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayLimit: 7,
    }
  },
  computed: {
    limitedFaqs() {
      return this.faqs.slice(0, this.displayLimit)
    },
  },
  methods: {
    toggle(item) {
      item.showAnswer = !item.showAnswer
    },
  },
}
</script>

<script setup>
const { data } = await useKql({
  query: `page("faq")`,
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
</script>

<style scoped>
.faq-item:last-child {
  border-bottom: none;
}

.section-faq {
  background: url('/assets/img/frontpage/faqbackground.png');
  background-size: 200% auto;
  background-position: center center;
  transition: all 450ms ease-out;
}
</style>
