<template>
  <v-flex>
    <v-data-table
      dense
      loader-height="2"
      :headers="headers"
      :items="users"
      :items-per-page="9"
      :search="search"
      :loading="loadTable"
      :footer-props="{
        itemsPerPageText: 'Páginas',
      }"
      @click:row="update"
    >
      <template #top>
        <v-text-field
          v-model="search"
          label="BUSCAR..."
          class="mx-4"
        ></v-text-field>
      </template>
      <template #[`item.picture`]="{ item }">
        <v-avatar size="40" class="my-1">
          <img v-if="item.picture" :src="item.picture" />
          <v-icon v-else x-large> mdi-account-circle </v-icon>
        </v-avatar>
      </template>
      <template #[`item.firstName`]="{ item }">
        {{ item.user_metadata.firstName }}
      </template>
      <template #[`item.lastName`]="{ item }">
        {{ item.user_metadata.lastName }}
      </template>
      <template #[`item.isSuperuser`]="{ item }">
        <v-switch
          v-model="item.user_metadata.isSuperuser"
          flat
          disabled
        ></v-switch>
      </template>
      <template #[`item.isSeller`]="{ item }">
        <v-switch
          v-model="item.user_metadata.isSeller"
          flat
          disabled
        ></v-switch>
      </template>
      <template #[`item.last_login`]="{ item }">
        <span v-if="item.last_login">{{
          $moment(item.last_login).format('DD/MM/YYYY HH:mm')
        }}</span>
        <span v-else>-</span>
      </template>
    </v-data-table>
    <v-speed-dial v-model="fab" fab dark fixed bottom right relative>
      <template #activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-arrow-up-thick</v-icon>
        </v-btn>
      </template>
      <v-btn to="" fab dark small color="primary">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo" @click="back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-flex>
</template>

<script>
export default {
  layout: 'default',
  loading: true,
  data() {
    return {
      fab: false,
      loadTable: true,
      search: '',
      users: [],
      headers: [
        {
          text: '',
          align: 'start',
          sortable: true,
          value: 'picture',
        },
        { text: 'Nome', align: 'start', sortable: true, value: 'firstName' },
        {
          text: 'Sobrenome',
          align: 'start',
          sortable: true,
          value: 'lastName',
        },
        { text: 'E-mail', align: 'start', sortable: true, value: 'email' },
        {
          text: 'Último Login',
          align: 'start',
          sortable: true,
          value: 'last_login',
        },
      ],
    }
  },
  async fetch() {
    this.users = await this.$axios.$get('/users').then((res) => {
      return res.data
    })
    this.loadTable = false
  },
  methods: {
    update(item) {
      this.$router.push({ path: `/admin/users/${item.user_id}` })
    },
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
