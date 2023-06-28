import type { KirbyQuerySchema } from '#nuxt-kql'

export const materialQuery: KirbyQuerySchema = {
  query: 'page(["tutorials", "notes"])',
  select: {
    title: true,
    intendedTemplate: true,
    subheadline: true,
    text: 'page.text.kirbytext',
    children: {
      query: 'page.children.listed.sortBy("date", "desc")',
      select: {
        id: true,
        title: true,
        tags: 'page.tags.split(",")',
        layout: 'page.layout.toLayouts',
        category: 'page.category',
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
