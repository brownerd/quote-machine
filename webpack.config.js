// var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var pixrem = require('pixrem');
var pseudoelements = require('postcss-pseudoelements');

// var style = require('./src/stylus/style.styl');

module.exports = {

  entry: './src/es6/index.js',

  output: {
    path: './dist',
    filename: 'app.js'
  },

  // output: {
  //   path: './dist', //Path to build, public or dist
  //   //publicPath: '/',
  //   filename: 'main.js'
  // },

  devtool: 'eval',
  // http://webpack.github.io/docs/build-performance.html
  // devtool: "eval-source-map"
  // devtool: "eval-cheap-module-source-map"
  // devtool: "eval-cheap-source-map"
  // devtool: "eval"

  eslint: {
    configFile: './.eslintrc.js'
  },

  module: {
    // preLoaders: [
    //   {test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/}
    // ],
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.jsx?$/, // Only run `.js` and `.jsx` files through Babel

        // Options to configure babel with
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0'],
        }
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jade$/,
        loader: 'jade-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader', '!css-loader!postcss-loader!stylus-loader'),
      },
      // {
      //   test: /\.styl$/,
      //   //include: './src/stylus/',
      //   //include: path.join(__dirname, 'src/stylus'),
      //   //loader: 'style-loader!css-loader!postcss-loader!stylus-loader',
      //   loader: 'style-loader!css-loader!stylus-loader',
      //   exclude: /node_modules/,
      // },
    ]
  },
  postcss: function () {
    return [
      autoprefixer({ browsers: ['ie >= 8', 'ie_mob >= 10', 'ff >= 3.6', 'chrome >= 10', 'safari >= 5.1', 'opera >= 11', 'ios >= 7', 'android >= 4.1', 'bb >= 10'] }),
      cssnano,
      pixrem
    ];
  },
  plugins: [
    // Serve bundle from localhost:8080
    // Launch in canary automatically
    new OpenBrowserPlugin({
      url: 'http://localhost:8080',
      browser: 'google chrome canary'
    }),
    // Dynamically generate an index.html page
    // Bundle will be automatically added as a script
    new HtmlWebpackPlugin({
      template: './src/jade/index.jade'
    }),
    new ExtractTextPlugin('style.css', {
      allChunks: true
  })
  ]
}
