const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function generateHtmlPlugins (templateDir) {
  return fs
    .readdirSync(path.resolve(__dirname, templateDir))
    .filter(file => path.extname(file).toLowerCase() === '.html')
    .map(item => {
      const parts = item.split('.')
      const name = parts[0]
      const extension = parts[1]
      return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
        inject: true
      })
    })
}

const htmlPlugins = generateHtmlPlugins('../src')

module.exports = {
  htmlPlugins
}
