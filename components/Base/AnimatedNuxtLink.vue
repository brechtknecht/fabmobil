<template>
  <div class="clipped-box">
    <NuxtLink :to="to" @mouseenter="animateLink" @mouseleave="resetLink">
      <div class="animation-container">
        <div
          :class="{ 'animate-out': isHovered }"
          class="animate-content text-headline weight-medium text-body font-medium text-black"
          :aria-current="ariaCurrent"
        >
          {{ titleA }}
        </div>
        <div
          :class="{ 'animate-in': isHovered }"
          class="animate-content text-headline weight-medium text-body font-medium text-black"
        >
          {{ titleB }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  to: String,
  titleA: String,
  titleB: String,
  ariaCurrent: String,
})

const isHovered = ref(false)

const animateLink = () => {
  isHovered.value = true
}

const resetLink = () => {
  isHovered.value = false
}
</script>

<style>
.clipped-box {
  overflow: hidden;
  display: inline-flex;
}

.animation-container {
  display: grid;
  width: fit-content;
  height: 100%;
}

.animate-content {
  grid-area: 1 / 1;
}

.animate-out {
  text-decoration: none;
  animation: out-up 0.5s forwards;
}

.animate-in {
  text-decoration: none;
  animation: in-up 0.5s forwards;
  font-family: 'Migra-Regular'; /* Your Font B here */
  font-size: 1.55rem;
  letter-spacing: 0.75px;
  position: relative;
  top: 3px;
  opacity: 0;
}

@keyframes out-up {
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}

@keyframes in-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
