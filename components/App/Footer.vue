<template>
  <footer class="footer bg-secondary py-24 border-t border-white">
    <div
      class="flex flex-col justify-start gap-16 relative w-full min-h-80 items-center px-4 sm:px-6 md:px-8 lg:px-10"
    >
      <div
        class="flex flex-col sm:flex-row gap-px relative w-full items-cente justify-between items-center"
      >
        <NuxtLink to="/" class="logo flex-shrink-0 flex items-center">
          <img
            src="/assets/img/logo-light.svg"
            class="h-12"
            :alt="site.title"
          />
        </NuxtLink>
        <div
          class="text-lg font-sans font-bold text-accent justify-start relative sm:w-1/3 w-full h-full pb-8 sm:pb-0"
        >
          Du willst auf dem Laufenden bleiben und nichts mehr vom Fabmobil
          verpassen?
          <div class="text-lg font-sans font-bold text-accent contents">
            Dann abonniere unseren.
          </div>
          <div class="text-lg font-headline text-headline contents">
            Newsletter
          </div>
        </div>
        <div class="flex flex-col sm:flex-row w-full sm:w-fit items-center">
          <div
            class="flex flex-col justify-start mr-2 relative w-full min-h-12 items-center py-2 rounded-lg"
          >
            <input
              v-model="email"
              class="text-center text-lg font-sans font-bold text-secondary relative w-full bg-primary rounded-lg min-h-12 h-12"
              type="email"
              placeholder="E-Mail"
            />
          </div>
          <div
            class="flex flex-col justify-start relative w-full max-h-12 h-12 items-center py-2 rounded-lg bg-accent"
          >
            <button
              class="text-center text-lg font-sans font-bold text-secondary relative w-full h-full min-h-10"
              @click="subscribe"
            >
              Abonieren!
            </button>
          </div>
          <img
            class="w-20 pb-4 -rotate-90 scale-50"
            src="/assets/img/components/arrow-right.svg"
            @click="scrollToTop()"
          />
        </div>
      </div>
      <hr class="h-px my-8 bg-white border border-white w-full" />
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-start mb-6 gap-16 relative w-full sm:w-full items-center mx-auto py-4 px-8"
    >
      <div
        class="text-center text-xl font-body text-primary relative w-full h-full"
      >
        <NuxtLink to="/about" class="footer-link-dark">ÜBER UNS</NuxtLink>
      </div>
      <div
        class="text-center text-xl font-body text-primary relative w-full h-full"
      >
        <NuxtLink to="/technology" class="footer-link-dark"
          >AUSSTATTUNG</NuxtLink
        >
      </div>
      <div
        class="text-center text-xl font-body text-primary relative w-full h-full"
      >
        <NuxtLink to="/tutorials" class="footer-link-dark"
          >LEHREN & LERNEN</NuxtLink
        >
      </div>
      <div
        class="text-center text-xl font-body text-primary relative w-full h-full"
      >
        <NuxtLink to="/tour" class="footer-link-dark">TOURPLAN</NuxtLink>
      </div>
      <div
        class="text-center text-xl font-body text-primary relative w-full h-ful"
      >
        <NuxtLink to="/team" class="footer-link-dark">TEAM & KONTAKT</NuxtLink>
      </div>
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-start mb-6 gap-16 relative w-full sm:w-full items-center py-4 px-8"
    >
      <div
        class="text-center text-xl font-body text-slate-500 relative w-full h-full hover:text-white"
      >
        <NuxtLink to="/faq" class="footer-link-dark">FAQs</NuxtLink>
      </div>
      <div
        class="text-center text-xl font-body text-slate-500 relative w-full h-full hover:text-white"
      >
        <NuxtLink to="/codeofconduct" class="footer-link-dark">COC</NuxtLink>
      </div>
      <div
        class="text-center text-xl font-body text-slate-500 relative w-full h-full hover:text-white"
      >
        <NuxtLink to="/impress" class="footer-link-dark"
          >IMPRESSUM & DATENSCHUTZ</NuxtLink
        >
      </div>
      <div
        class="text-center text-xl font-body text-slate-500 relative w-full h-full hover:text-white"
      >
        <NuxtLink
          to="https://lokallabore.de"
          target="_blank"
          class="footer-link-dark"
          >LOKALLABORE</NuxtLink
        >
      </div>
      <button
        class="text-center text-xl font-body text-accent text-medium relative w-full h-full"
        @click="openModal"
      >
        UNTERSTÜTZE UNS
      </button>
    </div>
  </footer>
  <ModalsSupport v-model:is-modal-open="isModalOpen" />
</template>

<script setup>
const site = useSite()
const listedChildren = computed(() =>
  (site.value?.children ?? []).filter((i) => i.isListed)
)

const isModalOpen = ref(false)

const openModal = () => {
  console.log('Open Modal')
  isModalOpen.value = true
}
</script>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    async subscribe() {
      if (!this.email) {
        alert('Please enter an email address.')
        return
      }

      try {
        const response = await axios.post('/.netlify/functions/subscribe', {
          email: this.email,
        })
        if (response.data.message === 'Subscribed successfully') {
          alert('Subscribed successfully')
          this.email = '' // Reset email after successful subscription
        }
      } catch (error) {
        console.error(error)
        alert('Subscription failed. Please try again.')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.footer-link-dark {
  &:hover {
    color: white;
  }
}

.footer-link-light {
  &:hover {
    color: white;
  }
}
.footer h2 {
  font-weight: 600;
  margin-bottom: 0.75rem;
}
.footer ul,
.footer p {
  color: var(--color-text-grey);
}
.footer p {
  max-width: 15rem;
}
</style>
