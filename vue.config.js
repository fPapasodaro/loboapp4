module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/loboapp4/'
    : '/',
  "transpileDependencies": [
    "vuetify"
  ]
}