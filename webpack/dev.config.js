const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./base.config.js')
const sourceMap = require('./source-maps')

module.exports = merge(baseConfig, sourceMap, {
  devServer: {
    inline: true,
    contentBase: '../src',
    port: '3001',
    stats: 'minimal',
    clientLogLevel: 'error',
    disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, '../src/scss'),
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                url: false
              }
            },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: './css/[name].css?[hash]',
      allChunks: true
    })
  ]
})
