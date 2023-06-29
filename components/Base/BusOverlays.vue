<template>
  <BaseVideoOverlay
    class="text-primary absolute z-50"
    :scroll-percentage="scrollPercentage"
    :position-x="20"
    :position-y="20"
    :trigger-start="5"
    :trigger-end="30"
  >
    ALLALALALALLA
  </BaseVideoOverlay>

  <BaseVideoOverlay
    class="text-primary absolute z-50"
    :scroll-percentage="scrollPercentage"
    :position-x="60"
    :position-y="60"
    :trigger-start="50"
    :trigger-end="75"
  >
    ALTER RICHTIG REIN DIGGI
  </BaseVideoOverlay>
</template>

<script>
export default {
  props: {
    // Scroll percentage passed from parent
    scrollPercentage: {
      type: Number,
      required: true,
    },
  },
}
</script>
