var webpack = require('webpack'),
    path = require('path'),
    WebpackMd5Hash = require('webpack-md5-hash'),
    fs = require('fs'),
    pkg = require('./package.json'),
    webroot = process.env.WEBROOT,
    merge = require('merge'),
    isDev = process.env.npm_lifecycle_event === "dev",
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    hash = isDev?'[hash:8]':'[chunkhash:8]',
    _chunks = [],
    oConfig = getOEntry(),
    cfg_eslint = { //eslint配置
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
    },
    _exports = { //基础配置
        entry: oConfig.oEntry,
        output: {
            path: path.join(__dirname, webroot, 'dist'),
            filename: `js/[name].js?v=${hash}`
        },
        devtool: '#source-map',
        module: {
            rules: getRules()
        }
    },
    _plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'global', // 将公共模块提取，生成名为`global`的chunk
            chunks: _chunks, //提取哪些模块共有的部分
            minChunks: Infinity // 提取至少2个模块共有的部分
        }),
        new ExtractTextPlugin({ filename: `css/[name].css?v=[contenthash:8]` }),
        new WebpackMd5Hash()
    ];

//生成入口对象
function getOEntry() {
    var routerPath = './' + webroot + '/src/router/',
        oEntry = {

        },
        aHtmlWebpackPlugin = [],
        files = fs.readdirSync(routerPath); //遍历router文件夹的文件

    files.forEach(function(item) {
        var tmp = item.split('.');
        if (tmp[1] !== 'js') {
            return;
        }
        _chunks.push(tmp[0]);
        oEntry[tmp[0]] = [
            [routerPath, item].join('')
        ];
        if (tmp[0] === "global") {
            return;
        }
        var fileSrc = tmp[0] + '.html';
        aHtmlWebpackPlugin.push(new HtmlWebpackPlugin({
            template: path.join(__dirname, webroot, 'src', 'templates', fileSrc),
            filename: fileSrc,
            chunks: ["global", tmp[0]],
            minify: false
        }));
    });

    return {
        oEntry: oEntry,
        aHtmlWebpackPlugin: aHtmlWebpackPlugin
    };
}

function getExports() {
    var plugins = isDev ? [..._plugins, new webpack.HotModuleReplacementPlugin()] : _plugins;

    _exports.plugins = plugins.concat(oConfig.aHtmlWebpackPlugin);

    if (isDev) {
        _exports = merge(_exports, {
            devServer: {
                host: 'localhost',
                // host: os.networkInterfaces().eth1 ? os.networkInterfaces().eth1[0].address : os.networkInterfaces()['本地连接'][1].address,
                port: 8080,
                inline: true, //可以监控js变化
                hot: true, //热启动
            },
            watch: true,
            watchOptions: {
                poll: true
            }
        })
    };
    return _exports;
}

function getRules() {
    var rules = [{
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015']
        }
    }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
                loader: "css-loader"
            }, {
                loader: 'postcss-loader'
            }, {
                loader: "sass-loader"
            }]
        })
    }, {
        test: /\.(png|jpg|gif|eot|woff2|woff|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: `images/[name].[ext]?v=[hash:8]`,
                publicPath : '../'
            }  
          }
        ]
    }, {
        test: /\.(htm|html)$/i,
        use: [{
            loader: 'html-loader',
            options: {
              attrs: ['img:src',':data-source'],
              minimize: false
            }
        }]
    }];
    return isDev ? [cfg_eslint, ...rules] : rules;
}

module.exports = getExports()