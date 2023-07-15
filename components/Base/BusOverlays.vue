<template>
  <div style="position: absolute !important">
    <BaseVideoOverlay
      class="text-primary absolute z-50"
      :scroll-percentage="scrollPercentage"
      :position-x="20"
      :position-y="20"
      :trigger-start="5"
      :trigger-end="20"
    >
      <AppVideoOverlay>
        <div class="p-8 bg-white rounded-md text-secondary max-w-sm">
          <h2 class="font-headline text-title-1">Willkommen im Fabmobil!</h2>
          <p class="font-body text-body">Hier kannst du einiges Entdecken</p>
        </div>
      </AppVideoOverlay>
    </BaseVideoOverlay>

    <BaseVideoOverlay
      class="text-primary absolute z-50"
      :scroll-percentage="scrollPercentage"
      :position-x="40"
      :position-y="60"
      :trigger-start="22"
      :trigger-end="33"
    >
      <AppVideoOverlay>
        <div class="p-8 bg-white rounded-md text-secondary max-w-sm">
          <h2 class="font-headline text-title-2">Technologien</h2>
          <p class="font-body text-body">
            Lasercutter, 3D-Drucker und haufen mehr Zeug gibts hier zum
            ausprobieren
          </p>
        </div>
      </AppVideoOverlay>
    </BaseVideoOverlay>

    <BaseVideoOverlay
      class="text-primary absolute z-50"
      :scroll-percentage="scrollPercentage"
      :position-x="60"
      :position-y="60"
      :trigger-start="42"
      :trigger-end="48"
    >
      <AppVideoOverlay>
        <div class="p-8 bg-white rounded-md text-secondary max-w-sm">
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
}
</script>
