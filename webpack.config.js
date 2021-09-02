const path = require("path");
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: __dirname + "/app/main.js", //入口
  output: {
    path: __dirname + "/build", //打包后存放路径
    filename: "bundle.js", //打包后文件名
  },
  devtool: "eval-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              }, //是否只作用于当前模块(防止样式污染)
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
  plugins:[
      new webpack.BannerPlugin("我是wrm，万人迷"),
      new HtmlWebpackPlugin({
          template:__dirname+"/app/index.tmpl.html"
      }),
      new webpack.HotModuleReplacementPlugin()
  ]
};
