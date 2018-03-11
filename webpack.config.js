var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
module.exports = {
    entry: {
        lib: ['jquery', 'axios'],
        app: [  __dirname + '/views/index.html'],
    },
    output: {
        path: __dirname + '/dist/tmp',
        filename: '[name].bundle.js',
        publicPath: '/dist/tmp',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [ 'env']
                }
            },
            // {
            //     test: /\.jsx?$/,
            //     exclude: /node_modules/,
            //     loaders: ['babel-loader']
            // },
            // {
            //     test: /\.less$/,
            //     loader: ExtractTextPlugin.extract({
            //         use: [
            //             {
            //                 loader: "css-loader"
            //             }, {
            //                 loader: 'postcss-loader',
            //                 options: {
            //                     ident: 'postcss',
            //                     plugins: autoprefixer({
            //                         browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
            //                         flexbox: 'no-2009'
            //                     }),
            //                 },
            //             }, {
            //                 loader: `less-loader?{"modifyVars":${JSON.stringify({"primary-color": "#6e91ec"})}}`
            //             }
            //         ],
            //         fallback: "style-loader"
            //     })
            // },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                                minimize: true
                            },
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: () => [
                                    autoprefixer({
                                        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                                        flexbox: 'no-2009'
                                    })
                                ],
                            },
                        }
                    ],
                    fallback: "style-loader",
                }),
            }
        ],
    },
    resolve: {
        extensions: ['.web.js', '.js', '.jsx', '.json']
    },
    devServer: {
        contentBase: './',
        port: 3003,
        inline: true,
        open: true,
        historyApiFallback: false,
        host: '127.0.0.1'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                // 'NODE_ENV': JSON.stringify('development'),
                // 'BASEURL': JSON.stringify("//cs.pc.test.shbaoyuantech.com")
                // 'BASEURL': JSON.stringify("http://192.168.1.119:8090/cnhutong-cs-pc")
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            // ReactDOM: "react-dom",
            // ReactRouterDOM: "react-router-dom",
            // ReactRedux: 'react-redux',
            // Base: __dirname + '/src/base.js'
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin({name: 'lib', filename: 'lib.bundle.js', minChunks: Infinity})
    ],
    cache: true
};
