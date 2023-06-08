// teamsQuery.ts

import type { KirbyQuerySchema } from '#nuxt-kql'

export const teamsQuery: KirbyQuerySchema = {
  query: 'page("/team")',
  select: {
    title: true,
    description: true,
    team: {
      query: 'page.team.toStructure',
      select: {
        name: true,
        description: true,
        email: true,
        phone: true,
        contact: true,
        image: {
          query: 'page.image.toFile',
          select: ['url'],
        },
      },
    },
  },
}
