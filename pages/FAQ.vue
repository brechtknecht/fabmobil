<template>
  <div class="section bg-black text-white">
    <div class="container mx-auto py-8">
      <h1 class="text-4xl font-bold mb-6">FAQ</h1>
      <div
        v-for="item in faqs"
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
  data() {
    return {
      faqs: [
        {
          question: 'What is Vue.js?',
          answer:
            'Vue.js is a progressive JavaScript framework used to create user interfaces.',
          showAnswer: false,
        },
        {
          question: 'How to use Vue with Tailwind?',
          answer:
            'You can integrate Tailwind CSS with Vue by installing it via npm and configuring it in your project.',
          showAnswer: false,
        },
        {
          question: 'How to use Vue with Tailwind?',
          answer:
            'You can integrate Tailwind CSS with Vue by installing it via npm and configuring it in your project.',
          showAnswer: false,
        },
        {
          question: 'How to use Vue with Tailwind?',
          answer:
            'You can integrate Tailwind CSS with Vue by installing it via npm and configuring it in your project.',
          showAnswer: false,
        },
        // Add more questions and answers here
      ],
    }
  },
  methods: {
    toggle(item) {
      item.showAnswer = !item.showAnswer
    },
  },
}
</script>

<style scoped>
.faq-item:last-child {
  border-bottom: none;
}
</style>
