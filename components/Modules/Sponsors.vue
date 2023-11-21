<template>
  <div class="bg-black p-4">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-headline mb-6 px-32 pt-32 max-w-xl">
        Gefördert durch
      </h1>
    </div>

    <!-- First Grid for the first two logos -->
    <div
      class="grid grid-cols-2 gap-32 mx-auto max-w-[1720px] py-20 grid-override px-32"
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
            class="h-64 object-contain mx-auto py-4"
          />
        </a>
      </div>
    </div>

    <!-- Second Grid for the remaining logos -->
    <div
      class="grid grid-cols-4 md:grid-cols-4 gap-32 mx-auto max-w-[1720px] py-20 px-16"
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
            class="h-64 object-contain mx-auto py-4"
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
  grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
}
@media (min-width: 640px) {
  .grid-override {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}
</style>
