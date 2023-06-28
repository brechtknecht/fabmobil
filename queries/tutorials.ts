import type { KirbyQuerySchema } from '#nuxt-kql'

export const tutorialsQuery: KirbyQuerySchema = {
  query: 'page("tutorials")',
  select: {
    title: true,
    intendedTemplate: true,
    // description: true,
    subheadline: true,
    modules: {
      // New modules field
      query: 'page.children.children',
      select: {
        id: true,
        title: true,
        description: true,
        intro_text: true,
        colors: true,
        image: true,
      },
    },
    text: 'page.text.kirbytext',
    children: {
      query: 'page.children.listed.sortBy("category", "asc", "date", "desc")',
      select: {
        id: true,
        title: true,
        tags: 'page.tags.split(",")',
        category: 'page.category.split(",")',
        layout: 'page.layout.toLayouts',
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
    },
  },
}
