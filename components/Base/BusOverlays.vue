<template>
  <div class="absolute w-full" style="position: absolute">
    <BaseVideoOverlay
      class="overlay-item text-primary bottom-0 sm:absolute z-40 w-full sm:w-auto"
      :scroll-percentage="scrollPercentage"
      :position-x="getPositionX(20)"
      :position-y="getPositionY(20)"
      :trigger-start="2"
      :trigger-end="10"
      :mode="mode"
    >
      <AppVideoOverlay class="relative left-0">
        <div class="p-8 bg-white rounded-md text-secondary w-full sm:max-w-sm">
          <h2 class="font-headline text-title-2 leading-tight pb-2">
            Willkommen im Fabmobil!
          </h2>
          <p class="font-body text-body">Wir machen Workshops….</p>
        </div>
      </AppVideoOverlay>
    </BaseVideoOverlay>

    <BaseVideoOverlay
      class="overlay-item text-primary bottom-0 sm:absolute z-40 w-full sm:w-auto"
      :scroll-percentage="scrollPercentage"
      :position-x="getPositionX(50)"
      :position-y="getPositionY(80)"
      :trigger-start="10"
      :trigger-end="20"
      :mode="mode"
    >
      <AppVideoOverlay class="relative left-0">
        <div class="p-8 bg-white rounded-md text-secondary w-full sm:max-w-sm">
          <h2 class="font-headline text-title-2 leading-tight pb-2">
            Wo fahren wir hin?
          </h2>
          <p class="font-body text-body">
            Förderschulen, Oberschulen, Gymnasien, Grundschule, Jugendclubs &
            more
          </p>
        </div>
      </AppVideoOverlay>
    </BaseVideoOverlay>

    <BaseVideoOverlay
      class="text-primary bottom-0 sm:absolute z-40 w-full sm:w-auto"
      :scroll-percentage="scrollPercentage"
      :position-x="getPositionX(40)"
      :position-y="getPositionY(60)"
      :trigger-start="22"
      :trigger-end="27"
      :mode="mode"
    >
      <AppVideoOverlay>
        <div class="p-8 bg-white rounded-md text-secondary w-full sm:max-w-sm">
          <h2 class="font-headline text-title-2 leading-tight pb-2">
            Lasercutter
          </h2>
          <NuxtLink to="/technology">
            <button
              class="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 border border-gray-400 rounded shadow z-50 font-body"
            >
              Ausstattung ansehen
            </button>
          </NuxtLink>
        </div>
      </AppVideoOverlay>
    </BaseVideoOverlay>

    <BaseVideoOverlay
      class="text-primary bottom-0 sm:absolute z-40 w-full sm:w-auto"
      :scroll-percentage="scrollPercentage"
      :position-x="getPositionX(50)"
      :position-y="getPositionY(65)"
      :trigger-start="28"
      :trigger-end="35"
      :mode="mode"
    >
      <AppVideoOverlay>
        <div class="p-8 bg-white rounded-md text-secondary w-full sm:max-w-sm">
          <h2 class="font-headline text-title-2 leading-tight pb-2">
            3D-Drucker
          </h2>
          <NuxtLink
            to="/tutorials/tech-cycles-nachhaltigkeit-sharing-copy-copy-copy"
          >
            <button
              class="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 border border-gray-400 rounded shadow z-50 font-body"
            >
              Zum Tutorial
            </button>
          </NuxtLink>
        </div>
      </AppVideoOverlay>
    </BaseVideoOverlay>

    <BaseVideoOverlay
      class="text-primary bottom-0 sm:absolute z-40 w-full sm:w-auto"
      :scroll-percentage="scrollPercentage"
      :position-x="getPositionX(33)"
      :position-y="getPositionY(80)"
      :trigger-start="36"
      :trigger-end="45"
      :mode="mode"
    >
      <AppVideoOverlay>
        <div class="p-8 bg-white rounded-md text-secondary w-full sm:max-w-sm">
          <h2 class="font-headline text-title-2 leading-tight pb-2">
            Virtual Reality
          </h2>
          <NuxtLink to="/technology">
            <button
              class="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 border border-gray-400 rounded shadow font-body"
            >
              Ausstattung ansehen
            </button>
          </NuxtLink>
        </div>
      </AppVideoOverlay>
    </BaseVideoOverlay>

    <BaseVideoOverlay
      class="text-primary bottom-0 sm:absolute z-40 w-full sm:w-auto"
      :scroll-percentage="scrollPercentage"
      :position-x="getPositionX(60)"
      :position-y="getPositionY(60)"
      :trigger-start="42"
      :trigger-end="48"
      :mode="mode"
    >
      <AppVideoOverlay>
        <div class="p-8 bg-white rounded-md text-secondary w-full sm:max-w-sm">
          <h2 class="font-headline text-title-2 leading-tight pb-2">
            Tutorials & Videos
          </h2>
          <p class="font-body text-body">
            Mit unseren Video-Tutorials bist du immer auf dem neuesten Stand.
            Schau mal rein!
          </p>

          <NuxtLink to="/tutorials">
            <button
              class="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 border border-gray-400 rounded shadow mt-8 font-body"
            >
              Zu den Tutorials
            </button>
          </NuxtLink>
        </div>
      </AppVideoOverlay>
    </BaseVideoOverlay>

    <BaseVideoOverlay
      class="text-primary bottom-0 sm:absolute z-40 w-full sm:w-auto"
      :scroll-percentage="scrollPercentage"
      :position-x="getPositionX(66)"
      :position-y="getPositionY(25)"
      :trigger-start="54"
      :trigger-end="65"
      :mode="mode"
    >
      <AppVideoOverlay>
        <div class="p-8 bg-white rounded-md text-secondary w-full sm:max-w-sm">
          <p class="font-body text-body">
            Gemeinsam Ideen Entwickeln und kreativ werden.
          </p>
        </div>
      </AppVideoOverlay>
    </BaseVideoOverlay>

    <BaseVideoOverlay
      class="text-primary bottom-0 sm:absolute z-40 w-full sm:w-auto"
      :scroll-percentage="scrollPercentage"
      :position-x="getPositionX(22)"
      :position-y="getPositionY(40)"
      :trigger-start="55"
      :trigger-end="65"
      :mode="mode"
    >
      <AppVideoOverlay>
        <div class="p-8 bg-white rounded-md text-secondary w-full sm:max-w-sm">
          <p class="font-body text-body">Zusammenarbeiten</p>
        </div>
      </AppVideoOverlay>
    </BaseVideoOverlay>

    <BaseVideoOverlay
      class="text-primary bottom-0 sm:absolute z-40 w-full sm:w-auto"
      :scroll-percentage="scrollPercentage"
      :position-x="getPositionX(60)"
      :position-y="getPositionY(55)"
      :trigger-start="60"
      :trigger-end="65"
      :mode="mode"
    >
      <AppVideoOverlay>
        <div class="p-8 bg-white rounded-md text-secondary w-full sm:max-w-sm">
          <p class="font-body text-body">Medienkompetenz weiterentwickeln</p>
        </div>
      </AppVideoOverlay>
    </BaseVideoOverlay>

    <BaseVideoOverlay
      class="text-primary bottom-0 sm:absolute z-40 w-full sm:w-auto"
      :scroll-percentage="scrollPercentage"
      :position-x="getPositionX(40)"
      :position-y="getPositionY(80)"
      :trigger-start="80"
      :trigger-end="90"
      :mode="mode"
    >
      <AppVideoOverlay>
        <div class="p-8 bg-white rounded-md text-secondary w-full sm:max-w-sm">
          <p class="font-body text-body">
            Interessiert? Schick uns eine unverbindliche Anfrage.
          </p>
          <button
            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-8"
            @click="openModal"
          >
            Anfrageformular öffnen
          </button>
        </div>
      </AppVideoOverlay>
    </BaseVideoOverlay>
    <ModalsContact v-model:is-modal-open="isModalOpen" />
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
    mode: {
      type: String,
      default: 'fixed',
    },
  },
  data() {
    return {
      isSmallScreen: true,
      isModalOpen: false,
    }
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
    openModal() {
      this.isModalOpen = true
    },
    getPositionX(x) {
      return this.isSmallScreen ? 0 : x
    },
    getPositionY(y) {
      return this.isSmallScreen ? 100 : y
    },
    checkWindowSize() {
      this.isSmallScreen = window.innerWidth < 640
    },
  },
}
</script>
