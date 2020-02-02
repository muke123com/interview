const webpack = require('webpack');
module.exports = {
    /*********基本配置***********/
    entry: __dirname + '/app/main.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    /*********sourcemaps***********/
    devtool: 'source-map',
    /*********本地服务器***********/
    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        inline: true
    },
    /*********loaders***********/
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader",
            },
            exclude: /node_modules/
        },{
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }
            ]
        }]
    },
    /*********插件***********/
    plugins: [
        new webpack.BannerPlugin({
            banner: '版权所有'
          })
    ]
}