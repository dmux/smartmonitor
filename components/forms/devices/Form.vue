<template>
  <v-flex>
    <v-form ref="form">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-bold"
            >Dados Gerais
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <v-row dense>
                <v-col cols="12" sm="12">
                  <v-switch
                    v-model="form.isActive"
                    label="Ativo"
                    flat
                  ></v-switch>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="form.categoryId"
                    :items="categories"
                    :rules="[rules.required]"
                    item-value="_id"
                    item-text="name"
                    label="Categoria do Dispositivo"
                    placeholder="Selecione a categoria"
                    outlined
                    dense
                    required
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="form.name"
                    :rules="[rules.required]"
                    label="Nome"
                    outlined
                    dense
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="form.local"
                    :rules="[rules.required]"
                    label="Local"
                    outlined
                    dense
                    required
                  ></v-text-field> </v-col
                ><v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.description"
                    label="Descrição"
                    outlined
                    dense
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-textarea
                    v-model="form.note"
                    label="Observações"
                    outlined
                    dense
                    required
                  ></v-textarea>
                </v-col>
              </v-row> </v-card
          ></v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-bold"
            >Logs do Dispositivo
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <v-row dense>
                <v-col cols="12" sm="12">
                  <v-data-table
                    dense
                    loader-height="2"
                    class="elevation-1"
                    :headers="headers"
                    :items="logs"
                    :items-per-page="9"
                    :search="search"
                  >
                    <template #top>
                      <v-text-field
                        v-model="search"
                        label="BUSCAR..."
                        class="mx-4"
                      ></v-text-field>
                    </template>
                    <template #[`item.isActive`]="{ item }">
                      <v-switch
                        v-model="item.isActive"
                        flat
                        disabled
                      ></v-switch>
                    </template>
                    <template #[`item.isOnline`]="{ item }">
                      <v-switch
                        v-model="item.isOnline"
                        flat
                        disabled
                      ></v-switch>
                    </template>
                    <template #[`item.createdAt`]="{ item }">
                      <span>{{
                        new Date(item.createdAt).toLocaleString()
                      }}</span>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-card></v-expansion-panel-content
          >
        </v-expansion-panel>
      </v-expansion-panels>
      <v-speed-dial v-model="fab" fab dark fixed bottom right relative>
        <template #activator>
          <v-btn v-model="fab" color="blue darken-2" dark fab>
            <v-icon v-if="fab"> mdi-close </v-icon>
            <v-icon v-else> mdi-arrow-up-thick</v-icon>
          </v-btn>
        </template>
        <v-btn
          fab
          dark
          small
          color="green"
          @click.prevent="validateBeforeSubmit()"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn fab dark small color="indigo" @click="back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-form>
    <notification-dialog
      :snackbar="snackbar.type"
      :color="snackbar.color"
      :message="snackbar.message"
    />
  </v-flex>
</template>

<script>
import { OnRules } from 'vuetify-js-utils'
import NotificationDialog from '@/components/base/NotificationDialog'

export default {
  components: { NotificationDialog },
  mixins: [OnRules],
  props: {
    customers: { type: Array, default: () => [] },
    categories: { type: Array, default: () => [] },
    logs: { type: Array, default: () => [] },
    device: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        isActive: this.device?.isActive || true,
        categoryId: this.device?.categoryId || '',
        name: this.device?.name || '',
        ssid: this.device?.ssid || '',
        ipv4: this.device?.ipv4 || '',
        mac: this.device?.mac || '',
        firmware: this.device?.firmware || '',
        local: this.device?.local || '',
        description: this.device?.description || '',
        note: this.device?.note || '',
      },
      snackbar: {
        type: false,
        color: '',
        timeout: 3000,
        message: '',
      },
      headers: [
        { text: 'Data', align: 'start', sortable: true, value: 'createdAt' },
        { text: 'Identificador', sortable: true, value: 'identifier' },
        { text: 'Valor', sortable: true, value: 'value' },
      ],
      search: '',
      panel: [0, 1, 2],
      fab: false,
    }
  },
  computed: {},
  mounted() {
    this.$refs.form.validate()
  },
  methods: {
    validateBeforeSubmit() {
      if (this.$refs.form.validate()) {
        this.$emit('on-submit', this.form)
      } else {
        this.snackbar = {
          type: true,
          color: 'error',
          message: 'Corriga os dados do formulário!',
        }
        return false
      }
    },
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
