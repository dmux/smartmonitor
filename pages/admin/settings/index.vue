<template>
  <v-flex>
    <v-data-table
      dense
      loader-height="2"
      class="elevation-1"
      sort-by="name"
      :headers="headers"
      :items="items"
      :items-per-page="9"
      :search="search"
      @click:row="open"
    >
      <template #top>
        <v-text-field
          v-model="search"
          label="BUSCAR..."
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table>
    <v-speed-dial v-model="fab" fab dark fixed bottom right relative>
      <template #activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-arrow-up-thick</v-icon>
        </v-btn>
      </template>
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
        {
          text: 'Configurações',
          align: 'start',
          sortable: true,
          value: 'name',
        },
      ],
      items: [
        {
          name: 'Dispositivos - Categorias',
          link: '/admin/settings/devices/categories',
        },
      ],
      search: '',
      loadTable: true,
      fab: false,
    }
  },
  methods: {
    open(item) {
      this.$router.push({
        path: `${item.link}`,
      })
    },
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
