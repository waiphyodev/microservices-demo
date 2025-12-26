require("dotenv").config();
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        clean: true,
    },
    performance: {
        hints: false,
        maxEntrypointSize: 500000, // 50 KB
        maxAssetSize: 500000,
    },
    devServer: {
        allowedHosts: "all",
        client: {
            overlay: true,
            progress: true,
        },
        port: process.env.PORT,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
        proxy: [
            {
                context: ["/api"],
                target: process.env.SERVER_URL,
                pathRewrite: { "^/api": "/api" },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
    ],
};
 