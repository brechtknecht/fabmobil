<script setup>
const { data } = await useKql({
  query: 'page("home/modules").children',
  select: {
    id: true,
    title: true,
    intendedTemplate: true,
    layout: {
      query: 'page.layout.toLayouts',
      select: {
        content: 'layout',
        attrs: 'layout.attrs',
        image: {
          query: 'layout.attrs.image.toFile',
        },
      },
    },
  },
})

console.log(data)

// Set the current page data for the global page context
const page = data.value?.result
setPage(page)
</script>

<template>
  <div>
    <div class="p-24">
      <div
        class="video-container relative w-full items-center justify-center p-24 rounded-xl overflow-hidden border border-gray"
      >
        <iframe
          id="vimeo"
          class="rounded-xl overflow-hidden border border-gray bg-black absolute top-0 left-0 w-full h-full"
          title="vimeo-player"
          src="https://player.vimeo.com/video/746553056?autoplay=1&loop=1&muted=1"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <!--...and so on...-->

    <ModulesIntro />
    <ModulesBusAnimation />
    <ModulesMapTeaser />
    <ModulesLokallaboreTeaser />
    <h1 class="font-headline text-large-title font-bold">Large Title</h1>
    <h2 class="font-headline text-title-1">Title 1</h2>
    <h3 class="font-headline text-title-2">Title 2</h3>
    <!--...and so on...-->
    <p class="font-body text-body">Body text goes here.</p>
    <p class="font-body text-callout">Callout text goes here.</p>
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
  padding-bottom: 56.25%; /* for 16:9 aspect ratio, change as needed */
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
