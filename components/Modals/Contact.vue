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
        class="support-modal bg-secondary inline-block align-bottom text-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full support-modal"
      >
        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left sm:w-1/2 p-4">
              <h1
                id="modal-title"
                class="text-large-title font-headline leading-6 font-medium text-primary leading-tight"
              >
                Unverbindliche Anfrage
              </h1>
              <div class="mt-2 flex gap-8 flex-col pr-8">
                <p class="text-lg text-green mt-4">
                  Für die Terminfindung achten wir darauf, dass das Fabmobil
                  nicht unnötige Strecken zurücklegen muss. Damit sparen wir
                  Sprit und Zeit und sind möglichst umweltschonend unterwegs.
                  Deswegen suchen wir gemeinsam nach einem Termin.
                </p>
                <p class="text-lg text-green">
                  Wir werden uns nach dem Erhalt deiner Anfrage zeitnah bei dir
                  melden.
                </p>
              </div>
            </div>
            <div
              class="mt-3 text-center sm:mt-0 sm:text-left sm:w-1/2 flex flex-col"
            >
              <input
                v-model="name"
                class="block w-full px-3 py-2 rounded-md border border-gray-300 bg-secondary text-primary"
                type="text"
                placeholder="Name Institution (Schule/soziokultureller Ort o.ä.)"
              />
              <input
                v-model="contactperson"
                class="block w-full px-3 py-2 rounded-md border border-gray-300 bg-secondary text-primary mt-4"
                type="text"
                placeholder="Angabe Kontaktperson mit Kontaktdaten (Telefon und/oder E-Mail)"
              />
              <textarea
                v-model="request"
                class="block w-full px-3 py-2 rounded-md border border-gray-300 bg-secondary text-primary mt-4 flex-grow min-h-[250px]"
                placeholder="Feld für Notizen"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="bg-secondary px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green text-base font-medium text-black hover:bg-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-dark sm:ml-3 sm:w-auto sm:text-sm"
          >
            Absenden
          </button>
          <button
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-secondary text-primary hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            @click="closeModal"
          >
            Abbrechen
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
      name: '',
      contactperson: '',
      request: '',
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
    submitForm() {
      // Here you can implement the logic to send the form data using PHPMailer
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
