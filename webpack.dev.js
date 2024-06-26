const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: './dist',
    hot: true,
    open: true,
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
  },
});
