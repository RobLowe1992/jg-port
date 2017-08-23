const ETP = require('extract-text-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const webpack = require('webpack');

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
});

exports.devServer = ({host, port, path} = {})=> ({
  devServer: {
    compress: true,
    contentBase: path,
    historyApiFallback: true,
    host,
    port,
    overlay: {
      errors: true,
      warnings: true,
    },
    stats: 'errors-only',
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.loadCSS = () => ({
  module:{
    loaders: [{
      test: /\.css$/,
      loader: ETP.extract({
        fallback: 'style-loader',
        use: 'css-loader!postcss-loader',
      }),
    }],
  },
});

exports.loadJSX = () => ({
  module:{
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: '/node_modules/',
      loader: 'babel-loader',
    }],
  },
});

exports.loadSASS = (path) => ({
  module: {
    loaders: [{
      test: /\.(css|sass|scss)$/,
      use: ETP.extract({
        fallback: 'style-loader',
        use: 'css-loader!postcss-loader!sass-loader',
      }),
      include: path,
    }],
  },
});


exports.purifyCSS = ({ paths }) => (new PurifyCSSPlugin({paths}))



