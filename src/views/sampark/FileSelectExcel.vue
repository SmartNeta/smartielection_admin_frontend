<template>
  <label class="file-select">
    <div class="select-button">
      <span v-if="value.name">Selected file : {{value.name}}</span>
      <span v-else>Select Excel File</span>
    </div>
    <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="handleFileChange"/>
  </label>
</template>

<script>
export default {
  props: {
    value: File
  },

  methods: {
    handleFileChange(e) {
      this.$emit('input', e.target.files[0])
    }
  }
}
</script>

<style scoped>
.file-select > .select-button {
  padding: 1rem;
  cursor: pointer;
  color: #afaeae;
  background-color: rgb(255, 255, 255);

  border-bottom: 1px solid #afaeae;

  text-align: center;
  font-weight: bold;
}

.file-select > input[type="file"] {
  display: none;
}
</style>