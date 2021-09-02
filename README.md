# 关于webpack的一些笔记（非常咸鱼）
1. webpack4到webpack5配置的变化
+ devServer
* webpack-dev-server v4.0.0+ 要求 node >= v12.13.0、webpack >= v4.37.0（但是我们推荐使用 webpack >= v5.0.0）和 webpack-cli >= v4.7.0
- contentBase -> static 提供本地服务器的目录抒写规范变更
- inline -> hot 是否采用模块热更新
- webpack4
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }

- webpack5 
    devServer:{
        static: {
            directory: path.join(__dirname, 'public'),
        },
        hot: true,
        historyApiFallback:true
    }
- css-loader中options，webpack4通过localIdentName属性规定配置生成资源的标识符名称，webpack5中改变了写法，需要将localIdentName定义在
    modules下
2. module -> rules
- rules是webpack模块解析时匹配的规则,相当于form表单的rules校验,它是一个数组,下面是它的几个常用属性
    test:通过正则匹配,可以让它根据不同的模块(css、js、jsx等)去做编译,
    use:用来描述被加载的模块,既可以是一个数组也可以是一个方法,每个入口(数组中的每一个对象)指定使用一个loader,exclude为编译时不匹配的模块,
    除了exclude还有include参数,你可以通过include参数制定自己的规则让webpack帮你只针对特定的模块去做打包
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: () => [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "env", "react"
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    }

    另外,当use作为函数使用时它可以接收一个参数,这里命名为obj
    obj 对象参数有以下的字段（这里偷了懒直接cv的）：
    compiler: 当前 webpack 的编译器（可以是 undefined 值）
    issuer: 模块的路径,该元素正在导入一个被加载的模块(resource)
    realResource: 总会是被加载模块的路径
    resource: 被加载的模块路径,它常常与 realResource 相等,只有当资源名称被 request 字符串中的 !=! 覆盖时才不相等

3. plugin
    关于插件部分，这里只做简单的讲解，常见的插件有html-webpack-plugin、clean-webpack-plugin等
    clean-webpack-plugin用于清楚目录下动态生成的文件，每次打包时删掉之前冗余的文件

    html-webpack-plugin可以依据一个指定的html文件模板，去动态生成打包之后目录下的html文件（这在每次生成的js文件名称不同时非常有用，比如添加了hash值）

4. webpack和babel的关系
    Babel和webpack是独立的工具
    二者可以一起工作
    二者都可以通过插件拓展功能
5. 拆分思想
    另外，可以将webpack.config.js中的配置单独拆分出来(适用于测试环境、线上环境等区分的场景)
    这里可以参考webpack.production.config.js文件

6. package.json文件配置命令行

    为了方便打包，我们将编译所需要的命令通过package.json在scripts下配置好

    注意：如果是window电脑，build需要配置为"build": "set NODE_ENV=production && webpack --config ./webpack.production.config.js --progress".

    mac
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "webpack",
        "server": "webpack-dev-server --open",
        "build": "NODE_ENV=production webpack --config ./webpack.production.config.js --progress"
    },

    windows
    "scripts": {
        "start": "webpack",
        "server": "webpack-dev-server --open",
        "build": "set NODE_ENV=production && webpack --config ./webpack.production.config.js --progress"
    },

7. 学习webpack5的一些感受

    虽然是学习webpack，但是一开始就拿最新的版本去上手了，也踩了很多的坑，大家还是需要去具体的针对webpack老版本和webpack5一些API、插件以及配置
    上的一些区别。


    最后附上我本次学习webpack的参考文章
    https://segmentfault.com/a/1190000006178770