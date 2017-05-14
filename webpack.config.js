var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var DashboardPlugin = require('webpack-dashboard/plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var WebpackNotifierPlugin = require('webpack-notifier')

var outputPath = 'build/'
var isProduction = process.env.NODE_ENV === 'production'

var config = {
    cache: true,
    entry: {
        app: './src/js/index.js',
    },
    output: {
        path: path.join(__dirname, outputPath),
        publicPath: '',
        filename: 'js/[name].js',
        chunkFilename: 'js/[chunkhash].js',
        libraryTarget: 'assign',
        library: '[name]',
    },
    devtool: isProduction ? 'source-map' : 'eval',
    module: {
        rules: [{
            test: /\.js$/, // include .js files
            enforce: 'pre', // preload the eslint loader
            exclude: [
                /node_modules/,
                /build/,
            ], // exclude all files in the node_modules and build folder
            use: [{
                loader: 'eslint-loader',
            }],
        },
        {
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.html$/,
            loader: 'html-loader',
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: isProduction,
                    },
                },
                    'postcss-loader',
                ],
            }),
        },
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new CleanWebpackPlugin(outputPath),
        new ExtractTextPlugin({
            disable: !isProduction,
            filename: 'css/[name].[chunkhash].css',
            allChunks: true,
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new WebpackNotifierPlugin({title: 'Leszek właśnie zbudował CV'}),
    ],
    devServer: {
        contentBase: path.join(__dirname, outputPath),
        compress: false,
        hot: true,
        inline: true,
        watchContentBase: true,
        open: true,
        port: 8000,
    },
}

if (isProduction) {
    config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        sourcemap: true,
        minimize: true,
        compress: {
            warnings: true,
        },
    }),
    new CopyWebpackPlugin([{
        from: 'src/favicon.ico',
    }])
  )
} else {
    config.plugins.push(
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = config
