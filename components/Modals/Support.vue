<template>
  <div
    v-if="isModalOpen"
    class="fixed z-50 inset-0 overflow-y-auto text-primary"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        @click="closeModal"
      ></div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="support-modal bg-secondary inline-block align-bottom text-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full"
      >
        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left sm:w-1/2 p-4">
              <h3
                id="modal-title"
                class="text-large-title font-headline leading-6 font-medium text-primary leading-tight"
              >
                Du willst uns Unterstützen?
              </h3>
              <div class="mt-2 flex gap-8 flex-col pr-8">
                <p class="text-lg text-green mt-4">
                  Du hast Lust bei uns im Verein mitzuwirken und vielleicht auch
                  ehrenamtliche Aufgaben zu übernehmen?
                </p>
              </div>
              <div class="mt-2 flex gap-8 flex-col pr-8">
                <p class="text-lg text-green mt-4">
                  Dann schreib uns eine Mail an
                  <a
                    class="font-headline underline"
                    href="mailto:mail@fabmobil.org"
                    >mail@fabmobil.org</a
                  >
                  und komm mit uns ins Gespräch. Wir freuen uns drauf dich
                  kennenzulernen.
                </p>
              </div>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:text-left sm:w-1/2 p-4">
              <p class="text-lg text-white mt-4">
                Für unsere Vereinsarbeit sind wir auch auf finanzielle Spenden
                angewiesen. Auch so könnt ihr uns unterstützen!
              </p>
              <p class="text-lg text-white mt-4">
                Spenden an: <br />
                Fabmobil e.V. <br />IBAN:
                <span class="bg-white text-black rounded-md px-2 py-1"
                  >DE53 4306 0967 1263 4334 00</span
                >
                <button
                  class="text-green mx-4"
                  @click="
                    copyToClipboard('iban', 'DE53 4306 0967 1263 4334 00')
                  "
                >
                  {{
                    copyStatus.iban === 'success'
                      ? ' IBAN in Zwischenablage kopiert'
                      : 'Kopieren'
                  }}
                </button>
                <br />
                BIC:
                <span class="bg-white text-black rounded-md px-2 py-1"
                  >GENODEM1GLS</span
                >
                <button
                  class="text-green mx-4"
                  @click="copyToClipboard('bic', 'GENODEM1GLS')"
                >
                  {{
                    copyStatus.bic === 'success'
                      ? 'BIC in Zwischenablage kopiert'
                      : 'Kopieren'
                  }}
                </button>
                <br />GLS GEMEINSCHAFTSBANK GAA <br /><br />
                <a
                  class="text-green hover:text-white"
                  href="https://www.paypal.com/donate?token=2-5AhOJUI47iq79o85c9mBJIuyLhWyKO5iz3gPy1l1PCRp46Mo6aYwBA4KNI7S3n0Ial2oAQd4ot3o6O"
                  target="_blank"
                  >oder per PayPal →</a
                >
              </p>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-secondary text-primary hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            @click="closeModal"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      copyStatus: {
        iban: '',
        bic: '',
      },
    }
  },
  watch: {
    isModalOpen(newVal) {
      if (newVal) {
        document.body.classList.add('no-scroll')
      } else {
        document.body.classList.remove('no-scroll')
      }
    },
  },
  methods: {
    async copyToClipboard(type, text) {
      try {
        await navigator.clipboard.writeText(text)
        this.copyStatus[type] = 'success'
      } catch (err) {
        this.copyStatus[type] = 'failed'
      }
    },
    closeModal() {
      this.$emit('update:isModalOpen', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.support-modal {
  background-image: url('@/assets/img/figur.png');
  background-blend-mode: multiply;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>

<style lang="scss">
.no-scroll {
  overflow: hidden;
}
</style>
