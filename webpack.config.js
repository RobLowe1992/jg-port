//Variables for Dev Dependencies
const ETP = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const parts = require('./webpack.parts');
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');

//Absolute paths to the Public, SRC, and Styles directories
const PATHS = {
  public: path.join(__dirname, 'public'),
  src: path.join(__dirname, 'src'),
  styles: path.join(__dirname, 'src', 'scss'),
};

//Reference to the host name and port number
const options = {
  host: 'localhost',
  port: '8085',
};

//Configuration used for both the Development and Production Environment
const commonConfig = merge([
  {
    entry: {
      index: PATHS.src,
      vendor: [
        'react',
        'react-dom'
      ]
    },
    output: {
      path: PATHS.public,
      filename: '[name].bundle.js',
    },
    //Additional Plugins
    plugins: [
      //Creates an index.html file while linking each file required for our application to run
      new HtmlWebpackPlugin({
        title: 'Jason Ganz Portfolio',
        template: path.join(PATHS.src, 'index.html'),
      }),
      //Opens the application on the specified port at runtime
      new OpenBrowserPlugin({
        url: `http://${options.host}:${options.port}`,
      }),
      //Extracts CSS to a seperate file called style.css
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
      //Splits specified code in the vendor array in the entry object to a vendor.bundle.js file
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
      parts.purifyCSS({
        paths: glob.sync(`${PATHS.src}/**/*.js`, {nodir: true}),
      }),
    ],
  },
  // Imports SASS loader
  parts.loadSASS(PATHS.styles),
  // Imports Babel loader
  parts.loadJSX(),


]);
//Production environment configuration additions
const productionConfig = merge([
  parts.attachRevision(),
  //Generates Source Maps for js files
  parts.generateSourceMaps({ type: 'source-map' }),
]);
//Development environment configuration additions
const developmentConfig = merge([
  parts.devServer({
    host: options.host,
    port: options.port,
    path: PATHS.public,
  }),
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
  },
  parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
]);

//Exports Configuration based on environment
module.exports = (env) => {
  if(env == 'development') {
    return merge(commonConfig, developmentConfig);
  }

  return merge(commonConfig, productionConfig);
};
