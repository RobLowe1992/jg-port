const ETP = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const parts = require('./webpack.parts');
const path = require('path');
const webpack = require('webpack');

const PATHS = {
  public: path.join(__dirname, 'public'),
  src: path.join(__dirname, 'src'),
  styles: path.join(__dirname, 'src', 'scss'),
};

const options = {
  host: 'localhost',
  port: '8085',
};

const commonConfig = merge([
  {
    entry: PATHS.src,
    output: {
      path: PATHS.public,
      filename: 'bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Jason Ganz Portfolio',
        template: path.join(PATHS.src, 'index.html'),
      }),
      new OpenBrowserPlugin({
        url: `http://${options.host}:${options.port}`,
      }),
      new ETP('style.css'),
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            failOnWarning: false,
            failOnError: true,
            fix: false,

            //       // Output to Jenkins compatible XML
            //       // outputReport: {
            //       //     filePath: 'checkstyle.xml',
            //       //     formatter: require('eslint/lib/formatters/checkstyle'),
            //       // },
          },
        },
      }),
    ],
  },
  // parts.lintJavaScript({include: PATHS.src}),
  // parts.jsHint(),
  parts.loadSASS(PATHS.styles),
  parts.loadJSX(),


]);

const productionConfig = merge([
]);

const developmentConfig = merge([
  parts.devServer({
    host: options.host,
    port: options.port,
    path: PATHS.public,
  }),
]);

module.exports = (env) => {
  if(env == 'development') {
    return merge(commonConfig, developmentConfig);
  }

  return merge(commonConfig, productionConfig);
};
