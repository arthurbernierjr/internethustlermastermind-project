const path = require("path")
const  webpack = require("webpack")
const HTMLWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// entry is required , output is required, modules is required
// plugins are optional

module.exports = env => {
  return {
    entry: {
      bundle: './src/components/HelloWorld.js'
    },
    output: {
      path: path.resolve(__dirname, 'assets/js'),
      filename: '[name].[chunkhash].js'
    },
    module: {
      rules : [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
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
      new CleanWebpackPlugin('assets/js', {}),
      new WebpackMd5Hash(),
      new HTMLWebpackPlugin({
        template: './src/template/template.html',
        filename: '../index.html'
      })
    ]
  }
}
