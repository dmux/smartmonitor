import colors from 'vuetify/es5/util/colors'
import pt from 'vuetify/es5/locale/pt'

export default {
  target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate:
      'Smart Monitor - Plataforma de gestão e coleta de dados de sensores de IoT.',
    title:
      'Smart Monitor - Plataforma de gestão e coleta de dados de sensores de IoT.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vmask.js', mode: 'client' },
    { src: '~/plugins/apexcharts.js', mode: 'client', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    ['@nuxtjs/vuetify', { treeShake: true }],
    'nuxt-compress',
    '@nuxtjs/dotenv',
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/onesignal',
    '@nuxtjs/sentry',
    '@nuxtjs/pwa',
    [
      'nuxt-vuex-localstorage',
      {
        localStorage: ['user'],
      },
    ],
    [
      'v-currency-field/nuxt-treeshaking',
      {
        locale: 'pt-BR',
        decimalLength: 2,
        autoDecimalMode: true,
        min: null,
        max: null,
        defaultValue: 0,
        valueAsInteger: false,
        allowNegative: true,
      },
    ],
  ],

  sentry: {
    dsn: process.env.SENTRY_DSN,
    config: {},
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL || 'localhost:3000/api',
    proxy: false,
  },

  auth: {
    localStorage: false,
    redirect: {
      login: '/',
      logout: '/',
      home: '/dashboard',
      callback: '/',
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          maxAge: 86400,
          global: true,
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 86398,
        },
        user: {
          property: 'user',
        },
        autoLogout: false,
      },
      auth0: {
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        audience: process.env.AUTH0_AUDIENCE,
        scope: ['openid', 'profile', 'email', 'offline_access'],
        accessType: 'offline',
      },
    },
  },

  oneSignal: {
    init: {
      appId: process.env.ONESIGNAL_APP_ID,
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: true,
      },
    },
  },

  router: {
    middleware: ['auth'],
  },

  moment: {
    plugin: true,
    defaultLocale: 'pt-br',
    locales: ['pt-br'],
    timezone: true,
    defaultTimezone: 'America/Sao_Paulo',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      lang: 'pt-BR',
      description: 'Smart Monitor',
      author: 'Rafael Sales',
    },
    manifest: {
      name: 'Smart Monitor',
      short_name: 'Smart Monitor',
      lang: 'pt-br',
      start_url: '/',
      display: 'fullscreen',
      useWebmanifestExtension: false,
      theme_color: '#ffffff',
      background_color: '#ffffff',
    },
    workboxOptions: {
      skipWaiting: true,
    },
    workbox: {
      dev: false,
      offline: false,
      offlineStrategy: 'StaleWhileRevalidate',
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: 'https://fonts.googleapis.com/.*',
          handler: 'staleWhileRevalidate',
        },
      ],
    },
  },

  render: {
    static: {
      maxAge: 2592000,
    },
  },

  'nuxt-compress': {
    gzip: {
      threshold: 8192,
    },
    brotli: {
      threshold: 8192,
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    lang: {
      locales: {
        pt,
      },
      current: 'pt',
    },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.grey.darken2,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  loading: '@/components/base/Loading.vue',

  generate: {
    fallback: true,
  },

  env: {
    secret: process.env.SECRET,
    auth0Domain: process.env.AUTH0_DOMAIN,
    auth0Audience: process.env.AUTH0_AUDIENCE,
    auth0ClientId: process.env.AUTH0_CLIENT_ID,
    auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
    auth0Token: process.env.AUTH0_TOKEN,
    nodeEnv: process.env.NODE_ENV,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['defu'],
    watch: ['api'],
    extend(config) {
      config.node = {
        fs: 'empty',
        child_process: 'empty',
      }
    },
  },

  serverMiddleware: {
    '/api': '~/api',
  },
}
