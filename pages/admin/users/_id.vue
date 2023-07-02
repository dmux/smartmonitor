<template>
  <v-flex>
    <Form :user="user" @on-submit="update" />
  </v-flex>
</template>

<script>
import Form from '@/components/base/admin/users/Form'
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form },
  async asyncData({ $axios, params }) {
    const user = await $axios.$get(`/api/users/${params.id}`).then((res) => {
      return res.data
    })
    return { user }
  },
  data() {
    return {
      user: {},
      companies: [],
      environments: [],
    }
  },
  methods: {
    update(Form) {
      this.$axios
        .patch(`/users/${this.$route.params.id}`, Form)
        .then((_res) => {
          this.$router.go(-1)
        })
    },
  },
}
</script>
