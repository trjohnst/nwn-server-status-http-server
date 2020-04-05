const NodemonPlugin = require('nodemon-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const path = require('path');

const getPlugins = (env) => {
  const isProduction = env.production;

  if (isProduction) {
    return [];
  }

  return [
    new NodemonPlugin(),
    new DotenvPlugin()
  ];
};

module.exports = (env = {}) => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].js'
    },
    plugins: getPlugins(env),
    target: 'node'
  }
};