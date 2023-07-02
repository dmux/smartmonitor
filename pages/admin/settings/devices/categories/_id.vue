<template>
  <v-flex>
    <Form :category="category" @on-submit="update" />
  </v-flex>
</template>

<script>
import Form from '@/components/base/admin/devices/categories/Form'

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form },
  layout: 'default',
  async asyncData({ $axios, params }) {
    const category = await $axios
      .$get(`/settings/devices/categories/${params.id}`)
      .then((res) => res.data)
    return { category }
  },
  data() {
    return {
      category: {},
    }
  },
  methods: {
    update(Form) {
      this.$axios
        .patch(
          `/settings/devices/categories/${this.$route.params.id}`,
          Form
        )
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
