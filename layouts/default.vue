<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list dense>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-group :value="true" prepend-icon="mdi-shield-crown-outline">
          <template #activator>
            <v-list-item-title>Administração</v-list-item-title>
          </template>

          <v-list-group :value="true" no-action sub-group>
            <template #activator>
              <v-list-item-content>
                <v-list-item-title>Plataforma</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="([name, icon, to], i) in admins"
              :key="i"
              :to="to"
              router
              exact
            >
              <v-list-item-title v-text="name"></v-list-item-title>

              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
      <template #append>
        <div class="pa-2">
          <v-btn block color="secondary" @click="logout()"> Sair </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        :color="$vuetify.theme.dark ? 'light' : 'dark'"
        @click="toggleTheme()"
      >
        <v-icon v-if="$vuetify.theme.dark == false"> mdi-weather-night </v-icon>
        <v-icon v-else> mdi-weather-sunny </v-icon>
      </v-btn>
      <v-avatar size="26px">
        <v-btn icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </v-avatar>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-title>Notificações</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span class="text-caption">
        Logado como:
        <b v-if="$store.state.auth.user">{{ $store.state.auth.user.email }}</b>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  auth: true,
  data() {
    return {
      user: {},
      clipped: false,
      drawer: false,
      fixed: false,
      admins: [
        ['Usuários', 'mdi-account', '/admin/users'],
        ['Configurações', 'mdi-cog', '/admin/settings'],
      ],
      settings: [],
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/dashboard',
        },
        {
          icon: 'mdi-devices',
          title: 'Dispositivos',
          to: '/devices',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '',
    }
  },
  mounted() {
    const theme = localStorage.getItem('useDarkTheme')
    if (theme) {
      if (theme === 'true') {
        this.$vuetify.theme.dark = true
      } else this.$vuetify.theme.dark = false
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
    refresh() {
      this.$nuxt.refresh()
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('useDarkTheme', this.$vuetify.theme.dark.toString())
    },
  },
}
</script>
