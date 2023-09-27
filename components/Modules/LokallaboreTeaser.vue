<template>
  <div
    class="flex flex-col bg-tertiary items-center justify-center h-fit py-24"
  >
    <div class="container mx-auto px-4">
      <img
        src="/assets/img/frontpage/LOKALLABORE.svg"
        class="w-5/6 md:max-w-[1280px] py-8 mx-0 sm:mx-auto"
      />
      <h1
        class="font-headline text-3xl leading-normal sm:text-large-title text-left sm:text-center text-black w-full py-8"
      >
        Ein Netzwerk aus Digitalwerkstätten für Jugendliche im ländlichen Raum
      </h1>
      <div
        class="flex flex-col-reverse sm:flex-row-reverse justify-center items-center space-x-4 relative w-full h-full"
      >
        <div class="flex flex-row">
          <div class="flex flex-row scale-75 z-40">
            <BaseButton
              class="bg-white relative lg:absolute z-10 lg:top-0 lg:right-[15%]"
              label="Erfahre Mehr!"
              text-color="text-black"
              to="https://lokallabore.de"
            />
          </div>
        </div>
        <div
          class="px-4 pb-4 lg:px-24 lg:pb-24 pt-12 w-full h-full max-w-screen-2xl mx-auto"
        >
          <BaseVideo
            url="https://player.vimeo.com/video/538316076?autoplay=1&loop=1&muted=1"
          />
        </div>
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
  padding-bottom: 49.2%; /* for 16:9 aspect ratio, change as needed */
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
