<template>
  <div class="bg-black p-4">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-headline mb-6 px-32 pt-32 max-w-xl">
        Gefördert durch
      </h1>
    </div>
    <div
      class="flex flex-wrap justify-center gap-32 mx-auto max-w-[1720px] py-20"
    >
      <a
        v-for="(sponsor, index) in sponsors"
        :key="index"
        :href="sponsor.url"
        target="_blank"
        class="flex-none w-full sm:w-full md:w-1/2 lg:w-1/3 flex justify-center items-center"
      >
        <img
          :src="sponsor.image.url"
          alt="Sponsor logo"
          class="h-64 object-contain mx-auto py-4"
        />
      </a>
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
}
</script>
