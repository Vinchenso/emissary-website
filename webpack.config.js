'use strict'
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      modules: true,
      minimize: true
    }
  },
  {
    loader: 'sass-loader'
  }
]
module.exports = {
  context: __dirname + '/source',
  entry: {
    'main': ['./javascripts/site.js', './stylesheets/site.scss']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
     {
       test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
       use: [{
         loader: 'file-loader',
         options: {
           name: '[name].[ext]',
           outputPath: 'fonts/',    // where the fonts will go
           publicPath: '../'       // override the default path
         }
       }]
     },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader'},
            {loader: 'sass-loader'},
          ]
        })
      },
    ],//end rules
  },
  output: {
    path: __dirname + '/build/',
    filename: 'javascripts/[name].bundle.js',
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin('stylesheets/[name].bundle.css'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false, // remove comments
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        drop_debugger: true
      }
    }),
  ],
};
