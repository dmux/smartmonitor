<template>
  <form>
    <v-btn block color="primary" class="mr-4" @click="login"> Login </v-btn>
  </form>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    async login() {
      await this.$auth.loginWith('auth0')
    },
  },
}
</script>
