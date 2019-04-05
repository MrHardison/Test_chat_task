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
		{ src: '~/plugins/localstorage.js', ssr: false }
  ],

	/*
  ** Nuxt.js modules
  */
 	modules: [
	// Global sass
		['@nuxtjs/style-resources']
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

