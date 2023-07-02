<template>
  <v-flex>
    <Form
      :device="device"
      :categories="categories"
      :logs="logs"
      @on-submit="update"
    />
  </v-flex>
</template>

<script>
import Form from '@/components/forms/devices/Form'

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form },
  layout: 'default',
  async asyncData({ $axios, params }) {
    const device = await $axios
      .$get(`/devices/${params.id}`)
      .then((res) => {
        return res.data
      })
    const categories = await $axios
      .$get('/settings/devices/categories')
      .then((res) => res.data)
    const logs = await $axios
      .$get(`/devices/logs/${params.id}`)
      .then((res) => {
        return res.data
      })
    return {
      device,
      categories,
      logs,
    }
  },
  data() {
    return {
      device: {},
      customers: [],
      categories: [],
      logs: [],
    }
  },
  methods: {
    update(Form) {
      this.$axios
        .patch(`/devices/${this.$route.params.id}`, Form)
        .then(() => {
          this.$router.go(-1)
        })
    },
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
