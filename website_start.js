var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    hot: true,
    inline: true,
    // color : true,
    // watch : true,
    // progress : true
    stats: { colors: true },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
});
server.listen(8080);