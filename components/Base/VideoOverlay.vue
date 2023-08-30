<!-- VideoOverlay.vue -->

<template>
  <div
    :class="{
      'opacity-0': !isVisible,
      'opacity-100': isVisible,
      'transition-opacity': true,
      'duration-500': true,
    }"
    class="absolute z-40 w-full h-full top-0"
  >
    <!-- Absolute container for slot content -->
    <div
      :style="{ top: `${positionY}%`, left: `${positionX}%` }"
      class="flex fixed top-0 affepenner"
    >
      <!-- Slot for overlay content -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // Scroll percentage passed from parent
    scrollPercentage: {
      type: Number,
      required: true,
    },
    // Y position for the overlay content
    positionY: {
      type: Number,
      default: 0,
    },
    // X position for the overlay content
    positionX: {
      type: Number,
      default: 0,
    },
    // Start of the range of scroll percentages when the overlay becomes visible
    triggerStart: {
      type: Number,
      required: true,
    },
    // End of the range of scroll percentages when the overlay becomes visible
    triggerEnd: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // Calculate whether the overlay should be visible based on scrollPercentage
    isVisible() {
      return (
        this.scrollPercentage >= this.triggerStart &&
        this.scrollPercentage <= this.triggerEnd
      )
    },
  },
}
</script>

<style scoped>
@media (max-width: 639px) {
  .affepenner {
    transform: translateY(-100%);
  }
}

.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
}
.transition-opacity {
  transition-property: opacity;
}
.duration-500 {
  transition-duration: 0.5s;
}
</style>
