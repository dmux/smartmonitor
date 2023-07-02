<template>
  <v-flex>
    <Form :categories="categories" @on-submit="create" />
  </v-flex>
</template>

<script>
import Form from '@/components/forms/devices/Form'

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form },
  layout: 'default',
  async asyncData({ $axios }) {
    const categories = await $axios
      .$get('/settings/devices/categories')
      .then((res) => res.data)
    return {
      categories,
    }
  },
  data() {
    return {
      snackbar: {
        type: false,
        color: '',
        timeout: 3000,
        message: '',
      },
    }
  },
  methods: {
    create(Form) {
      this.$axios.post('/devices', Form).then(this.$router.push('/devices'))
    },
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
