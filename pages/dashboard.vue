<template>
  <v-flex>
    <v-row dense>
      <v-col cols="12" sm="4">
        <v-card color="red lighten-1" dark>
          <v-card-title color="red lighten-1" dark>
            <v-card-title class="text-h5"> 0</v-card-title>
            <v-spacer></v-spacer>
            <v-card-subtitle>Status</v-card-subtitle>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card color="orange lighten-1" dark>
          <v-card-title color="orange lighten-1" dark>
            <v-card-title class="text-h5"> 0</v-card-title>
            <v-spacer></v-spacer>
            <v-card-subtitle>Status</v-card-subtitle>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card color="green lighten-1" dark>
          <v-card-title color="green lighten-1" dark>
            <v-card-title class="text-h5"> 0</v-card-title>
            <v-spacer></v-spacer>
            <v-card-subtitle>Status</v-card-subtitle>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card color="light-blue lighten-1" dark>
          <v-card-title color="light-blue lighten-1" dark>
            <v-card-title class="text-h5"> 0</v-card-title>
            <v-spacer></v-spacer>
            <v-card-subtitle>Status</v-card-subtitle>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card color="brown lighten-1" dark>
          <v-card-title color="brown lighten-1" dark>
            <v-card-title class="text-h5"> 0</v-card-title>
            <v-spacer></v-spacer>
            <v-card-subtitle>Status</v-card-subtitle>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card color="grey lighten-1" dark>
          <v-card-title color="grey lighten-1" dark>
            <v-card-title class="text-h5"> 0</v-card-title>
            <v-spacer></v-spacer>
            <v-card-subtitle>Status</v-card-subtitle>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-speed-dial v-model="fab" fab dark fixed bottom right relative>
      <template #activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-arrow-up-thick</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="grey" @click="socialShare()">
        <v-icon>mdi-share-variant</v-icon>
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
    }
  },
  async fetch() {},
  methods: {
    socialShare() {
      if (navigator.share) {
        navigator.share({
          title: 'Smart Monitor',
          text: 'Compartilhe!',
          url: 'http://localhost:3000',
        })
      }
    },
  },
}
</script>
