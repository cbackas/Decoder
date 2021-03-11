const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  node: {
    global: false
  },
  
  entry: {
    main: path.resolve(__dirname, 'src/app/main.js'),
    background: path.resolve(__dirname, 'src/app/background.js')
  },

  output: {
    path: path.resolve(__dirname, 'extension/dist'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loaders: [ 'html-loader' ]
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: [ 'css-loader', 'sass-loader' ]
          }
        )
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    new ExtractTextPlugin('[name].css'),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ],

  devtool: 'cheap-module-source-map'
}
