<template>
  <select class="form-select" aria-label="Default select example" v-model="selectedOption">
    <option disabled value="">select name</option>
    <option value="Brad Carletti">Brad Carletti</option>
    <option value="Mirko Dukic">Mirko Dukic</option>
    <option value="Lucas Chan">Lucas Chan</option>
    <option value="Josie Han">Josie Han</option>
    <option value="Sam Tudman">Sam Tudman</option>
    <option value="Loredana Lo Surdo">Loredana Lo Surdo</option>
    <option value="Steven Chen">Steven Chen</option>
    <option value="add_newbie">add a newbie</option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: "",
    };
  },
  watch: {
    selectedOption(newValue) {
      if (newValue === 'add_newbie') {
        this.add_newbie();
      }
    },
  },
  methods: {
    add_newbie() {
      alert("Add a new team member");
      // You can perform additional actions here to add a new team member
    },
  },
};
</script>

<style scoped>
.form-select {
  display: inline-block;
  width: 200px;
}
</style>
