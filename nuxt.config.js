module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'chat-task',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&amp;subset=cyrillic'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css'
      }
    ]
  },
  /*
  ** Customize the progress bar color
  */
	loading: { color: '#90ca2a' },

	/*
  ** Global CSS
  */
	css: [
    '@/assets/sass/base.sass',
    '@/assets/sass/style.sass'
	],

	/*
  ** Plugins to load before mounting the App
  */
	plugins: [
		'~/plugins/lodash',
		{ src: '~/plugins/scroll.js', ssr: false },
		{ src: '~/plugins/localstorage.js', ssr: false }
  ],

	/*
  ** Nuxt.js modules
  */
 	modules: [
	// Global sass
    ['@nuxtjs/style-resources'],

    // Using FontAwesome as module
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab']
          },
          {
            set: '@fortawesome/free-regular-svg-icons',
            icons: ['far']
          }
        ]
      }
    ]
	],

	styleResources: {
		sass: ['@/assets/sass/variables.sass']
	},

	/*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

