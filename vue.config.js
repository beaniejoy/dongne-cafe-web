const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    hot: true,
    port: process.env.VUE_APP_PORT,
    proxy: {
      '/auth': {
        target: process.env.VUE_APP_LOCAL_AUTH_URI,
        changeOrigin: true, // '/auth' 호출시 도메인을 target으로 변경
      },
      '/api': {
        target: process.env.VUE_APP_LOCAL_SERVICE_URI,
        changeOrigin: true, // '/api' 호출시 도메인을 target으로 변경
      }
    },
  },

  pluginOptions: {
    vuetify: {
    }
  }
})
