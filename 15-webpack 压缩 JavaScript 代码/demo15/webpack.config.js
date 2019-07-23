const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    mode:"production",
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "15- webpack 压缩 JavaScript 代码",
            minify: {
                collapseWhitespace: true,//删除空格、换行
            },
        }),
    ],
};