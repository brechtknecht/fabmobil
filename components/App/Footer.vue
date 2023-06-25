<script setup lang="ts">
const site = useSite()
const listedChildren = computed(() =>
  (site.value?.children ?? []).filter((i) => i.isListed)
)
</script>

<template>
  <footer class="footer bg-secondary py-24">
    <div
      class="flex flex-col justify-start gap-16 relative w-full min-h-80 items-center px-4 sm:px-6 md:px-8 lg:px-10"
    >
      <div
        class="flex flex-col sm:flex-row justify-start gap-px relative w-full sm:w-5/6 items-center"
      >
        <NuxtLink to="/" class="logo flex-shrink-0 flex items-center">
          <img src="/assets/img/logo.svg" :alt="site.title" />
        </NuxtLink>
        <div
          class="text-lg font-sans font-bold text-accent justify-start mr-40 relative w-1/3 h-full"
        >
          Dann abonniere unser
          <div class="text-lg font-medium text-accent contents">Fabo-Abo</div>
          <div class="text-lg font-sans font-bold text-accent contents">
            , um keine <br />
            Aktionen und News zu verpassen!
          </div>
        </div>
        <div
          class="flex flex-col justify-start mr-5 relative w-1/6 min-h-10 items-center py-2 rounded-lg"
        >
          <input
            class="text-center text-lg font-sans font-bold text-secondary relative w-full h-full bg-primary rounded-lg"
            type="email"
            placeholder="Gib Fabo-Abo!"
          />
        </div>
        <div
          class="flex flex-col justify-start relative w-1/6 min-h-10 items-center py-2 rounded-lg bg-accent"
        >
          <button
            class="text-center text-lg font-sans font-bold text-secondary relative w-full h-full"
          >
            Gib Fabo-Abo!
          </button>
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 justify-start mb-6 gap-16 relative w-full sm:w-5/6 items-center"
    >
      <div
        class="text-center text-xl font-body text-primary relative w-full h-full"
      >
        TOURPLAN
      </div>
      <div
        class="text-center text-xl font-body text-primary relative w-full h-full"
      >
        AUSSTATTUNG
      </div>
      <div
        class="text-center text-xl font-body text-primary relative w-full h-full"
      >
        MEDIA
      </div>
      <div
        class="text-center text-xl font-body text-primary relative w-full h-full"
      >
        KONTAKT
      </div>
      <div
        class="text-center text-xl font-body text-primary relative w-full h-full"
      >
        BUCHUNG
      </div>
      <div
        class="text-center text-xl font-body text-primary relative w-full h-full"
      >
        LOKALLABORE
      </div>
    </div>
    <div
      class="flex flex-col sm:flex-row justify-between relative w-full sm:w-5/6 items-center"
    >
      <div
        class="text-justify text-xl font-body text-purple relative w-full sm:w-1/6 h-full mb-4 sm:mb-0"
      >
        CODE OF CONDUCT
      </div>
      <div
        class="text-center sm:text-right text-xl font-body text-primary relative w-full sm:w-1/5 h-full"
      >
        IMPRESSUM & DATENSCHUTZ
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 9rem 0 6rem;
  line-height: 1.5em;
}
.footer:before {
  content: '';
  display: block;
  width: 1.5rem;
  height: 2px;
  background: var(--color-black);
  margin-bottom: 1.5rem;
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
.footer a:hover {
  color: var(--color-text);
}
</style>
