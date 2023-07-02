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
              </v-row> </v-card
          ></v-expansion-panel-content>
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
    category: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        isActive: this.category?.isActive || true,
        name: this.category?.name || '',
      },
      snackbar: {
        type: false,
        color: '',
        timeout: 3000,
        message: '',
      },
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
