module.exports = {
  module: {
    output: {
      filename: 'webpack-bundle.js',
    },
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  }
};
