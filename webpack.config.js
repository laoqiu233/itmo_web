const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].bundle.js",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
            },
            {
                test: /.tsx?$/,
                use: ["babel-loader", "ts-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'api', to: 'api'}
            ]
        })
    ],
    devServer: {
        proxy: {
            '/api': 'http://localhost:3000/'
        }
    }
}