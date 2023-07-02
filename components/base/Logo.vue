<template>
  <v-img class="my-4" :src="image" contain :max-width="size" />
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '250px',
    },
    image: {
      type: String,
      default: '/icon.png',
    },
  },
  data() {
    return {}
  },
}
</script>
