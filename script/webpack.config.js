const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}

module.exports = {
    mode: "development",
    entry: resolve('../src/index.js'),
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(css|less)$/,
                use: [{
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions:{
                                javascriptEnabled: true,
                            }
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader'
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'demo',
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        static: resolve('.'),
        hot: true,
        historyApiFallback: true,
        compress: true,
        open: true,
        host: '127.0.0.1',
        port: 1234
    },
};