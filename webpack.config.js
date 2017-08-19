  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/js/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './',
        publicPath: './public/'
    },
    plugins: [
    //   new CleanWebpackPlugin(['public/js']),
    //   new HtmlWebpackPlugin({
    //     title: 'Development'
    //   })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'public/js')
    }
  };