<template>
  <div
    class="container mx-auto intro-section flex flex-col bg-cover bg-no-repeat bg-purple-600 items-center justify-center h-auto sm:h-full py-24"
    :style="{
      backgroundImage: 'url(/assets/img/frontpage/background-layer.png)',
    }"
  >
    <div
      class="flex flex-col sm:flex-row w-full justify-center items-center h-auto sm:h-full py-32 max-w-2xl"
    >
      <h1
        class="font-bold text-3xl sm:text-5xl text-black w-full text-center sm:text-left py-8"
      >
        Das Fabmobil ist ein fahrendes
        <span class="font-headline">Kunst-, Kultur- und Zukunftslabor</span> für
        <BaseRuff :padding="20"><span>ganz Sachsen</span></BaseRuff>
      </h1>
    </div>
    <div
      class="flex flex-col sm:flex-row w-full justify-center items-center h-auto sm:h-full py-32 max-w-2xl"
    >
      <p
        class="font-normal text-xl sm:text-2xl leading-relaxed text-black w-full text-center sm:text-left py-8"
      >
        Der mit Digitaltechnik und Maschinen ausgestattete Doppeldeckerbus
        bietet Kindern und Jugendlichen die Möglichkeit allerlei Cerative
        Technologies zu entdecken.
      </p>
    </div>
    <div
      class="flex flex-col sm:flex-row h-auto sm:h-full justify-center items-center py-32"
    >
      <h1
        class="font-bold text-3xl sm:text-5xl text-black w-full text-center sm:text-left"
      >
        Kostenlose Workshops
      </h1>
      <p
        class="font-normal text-xl sm:text-2xl leading-relaxed text-black w-full text-left p-16"
      >
        Seid ihr eine Schule, ein Jugendclub oder ein soziokulturelles Zentrum
        in Sachsen? Dann meldet euch bei uns für einen Workshop. Die sind für
        euch kostenlos!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
