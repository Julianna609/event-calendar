const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./base.config')
const sourceMap = require('./source-maps')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = merge(baseConfig, sourceMap, {
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
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
                sourceMap: false,
                url: false
              }
            },
            {
              loader: 'postcss-loader'
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
    }),

    new MinifyPlugin({
      removeConsole: true, // Remove console on production
      removeDebugger: true // Remove debuggers on production
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()]
      }
    })
  ]
})
