const HtmlWebpackPlugin = require('html-webpack-plugin');
const openBrowserPlugin = require('open-browser-webpack-plugin');
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
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Jason Ganz Portfolio',
            template: path.join(PATHS.src, 'index.html')

        }),
        new openBrowserPlugin({
            url: `http://${options.host}:${options.port}`
        })
    ],
}

const devServer = {
    devServer: {
        compress: true,
        contentBase: PATHS.public,
        historyApiFallback: true,
        host: options.host,
        inline: true,
        port: options.port,
        open: true,
        stats: 'errors-only'
    }
}

module.exports = (env) => {
    if(env == 'development') {
        return Object.assign({}, devServer, commonConfig);
    }

    return Object.assign({}, commonConfig);
}
