const path = require('path')

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
      }
    ]
  },

  devtool: 'source-map'
}
