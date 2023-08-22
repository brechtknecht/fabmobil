<script setup lang="ts">
const route = useRoute()
const { data } = await useKql({
  query: `page("${route.path}")`,
  select: {
    id: true,
    title: true,
    intendedTemplate: true,
    // description: true,
    subheading: true,
    video: {
      query: 'page.video_url',
    },
    tags: 'page.tags.split(",")',
    layouts: {
      query: 'page.layout.toLayouts',
      select: {
        content: 'layout',
        attrs: 'layout.attrs',
        image: {
          query: 'layout.attrs.image.toFile',
        },
      },
    },
    published: 'page.date.toDate("c")',
    cover: {
      query: 'page.cover.toFile ?? page.images.first',
      select: ['id', 'url'],
    },
    images: {
      query: 'page.images',
      select: ['id', 'uuid', 'url', 'alt'],
    },
  },
})

// console.log(data)

// Set the current page data for the global page context
const page = data.value?.result
setPage(page)

const coverUrl = page?.cover?.url || page?.images?.[0]?.url
const parentRoute = computed(() => route.path.split('/').slice(0, -1).join('/'))

function formatDateShort(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}
</script>

<template>
  <div>
    <div
      v-if="coverUrl"
      class="flex relative h-full overflow-hidden"
      style="--w: 2; --h: 1"
    >
      <!-- <img :src="coverUrl" class="blur-xl scale-[180%] origin-center" alt="" /> -->
      <div
        class="relative flex flex-col w-full h-full items-center justify-center module py-32 md:py-64 px-4 sm:px-0"
        :style="{ '--coverUrl': `url(${coverUrl})` }"
      >
        <div class="module-inside w-full px-2 md:px-32">
          <h1
            class="font-headline leading-tight text-center text-large-title font-bold pb-4"
          >
            {{ page?.title }}
          </h1>
          <div class="hero-wrapper w-full mx-auto">
            <img
              v-if="!page.video"
              :src="coverUrl"
              alt=""
              class="teaser-image w-auto h-auto max-h-[40vh] rounded-xl border mx-auto"
            />
            <BaseVideo v-else class="w-full" :url="page.video" />
          </div>
        </div>
      </div>
    </div>

    <article class="note py-8">
      <KirbyLayouts
        :layouts="page.layouts ?? []"
        class="mx-auto flex justify-center items-center"
      />

      <footer class="max-w-prose mx-auto py-2 px-4 xl:px-0">
        <ul v-if="page?.tags" class="note-tags">
          <li v-for="(tag, index) in page.tags" :key="index">
            <NuxtLink :to="{ path: parentRoute, query: { tag } }">{{
              tag
            }}</NuxtLink>
          </li>
        </ul>

        <time
          v-if="page?.published"
          class="note-date"
          :datetime="page.published"
        >
          Published on
          {{ formatDateShort(new Date(page.published)) }}
        </time>
      </footer>

      <LazyAppPrevNextMaterial />
    </article>
  </div>
</template>

<style scoped>
.teaser-image {
  box-shadow: 0px 7.0074076652526855px 7.935121059417725px 0px
      rgba(0, 0, 0, 0.03),
    0px 16.83977508544922px 16.866830825805664px 0px rgba(0, 0, 0, 0.04),
    0px 31.707799911499023px 27.85359001159668px 0px rgba(0, 0, 0, 0.05),
    0px 56.56129837036133px 43.64020538330078px 0px rgba(0, 0, 0, 0.07),
    0px 105.79168701171875px 74.64582061767578px 0px rgba(0, 0, 0, 0.08),
    0px 253.22579956054688px 202.5806427001953px 0px rgba(124, 0, 255, 0.11);
}
.note {
  max-width: 80rem;
  margin: 0 auto;
}
.note-header {
  padding-top: 3rem;
  margin-bottom: 3rem;
}
.note-footer {
  padding: 2rem 0;
}
.note-date {
  color: var(--color-text-grey);
}
.note-tags {
  display: flex;
  margin-bottom: 1.5rem;
}
.note-tags li {
  margin-right: 0.5rem;
}
.note-tags a {
  padding: 0.5rem 1rem;
  display: block;
  background: var(--color-light);
}
.note-tags a:hover {
  background: var(--color-black);
  color: var(--color-white);
}

.module::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: var(--coverUrl);
  background-size: 150% 150%;
  background-position: center center;
  filter: blur(24px) hue-rotate(90deg) brightness(0.9) contrast(140%); /* Set this to the amount of blur you want */
  z-index: -1;
}

.module-inside {
  /* This will make it stack on top of the ::before */
  position: relative;
}
</style>
