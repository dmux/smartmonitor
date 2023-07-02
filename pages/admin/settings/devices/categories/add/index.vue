<template>
  <v-flex>
    <Form @on-submit="create" />
  </v-flex>
</template>

<script>
import Form from '@/components/base/admin/devices/categories/Form'

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form },
  layout: 'default',
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
      this.$axios
        .post('/settings/devices/categories', Form)
        .then(this.$router.push('/admin/settings/devices/categories'))
    },
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
