var path = require('path');
var webpack = require('webpack');
var sassLoader = 'style!css!sass?sourceMap=true&sourceMapContents=true';
// var sassLoader = 'style!css?modules&localIdentName=[name]__[local]-[hash:base64:5]!sass?sourceMap=true&sourceMapContents=true';


module.exports = {
  devtool: 'source-map',
  // devtool: 'cheap-module-eval-source-map',
  entry: {
    app: ['webpack-hot-middleware/client', './js/app.js'],
    tab: ['webpack-hot-middleware/client', './js/OOtab.js'],
    home: ['webpack-hot-middleware/client', './js/home.js'],
    // 'client': 'webpack-hot-middleware/client',
    // 'app': './js/app.js',
    // 'tab':'./js/tab.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/static/',
  },
  // mode: 'development',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'js'),
        ],
        loaders: ['react-hot', 'babel'],
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'css'),
        ],
        loader: 'style!css!sass?sourceMap=true&sourceMapContents=true',
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'css'),
        ],
        loader: 'style!css?modules&localIdentName=[name]__[local]-[hash:base64:5]'
      },
    ],
  },
  resolve: {
    alias: {
      // 'react': path.join(__dirname, 'node_modules', 'react'),
    },
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
};
