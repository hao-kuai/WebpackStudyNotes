const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin");
module.exports = {
    entry: './src/index.js',
    mode:"none",//方便看代码未处理样式
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "14- webpack 压缩 index 代码",
            minify: {
                collapseWhitespace: true,//删除空格、换行
            },
        }),
    ]
};