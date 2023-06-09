<script setup lang="ts">
const route = useRoute()
const site = useSite()

const listedChildren = computed(() =>
  (site.value?.children ?? []).filter((i) => i.isListed)
)
</script>

<template>
  <header class="header bg-accent fixed top-0 w-full z-50">
    <NuxtLink class="logo" to="/">
      <img src="/assets/img/logo.svg" :alt="site.title" />
    </NuxtLink>

    <nav class="menu">
      <NuxtLink
        v-for="item in listedChildren"
        :key="item.id"
        :to="`/${item.id}`"
        class="font-paragraph uppercase font-medium font-xl"
        :aria-current="
          route.path.startsWith(`/${item.id}`) ? 'page' : undefined
        "
      >
        {{ item.title }}
      </NuxtLink>
      <!-- <AppSocial /> -->
    </nav>

    <nav class="menu">
      <NuxtLink :to="`#`" class="font-paragraph uppercase font-medium font-xl">
        Spenden
      </NuxtLink>
    </nav>
  </header>
  <!-- Spacer to prevent content jump when header becomes fixed -->
  <div class="h-20 md:h-24"></div>
  <!-- Remaining content of the page goes here -->
</template>

<style scoped>
.header {
  position: fixed;
  width: 100vw;
  padding: 0.5rem 1.5rem;
}

.menu {
  display: flex;
}
.menu a {
  padding: 1rem;
  display: block;
}
.menu a[aria-current] {
  text-decoration: underline;
}
</style>
