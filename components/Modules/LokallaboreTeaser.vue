<template>
  <div
    class="flex flex-col bg-tertiary items-center justify-center h-fit py-24"
  >
    <img
      src="/assets/img/frontpage/LOKALLABORE.svg"
      class="w-5/6 md:max-w-[1280px] py-8"
    />
    <h1
      class="font-headline text-large-title text-primary w-full text-center py-8"
    >
      Ein Netzwerk aus Digitalwerkstätten für Jugendliche im ländlichen Raum
    </h1>
    <div
      class="flex justify-center items-center space-x-4 relative w-full h-full"
    >
      <BaseButton
        class="bg-white absolute z-10 top-80 right-[15%]"
        label="Erfahre Mehr!"
        text-color="text-black"
      />
    </div>
    <div
      class="px-4 pb-4 lg:px-24 lg:pb-24 pt-12 w-full h-full max-w-screen-2xl mx-auto"
    >
      <div
        class="video-container relative w-full items-center justify-center p-24 rounded-xl overflow-hidden border border-gray"
      >
        <iframe
          id="vimeo"
          class="rounded-xl overflow-hidden border border-gray bg-black absolute top-0 left-0 w-full h-full"
          title="vimeo-player"
          src="https://player.vimeo.com/video/538316076?autoplay=1&loop=1&muted=1"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.video-container {
  box-shadow: 0px 7.0074076652526855px 7.935121059417725px 0px
      rgba(0, 0, 0, 0.03),
    0px 16.83977508544922px 16.866830825805664px 0px rgba(0, 0, 0, 0.04),
    0px 31.707799911499023px 27.85359001159668px 0px rgba(0, 0, 0, 0.05),
    0px 56.56129837036133px 43.64020538330078px 0px rgba(0, 0, 0, 0.07),
    0px 105.79168701171875px 74.64582061767578px 0px rgba(0, 0, 0, 0.08),
    0px 253.22579956054688px 202.5806427001953px 0px rgba(255, 255, 255, 0.11);
}
.video-container {
  padding-bottom: 56.25%; /* for 16:9 aspect ratio, change as needed */
  height: 0;
  position: relative;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
