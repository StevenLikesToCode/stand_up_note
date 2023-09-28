<template>
  <div
    class="modal fade"
    :id="id"
    tabindex="-1"
    aria-labelledby="`${id}`Label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <slot name="modalHeader"></slot>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="modalBody"></slot>
        </div>
        <div class="modal-footer" v-if="$slots.modalFooter">
          <slot name="modalFooter"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
export default {
  data() {
    return {
      currentModal: null,
    };
  },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  mounted() {
    this.currentModal = new Modal(`#${this.id}`);
  },

  methods: {
    closeModal() {
      this.currentModal.hide();
    },
    openModal() {
      this.currentModal.show();
    },
  },
};
</script>
