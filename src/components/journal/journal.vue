<template>
  <div>
    <div class="note">
      <h5 class="note_header">Note</h5>
      <AEditor :modelValue="entryText" :placeholder="`please input`"/>
    </div>
  </div>
</template>

<script>
import AEditor from "../global-components/AEditor.vue";

export default {
  props: {
    entryText: String, // Define a prop to receive the note property
  },
  data() {
    return {
      note_toggle: false, // Track whether you're in edit mode
    };
  },
  components: {
    AEditor,
  },
  methods: {
  },
};
</script>

<style scoped>
.note {
  background-color: aliceblue;
}
.note_header{
  color: rgb(82, 171, 249);
}
</style>
