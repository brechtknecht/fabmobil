<template>
  <div class="bg-black p-4">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-headline mb-6 px-32 pt-32 max-w-xl">
        Gefördert durch
      </h1>
    </div>

    <!-- First Grid for the first two logos -->
    <div
      class="grid grid-cols-4 gap-32 mx-auto max-w-[1720px] py-2 grid-override md:px-[100px] lg:px-[10%] xl:px-[25%] 2xl:px-[400px]"
    >
      <div
        v-for="(sponsor, index) in firstRowSponsors"
        :key="index"
        class="flex justify-center items-center"
      >
        <a :href="sponsor.url" target="_blank">
          <img
            :src="sponsor.image.url"
            alt="Sponsor logo"
            class="h-64 object-contain mx-auto"
          />
        </a>
      </div>
    </div>

    <!-- Second Grid for the remaining logos -->
    <div
      class="grid grid-cols-4 md:grid-cols-4 gap-32 mx-auto max-w-[1720px] py-2 px-16 pb-12"
    >
      <div
        v-for="(sponsor, index) in secondRowSponsors"
        :key="index"
        class="flex justify-center items-center"
      >
        <a :href="sponsor.url" target="_blank">
          <img
            :src="sponsor.image.url"
            alt="Sponsor logo"
            class="h-64 object-contain mx-auto"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sponsors: {
      type: Array,
      required: true,
    },
  },
  computed: {
    firstRowSponsors() {
      return this.sponsors.slice(0, 2)
    },
    secondRowSponsors() {
      return this.sponsors.slice(2)
    },
  },
}
</script>

<style lang="scss">
.grid-override {
  grid-template-columns: repeat(1, minmax(0, 1fr));
  & > div {
    padding: 0 2rem;
  }
}
@media (min-width: 768px) {
  .grid-override {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}
</style>
