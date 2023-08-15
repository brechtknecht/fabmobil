<script setup>
const site = useSite()
const listedChildren = computed(() =>
  (site.value?.children ?? []).filter((i) => i.isListed)
)
</script>

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
          Dann abonniere unser
          <div class="text-lg font-headline text-headline contents">
            Fabo-Abo
          </div>
          <div class="text-lg font-sans font-bold text-accent contents">
            , um keine Aktionen und News zu verpassen!
          </div>
        </div>
        <div class="flex flex-col sm:flex-row w-full sm:w-fit items-center">
          <div
            class="flex flex-col justify-start mr-2 relative w-full min-h-12 items-center py-2 rounded-lg"
          >
            <input
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
            >
              Gib Fabo-Abo!
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
        ÜBER UNS
      </div>
      <div
        class="text-center text-xl font-body text-primary relative w-full h-full"
      >
        AUSSTATTUNG
      </div>
      <div
        class="text-center text-xl font-body text-primary relative w-full h-full"
      >
        LEHREN & LERNEN
      </div>
      <div
        class="text-center text-xl font-body text-primary relative w-full h-full"
      >
        TOURPLAN
      </div>
      <div
        class="text-center text-xl font-body text-primary relative w-full h-full"
      >
        TEAM & KONTAKT
      </div>
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-start mb-6 gap-16 relative w-full sm:w-full items-center py-4 px-8"
    >
      <div
        class="text-center text-xl font-body text-slate-500 relative w-full h-full"
      >
        FAQs
      </div>
      <div
        class="text-center text-xl font-body text-slate-500 relative w-full h-full"
      >
        CODE OF CONDUCT
      </div>
      <div
        class="text-center text-xl font-body text-slate-500 relative w-full h-full"
      >
        IMPRESSUM & DATENSCHUTZ
      </div>
      <div
        class="text-center text-xl font-body text-slate-500 relative w-full h-full"
      >
        LOKALLABORE
      </div>
      <div
        class="text-center text-xl font-body text-accent text-medium relative w-full h-full"
      >
        UNTERSTÜTZE UNS
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style scoped>
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
.footer a:hover {
  color: var(--color-text);
}
</style>
