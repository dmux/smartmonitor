<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-flex>
    <v-form ref="form">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-bold"
            >Informações do Usuário
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <v-row dense>
                <v-col cols="12" sm="12">
                  <v-switch
                    v-model="form.user_metadata.isActive"
                    label="Ativo"
                    flat
                  ></v-switch>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="form.user_metadata.firstName"
                    :rules="[rules.required]"
                    label="Nome"
                    outlined
                    dense
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="form.user_metadata.lastName"
                    :rules="[rules.required]"
                    label="Sobrenome"
                    outlined
                    dense
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="form.nickname"
                    label="Nickname"
                    outlined
                    dense
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="form.user_metadata.cpf"
                    v-mask="maskCpf(form.user_metadata.cpf)"
                    label="CPF"
                    outlined
                    dense
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="form.email"
                    :rules="[rules.required, rules.email]"
                    label="E-mail"
                    outlined
                    dense
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="form.user_metadata.phone"
                    v-mask="maskPhone(form.user_metadata.phone)"
                    label="Telefone"
                    outlined
                    dense
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-textarea
                    v-model="form.user_metadata.about"
                    label="Sobre"
                    outlined
                    dense
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-switch
                    v-model="form.email_verified"
                    label="E-Mail Verificado"
                    flat
                  ></v-switch>
                </v-col>
              </v-row> </v-card
          ></v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-bold"
            >Permissões
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <v-row dense>
                <v-col cols="12" sm="6">
                  <v-switch
                    v-model="form.user_metadata.isSuperuser"
                    label="Administrador"
                    flat
                  ></v-switch>
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
    user: {
      type: Object,
      default: () => ({}),
    },
    companies: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      form: {
        user_metadata: this.user?.user_metadata || {
          isActive: this.user?.isActive || false,
          isSuperuser: this.user?.isSuperuser || false,
          cpf: this.user?.cpf || '',
          phone: this.user?.phone || '',
          firstName: this.user?.firstName || '',
          lastName: this.user?.lastName || '',
          about: this.user?.about || '',
        },
        email_verified: this.user?.email_verified || false,
        email: this.user?.email || '',
        nickname: this.user?.nickname || '',
      },
      snackbar: {
        type: false,
        color: '',
        timeout: 3000,
        message: '',
      },
      panel: [0, 1],
      fab: false,
      showPassword: false,
    }
  },
  methods: {
    maskCpf() {
      return '###.###.###-##'
    },
    maskPhone(value) {
      return value.length === 15 ? '(##) #####-####' : '(##) ####-#####'
    },
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
Footer
