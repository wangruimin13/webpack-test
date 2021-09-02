const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry:__dirname+"/app/main.js",
    output:{
        path:__dirname+"/build",
        filename:"bundle.[hash].js"
    },
    devServer: {
        static: {
          directory: path.join(__dirname, "public"),
        },
        hot: true,
        historyApiFallback: true,
    },
    module: {
        rules:[{
            test:/(\.jsx|\.js)$/,
            use:{
                loader:"babel-loader"
            },
            exclude:/node_modules/
        },{
            test:/\.css$/,
            use:[
                {
                    loader:"style-loader"
                },{
                    loader:"css-loader",
                    options:{
                        modules:true
                    }
                },{
                    loader:"postcss-loader"
                }
            ]
        }]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:__dirname+"/app/index.tmpl.html"
        }),
        new CleanWebpackPlugin()
    ]
}