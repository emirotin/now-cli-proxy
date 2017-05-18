const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: [
    './postinstall.js'
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'postinstall.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
