<template>
  <v-flex>
    <v-row dense>
      <v-col cols="12" sm="12" xs="12">
        <v-card>
          <client-only>
            <apexchart
              class="full"
              height="450"
              type="area"
              :options="chartOptions"
              :series="series()"
            ></apexchart>
          </client-only>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" xs="12">
        <v-card>
          <v-card-subtitle>Dados do dispositivo</v-card-subtitle>
          <v-card-text>
            <v-simple-table dense>
              <template #default>
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Status:
                      <v-badge
                        dot
                        inline
                        :color="device.isOnline ? 'green' : 'red'"
                      ></v-badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Nome: {{ device.name }}</td>
                  </tr>
                  <tr>
                    <td>Modelo: {{ device.chipModel }}</td>
                  </tr>
                  <tr>
                    <td>Revisão: {{ device.chipRevision }}</td>
                  </tr>
                  <tr>
                    <td>Firmware: {{ device.firmware }}</td>
                  </tr>
                  <tr>
                    <td>Endereço de Hardware: {{ device.mac }}</td>
                  </tr>
                  <tr>
                    <td>SSID: {{ device.ssid }}</td>
                  </tr>
                  <tr>
                    <td>Endereço IP: {{ device.ipv4 }}</td>
                  </tr>
                  <tr>
                    <td>Local: {{ device.local }}</td>
                  </tr>
                  <tr>
                    <td>Descrição: {{ device.description }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" xs="12">
        <v-card>
          <v-card-subtitle>Últimos dados enviados</v-card-subtitle>
          <v-card-text>
            <v-data-table
              dense
              :headers="headers"
              :items="logs"
              :items-per-page="8"
              class="elevation-1"
              :footer-props="{
                itemsPerPageText: 'Páginas',
              }"
            >
              <template #[`item.createdAt`]="{ item }">
                {{ $moment(item.createdAt).format('DD/MM/YYYY HH:mm') }}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6"> </v-col>
    </v-row>
    <v-speed-dial v-model="fab" fab dark fixed bottom right relative>
      <template #activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-arrow-up-thick</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="secondary" @click="update()">
        <v-icon>mdi-update</v-icon>
      </v-btn>
      <v-btn fab dark small color="primary" @click="edit()">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo" @click="back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-speed-dial>
    <notification-dialog
      :snackbar="snackbar.type"
      :color="snackbar.color"
      :message="snackbar.message"
    />
  </v-flex>
</template>

<script>
import NotificationDialog from '@/components/base/NotificationDialog'

export default {
  components: { NotificationDialog },
  layout: 'default',
  async asyncData({ $axios, params }) {
    const device = await $axios
      .$get(`/devices/${params.id}`)
      .then((res) => {
        return res.data
      })
    const logs = await $axios
      .$get(`/devices/logs/${params.id}`)
      .then((res) => {
        return res.data
      })
    return {
      device,
      logs,
    }
  },
  data() {
    return {
      device: {},
      logs: [],
      snackbar: {
        type: false,
        color: '',
        timeout: 3000,
        message: '',
      },
      fab: false,
      headers: [
        {
          text: 'Data',
          align: 'start',
          sortable: false,
          value: 'createdAt',
        },
        { text: 'Identificador', value: 'identifier' },
        { text: 'Valor', value: 'value' },
      ],
      chartOptions: {
        theme: {
          mode: 'dark',
        },
        chart: {
          height: 350,
          type: 'line',
          background: '0',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        title: {
          text: 'Estátisticas das últimas 8h',
          align: 'left',
        },
        grid: {
          row: {
            opacity: 0.5,
          },
        },
        xaxis: {
          labels: {
            show: false,
          },
        },
      },
    }
  },
  methods: {
    series() {
      return [
        {
          name: 'Temperatura',
          data: this.logs.map((a) => a.value).reverse(),
        },
      ]
    },
    update() {
      this.$nuxt.refresh()
    },
    edit() {
      this.$router.push({
        path: `/devices/${this.device._id}`,
      })
    },
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
