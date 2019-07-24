const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    mode:"production",
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                ]
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                    },
                    "css-loader"
                ]
            },
            //添加loader
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    "file-loader",
                    'image-webpack-loader',
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "15- webpack 压缩 JavaScript 代码",
            minify: {
                collapseWhitespace: true,//删除空格、换行
            },
        }),
        //添加插件
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        //添加插件
        new OptimizeCSSAssetsPlugin({})
    ],
};