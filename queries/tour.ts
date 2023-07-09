import type { KirbyQuerySchema } from '#nuxt-kql'

export const tourQuery: KirbyQuerySchema = {
  query: 'page("/tour")',
  select: {
    title: true,
    tourdates: {
      query: 'page.tourdates.toStructure',
      select: {
        date: 'page.date.toDate("c")',
        location: true,
        image: {
          query: 'page.image.toFile',
          select: ['url'],
        },
        settings: {
          class: true,
          id: true,
          colors: true,
          image: {
            query: 'page.image.toFile',
            select: ['url'],
          },
          darkmode: true,
        },
      },
    },
  },
}
