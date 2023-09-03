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
        class="inline-block align-bottom bg-secondary text-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full"
      >
        <div class="bg-secondary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                  Hier können sie ganz easy einen Besuch des Fabmobils in ihrer
                  Einrichtung anfragen.
                </p>
                <p class="text-lg text-green">
                  Aufgrund hoher Nachfrage kann es manchmal ein paar Tage dauern
                  mit der Antwort.
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
                placeholder="Name"
              />
              <input
                v-model="location"
                class="block w-full px-3 py-2 rounded-md border border-gray-300 bg-secondary text-primary mt-4"
                type="text"
                placeholder="Veranstaltungsort"
              />
              <textarea
                v-model="request"
                class="block w-full px-3 py-2 rounded-md border border-gray-300 bg-secondary text-primary mt-4 flex-grow min-h-[250px]"
                placeholder="Anfrage"
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
      location: '',
      request: '',
    }
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
