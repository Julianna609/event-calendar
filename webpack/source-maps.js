const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  devtool: isDev ? 'eval-source-map' : 'none'
}
