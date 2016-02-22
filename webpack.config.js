/**
 * Created by Tanatorn on 2/9/2016.
 */
const debug = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const path = require('path')


module.exports = {
    context: path.join(__dirname, '/'),
    devtool: debug ? 'inline-sourcemap' : null,
    entry: ['webpack/hot/dev-server', './src/index.js'],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },

    output: {
        path: __dirname + '/app',
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/src/'

    },
    devServer: {
        contentBase: './app',
        publicPath: 'http://localhost:8080/src/'
    },
    plugins: debug ? [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(new RegExp('^(fs|ipc|recursive-readdir)$'))

    ] : [
        new webpack.IgnorePlugin(new RegExp('^(fs|ipc|recursive-readdir)$')),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ]
}
