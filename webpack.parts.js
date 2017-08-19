const ETP = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack')

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
      loader: ['style-loader','css-loader'],
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
      loader: ETP.extract({
        fallback: 'style-loader',
        use: 'css-loader!postcss-loader!sass-loader',
      }),
      include: path,
    }],
  },
});


exports.purifyCSS = ({ paths }) => (new PurifyCSSPlugin({paths}))



