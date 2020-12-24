const path = require("path"); //модуль, чтобы работать с путями файлов
const HtmlWebpackPlugin = require("html-webpack-plugin"); //подключаем html плагин
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //требуется плагин очистки
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//плагин css

module.exports = {
    entry: {
        main: "./src/pages/index.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        publicPath: "",
    },
    module: {
        rules: [
            {
                test: /\.css$/,    //регулярка если файл оканчивается css, то использовать лоадеры (справа налево)
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: { importLoaders: 1 }
                },
                    'postcss-loader',
                ],
            },
            {
                test: /\.(svg|png|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.js$/,    //если ты найдешь файл, оканчивающийся на js, используй этот лоадер. Но! не используй файлы из папки node_modules
                use: 'babel-loader',
                exclude: '/node_modules/'
            },
        ],
    },

    devServer: {//задаем сервер 
        contentBase: path.resolve(__dirname, "./dist"),
        compress: true,
        port: 8080,
        open: true,
    },
    mode: 'development',
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],
};