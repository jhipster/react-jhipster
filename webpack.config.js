const webpack = require('webpack');

const path = require('path');

const ROOT = path.resolve(__dirname, '.');

const TEST = process.argv.indexOf('--test') > -1;

function root(args) {
  return path.join.apply(path, [ROOT].concat(args));
}

module.exports = {
  devtool: 'inline-source-map',
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules'],
  },

  entry: root('react-jhipster.ts'),

  output: {
    path: root('bundles'),
    publicPath: '/',
    filename: 'react-jhipster.umd.js',
    libraryTarget: 'umd',
    library: 'react-jhipster',
  },

  optimization: {
    moduleIds: 'named',
  },

  // require those dependencies but don't bundle them

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(j|t)sx?$/,
        loader: 'eslint-loader',
        exclude: [root('node_modules')],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [/\.e2e\.ts$/],
      },
    ],
  },

  externals: TEST
    ? {
        cheerio: 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      }
    : {
        axios: true,
        dayjs: true,
        lodash: true,
        react: true,
        'react-dom': true,
        'react-hook-form': true,
        'reactstrap': true,
      },
};
