const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const PATHS = {
    public: path.join(__dirname, "public"),
    src: path.join(__dirname, "src")
}

const options = {
    host: 'localhost',
    port: '1234'
}

const commonConfig = {
    entry: PATHS.src,
    output: {
        path: PATHS.public,
        filename: "bundle.js"
    },
    module:{
        loaders: [{
            test: /\.scss$/,
            loader: ["style-loader","css-loader","sass-loader"]
        },{
            test: /\.css$/,
            loader: ['style-loader','css-loader']
        },{
            test: /\.js$/,
            exclude: '/node_modules/',
            loader: 'babel-loader',
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react']
            }
        }]
    },
    devServer: {
        compress: true,
        contentBase: PATHS.public,
        historyApiFallback: true,
        host: options.host,
        inline: true,
        open: true,
        stats: 'errors-only'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Jason Ganz Portfolio',
            template: path.join(PATHS.src, 'index.html')

        })
    ]
}

module.exports = () => Object.assign({}, commonConfig);
