const webpack = require('webpack');
const path = require('path');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },

  entry: {
    app: './src/app',
    cli: './src/cli',
    api: './src/api',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    // filename: '[name].[hash].js',
    filename: '[name].[chunkhash].js'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
              typeCheck: true,
              emitErrors: true,
              fix: false,
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          // priority: -10,
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          filename: "vendors.[chunkhash].js",
          // reuseExistingChunk: true,
          chunks: 'all'
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true,
    }
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: "dist"
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'template.html')
    })
  ]
};
