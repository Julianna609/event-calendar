const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { htmlPlugins } = require('./utils')

module.exports = {
  entry: {
    libs: ['./src/js/libs.js', './src/scss/libs.scss'],
    app: ['./src/js/app.js', './src/scss/app.scss']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './js/[name].js?[hash]'
  },

  resolve: {
    extensions: ['.js', '.scss'],
    modules: ['../src', '../node_modules']
  },

  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              publicPath: '../'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              outputPath: './images/',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src/js'),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  plugins: [
    ...htmlPlugins
  ]
}
