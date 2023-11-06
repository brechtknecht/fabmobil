<template>
  <div class="grid-content bg-black">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mx-auto justify-center max-w-[1720px] space-x-16"
    >
      <a
        v-for="(sponsor, index) in sponsors"
        :key="index"
        :href="sponsor.url"
        target="_blank"
        class="sponsor flex justify-center items-center"
      >
        <img
          :src="sponsor.image.url"
          alt="Sponsor logo"
          class="py-4 w-full h-full"
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
