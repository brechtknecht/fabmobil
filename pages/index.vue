<script setup>
const { data } = await useKql({
  query: 'page("home")',
  select: {
    id: true,
    title: true,
    sponsors: {
      query: 'page.sponsors.toStructure',
      select: {
        linkName: true,
        url: true,
        image: {
          query: 'structureItem.image.toFile', // Followed the pattern in technology.yml
          select: {
            url: true,
          },
        },
      },
    },

    imageslider: {
      query: 'page.imageslider.toStructure',
      select: {
        image: {
          query: 'structureItem.image.toFile', // Followed the pattern in technology.yml
          select: {
            url: true,
          },
        },
      },
    },
  },
})

console.log('DATAH:', data.value?.result.imageslider)

const isFirefoxUser = ref(false)

onMounted(() => {
  isFirefoxUser.value = navigator.userAgent.toLowerCase().includes('firefox')
})
// Set the current page data for the global page context
const page = data.value?.result
setPage(page)
</script>

<template>
  <div class="bg-[#DDBBFC] py-4">
    <BaseFloatingImages :speed="0.1" :scale="6" :backgroundcolor="'#DDBBFC'">
      <div
        class="px-0 pb-0 3xl:px-24 3xl:pb-[19em] 3xl:pt-12 max-w-screen-2xl mx-auto"
      >
        <BaseVideo
          url="https://player.vimeo.com/video/746553056?autoplay=1&loop=1&muted=1"
        />
      </div>
      <!--...and so on...-->

      <ModulesIntro />
    </BaseFloatingImages>
    <LazyClientOnly v-if="!isFirefoxUser"
      ><ModulesBusAnimation
    /></LazyClientOnly>
    <LazyClientOnly v-else>
      <ModulesBusNoWebCodecs />
    </LazyClientOnly>
    <ModulesMapTeaser />

    <ModulesImageSlider v-if="isFirefoxUser" class="py-32">
      <img
        v-for="n in page.imageslider"
        :key="n.id"
        :src="n?.image.url"
        alt="Repeated Image"
        style="width: 50vw"
        class="h-full max-h-[60vh] px-16 object-cover"
      />
    </ModulesImageSlider>

    <ModulesImageSlider v-else class="py-32">
      <img
        v-for="n in page.imageslider"
        :key="n"
        :src="n?.image.url"
        alt="Repeated Image"
        class="h-full max-h-[60vh] px-4 md:px-16 object-cover"
      />
    </ModulesImageSlider>
    <ModulesLokallaboreTeaser />
    <ModulesSponsors
      v-if="page.sponsors"
      class="bg-white"
      :sponsors="page.sponsors"
    />
    <ModulesFAQ />
  </div>
</template>

<style scoped>
.home-grid {
  display: grid;
  list-style: none;
  grid-gap: 1.5rem;
  line-height: 0;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-flow: dense;
}
.home-grid li {
  position: relative;
  --cols: 1;
  --rows: 1;

  overflow: hidden;
  background: #000;
  line-height: 0;
}
.home-grid li:first-child {
  --cols: 2;
  --rows: 2;
}
.video-container {
  box-shadow: 0px 7.0074076652526855px 7.935121059417725px 0px
      rgba(0, 0, 0, 0.03),
    0px 16.83977508544922px 16.866830825805664px 0px rgba(0, 0, 0, 0.04),
    0px 31.707799911499023px 27.85359001159668px 0px rgba(0, 0, 0, 0.05),
    0px 56.56129837036133px 43.64020538330078px 0px rgba(0, 0, 0, 0.07),
    0px 105.79168701171875px 74.64582061767578px 0px rgba(0, 0, 0, 0.08),
    0px 253.22579956054688px 202.5806427001953px 0px rgba(124, 0, 255, 0.11);
}
.video-container {
  /* padding-bottom: 56.25%;  */
  padding-bottom: 49.1%;
  height: 0;
  position: relative;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.home-grid li:nth-child(5) {
  --cols: 2;
}
.home-grid li:nth-child(6) {
  --rows: 2;
}
.home-grid li:nth-child(7) {
  --cols: 2;
}
.home-grid a {
  display: block;
  height: 10rem;
}
.home-grid img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s;
}
.home-grid figcaption {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  color: #fff;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  line-height: 1;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
}

@media screen and (min-width: 45em) {
  .home-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .home-grid li {
    grid-column-start: span var(--cols);
    grid-row-start: span var(--rows);
  }
  .home-grid a {
    padding-bottom: 52.65%;
  }
}
</style>
