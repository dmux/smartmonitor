<template>
  <v-flex>
    <v-data-table
      dense
      loader-height="2"
      class="elevation-1"
      :headers="headers"
      :items="categories"
      :items-per-page="9"
      :search="search"
      :loading="loadTable"
      @click:row="update"
    >
      <template #top>
        <v-text-field
          v-model="search"
          label="BUSCAR..."
          class="mx-4"
        ></v-text-field>
      </template>
      <template #[`item.isActive`]="{ item }">
        <v-switch v-model="item.isActive" flat disabled></v-switch>
      </template>
    </v-data-table>
    <v-speed-dial v-model="fab" fab dark fixed bottom right relative>
      <template #activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-arrow-up-thick</v-icon>
        </v-btn>
      </template>
      <v-btn
        to="/admin/settings/devices/categories/add"
        fab
        dark
        small
        color="primary"
      >
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
  loading: true,
  data() {
    return {
      headers: [
        { text: 'Código', align: 'start', sortable: true, value: '_id' },
        { text: 'Nome', sortable: true, value: 'name' },
        { text: 'Ativo', sortable: true, value: 'isActive' },
      ],
      categories: [],
      loadTable: true,
      search: '',
      fab: false,
    }
  },
  async fetch() {
    this.categories = await this.$axios
      .$get('/api/settings/devices/categories')
      .then((res) => {
        return res.data
      })
    this.loadTable = false
  },
  methods: {
    update(item) {
      this.$router.push({
        path: `/admin/settings/devices/categories/${item._id}`,
      })
    },
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
