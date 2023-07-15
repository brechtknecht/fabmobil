<template>
  <div class="absolute w-full" style="position: absolute">
    <BaseVideoOverlay
      :class="overlayClasses"
      class="text-primary bottom-0 sm:absolute z-50 w-full sm:w-auto"
      :scroll-percentage="scrollPercentage"
      :position-x="getPositionX(20)"
      :position-y="getPositionY(20)"
      :trigger-start="5"
      :trigger-end="20"
    >
      <AppVideoOverlay class="relative left-0">
        <div class="p-8 bg-white rounded-md text-secondary w-full sm:max-w-sm">
          <h2 class="font-headline text-title-1">Willkommen im Fabmobil!</h2>
          <p class="font-body text-body">Hier kannst du einiges Entdecken</p>
        </div>
      </AppVideoOverlay>
    </BaseVideoOverlay>

    <BaseVideoOverlay
      class="text-primary bottom-0 sm:absolute z-50 w-full sm:w-auto"
      :scroll-percentage="scrollPercentage"
      :position-x="getPositionX(40)"
      :position-y="getPositionY(60)"
      :trigger-start="22"
      :trigger-end="33"
    >
      <AppVideoOverlay>
        <div class="p-8 bg-white rounded-md text-secondary w-full sm:max-w-sm">
          <h2 class="font-headline text-title-2">Technologien</h2>
          <p class="font-body text-body">
            Lasercutter, 3D-Drucker und haufen mehr Zeug gibts hier zum
            ausprobieren
          </p>
        </div>
      </AppVideoOverlay>
    </BaseVideoOverlay>

    <BaseVideoOverlay
      class="text-primary bottom-0 sm:absolute z-50 w-full sm:w-auto"
      :scroll-percentage="scrollPercentage"
      :position-x="getPositionX(60)"
      :position-y="getPositionY(60)"
      :trigger-start="42"
      :trigger-end="48"
    >
      <AppVideoOverlay>
        <div class="p-8 bg-white rounded-md text-secondary w-full sm:max-w-sm">
          <p class="font-body text-body">
            Mit unseren Video-Tutorials bist du immer auf dem neuesten Stand.
            Schau mal rein!
          </p>
        </div>
      </AppVideoOverlay>
    </BaseVideoOverlay>
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
  },
  data() {
    return {
      isSmallScreen: true,
    }
  },
  computed: {
    overlayClasses() {
      return [
        'text-primary',
        'z-50',
        this.isSmallScreen ? 'bottom-0 left-0 w-full' : 'absolute',
      ]
    },
  },
  mounted() {
    if (process.client) {
      this.isSmallScreen = window.innerWidth < 640
      window.addEventListener('resize', this.checkWindowSize)
      this.checkWindowSize()
    }
  },
  beforeUnmount() {
    if (process.client) {
      window.removeEventListener('resize', this.checkWindowSize)
    }
  },
  methods: {
    getPositionX(x) {
      return this.isSmallScreen ? 0 : x
    },
    getPositionY(y) {
      return this.isSmallScreen ? 0 : y
    },
    checkWindowSize() {
      this.isSmallScreen = window.innerWidth < 640
    },
  },
}
</script>
