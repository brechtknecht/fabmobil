<template>
  <div
    class="intro-section flex flex-col bg-purple tertiary items-center justify-center h-fit py-24"
  >
    <div class="flex flex-row h-fit">
      <!-- <BaseRough /> -->
      <h1
        class="font-headline text-large-title text-secondary w-full text-center max-w-[40vw] text-left py-8"
      >
        Das Fabmobil ist eine mobile Digitalwerkstatt für Sachsen
      </h1>
    </div>
    <div class="flex flex-row h-fit">
      <p
        class="font-body text-headline leading-relaxed text-secondary w-full text-center max-w-[40vw] text-left py-8"
      >
        Der mit Digitaltechnik und Maschinen ausgestattete Doppeldeckerbus
        bietet Kindern und Jugendlichen die Möglichkeit allerlei Cerative
        Technologies zu entdecken.
      </p>
    </div>
    <div class="flex flex-col sm:flex-row h-fit justify-center items-center">
      <h1
        class="font-headline text-large-title text-secondary w-full text-center"
      >
        Kostenlose Workshops
      </h1>
      <p
        class="font-body text-headline leading-relaxed text-secondary w-full text-left p-16"
      >
        Seid ihr eine Schule, ein Jugendclub oder ein soziokulturelles Zentrum
        in Sachsen? Dann meldet euch bei uns für einen Workshop. Die sind für
        euch kostenlos!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.intro-section {
  background: url('/assets/img/frontpage/background-layer.png');
  background-size: cover;
}
</style>
