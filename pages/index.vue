<template>
  <v-app id="inspire">
    <span class="bg" />
    <v-main>
      <v-container class="fill-height" fluid>
        <v-container class="fill-height">
          <v-row no-gutters fluid align="center">
            <v-col cols="12" md="4" lg="4" align="center">
              <Logo size="250px" image="/icon.png" />
            </v-col>
            <v-col cols="12" md="8" lg="8">
              <v-container>
                <v-row justify="center" align="center">
                  <v-col cols="12" md="6" lg="6">
                    <v-card>
                      <v-card-text align="center">
                        <p class="text-h6">Bem-vindo</p>
                        <p>Faça login para continuar</p>
                        <Auth />
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Auth from '@/components/base/Auth'
import Logo from '@/components/base/Logo'

export default {
  name: 'Login',
  components: {
    Auth,
    Logo,
  },
  layout: 'blank',
  data() {
    return {}
  },
}
</script>

<style scoped>
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #eee;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #eee;
}
.theme--light.v-btn {
  color: rgba(0, 0, 0, 0.54);
}
.v-footer {
  opacity: 0;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/background.jpg') no-repeat center center;
  background-size: cover;
  background-color: black;
  transform: scale(1.1);
}
</style>
