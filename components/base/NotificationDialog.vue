<template>
  <v-flex class="text-center">
    <v-snackbar
      tile
      content-class="text-center"
      :value="snackbar"
      :color="color"
      :timeout="timeout"
    >
      {{ message }}
    </v-snackbar>
  </v-flex>
</template>

<script>
export default {
  props: {
    snackbar: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'success',
    },
    timeout: {
      type: Number,
      default: 2000,
    },
    message: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
}
</script>
