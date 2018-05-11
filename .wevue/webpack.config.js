var webpack = require('webpack')
require('./@pre-build')
var path = require('path')
var utils = require('./@base/utils.js')

var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

/**
 * @lzq
 * project app.json ->advance ->js|css list
 */
var jsList = []
var cssList = []
var appConfig = require('./src/app.json')
var appAdvanceConfig = appConfig.advance || {}
jsList = appAdvanceConfig.js || []
cssList = appAdvanceConfig.css || []


/**
 * @lzq
 * app window窗口的配置 类似小程序，添加了项目icon的配置
 */
var appWindowConfig = {}
appWindowConfig = appConfig.window||{}
appWindowConfig.title = appWindowConfig.navigationBarTitleText||appAdvanceConfig.title||''
appWindowConfig.icon = appWindowConfig.icon||appAdvanceConfig.icon||''

var distpath = process.env.DIST_PATH || '/'

var conf = {
    entry: ['babel-polyfill', './@base/main-entry.js'],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            'wevue-tools': path.resolve(__dirname, './@wevue-tools/src/'),
            layouts: path.resolve(__dirname, './@layout'),
            plugins: path.resolve(__dirname, './src/plugins'),
            components: path.resolve(__dirname, './src/components'),
            directives: path.resolve(__dirname, './src/directives'),
            mixins: path.resolve(__dirname, './src/mixins'),
            vueroot: path.resolve(__dirname, './src'),
            webpackroot: path.resolve(__dirname, './')
        },
        extensions: [
            ".webpack.js", ".web.js", ".js", ".json",
            ".vue"
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: distpath,
        filename: 'wevue-runtime.[name].js?t=[hash]',
        chunkFilename: "wevue.[id].js?t=[hash]"
    },
    context: __dirname,
    node: {
        __dirname: true
    },
    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                },
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|woff|ttf)/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]?[hash]'
                    }
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        host: "0.0.0.0",
        compress: true,
        disableHostCheck: true,
        port: Number(process.env.PORT || 8080)
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'src',
                to: '',
                ignore: [
                    'components/**',
                    'directives/**',
                    'deps/**',
                    'private/**',
                    'pages/**',
                    'mixins/**',
                    'plugins/**',
                    'app.*dep.js',
                    'app.css',
                    'app.js',
                    'app.vue',
                    'app.json',
                    'vue.conf.js',
                    'webpack-merge.conf.js',
                    'global.css',
                    'routes.js',
                    'app.wxml',
                    'app.wxss',
                    'global.wxss',
                    'plugin.json'
                ]
            }
        ]),
        new HtmlWebpackPlugin({
            cache: false,
            hash: true,
            showErrors: true,
            title: appWindowConfig.navigationBarTitleText||appWindowConfig.title||'wevue',
            icon:appWindowConfig.icon||'./images/logo.ico',
            template: "./@template/index.html",
            server: (process.env.SERVER || '').replace(/;/g, ':'),
            env: (JSON.stringify(utils.__getWevueEnv__(process.env))),
            filename: (appAdvanceConfig.buildOutputFileName?(appAdvanceConfig.buildOutputFileName):'index.html'),
            excludeAssets: [new RegExp("^" + distpath + "wevue-runtime.main.js", "i")]
        }),
        new HtmlWebpackExcludeAssetsPlugin(),
        new HtmlWebpackIncludeAssetsPlugin({
            files: [(appAdvanceConfig.buildOutputFileName?(appAdvanceConfig.buildOutputFileName):'index.html')],
            assets: utils.getAssetsList({ jsList: jsList, cssList: cssList }),
            append: true,
            hash: true,
            publicPath: false
        })
    ]
}
module.exports = conf

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            compress: {
                warnings: false,
                screw_ie8: true
            },
            comments: false
        })
    ])
} else {
    module.exports.devtool = '#eval'
}

var mergeProjectWebpackConfig = require("./src/webpack-merge.conf")
if (mergeProjectWebpackConfig) {
    if (mergeProjectWebpackConfig.hasOwnProperty("install")) {
        var newConfig = mergeProjectWebpackConfig.install(module.exports)
        if (!newConfig) {
            console.error("illegal webpack config")
        } else {
            console.error("webpack config plus")
            module.exports = mergeProjectWebpackConfig.install(module.exports) || {}
        }
    }
}