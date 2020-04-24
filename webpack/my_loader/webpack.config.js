//webpack默认支持就是，json，webpack4支持es6
//不支持其他的格式模块，如css、png、vue、jsx、ts……
const path = require('path')
const MyPlugin = require("./MyPlugins/my_plugin")
module.exports = {
    entry: "./src/index.js",
    output: {
        path:path.resolve(__dirname, './dist'),
        filename: "main.js"
    },
    mode: 'development',
    resolveLoader: {//先从node_modules里找，找不到再到MyLoader里找
        modules: ["node_modules", "./MyLoader"]
    },
    /*module: {
        rules: [{
            test: /\.js$/,
            use: [
                // path.resolve(__dirname,"./MyLoader/other-loader.js"),
                // {
                // loader: path.resolve(__dirname,"./MyLoader/my-loader.js"),
                // options: {//参数放这
                //     name: "my_loader"
                // }
                "other-loader",
                {
                loader: "my-loader",
                options: {//参数放这
                    name: "my_loader"
                }
            }]
        }]
    },*/
    plugins: [
        new MyPlugin({
            name: 'myPlugin'
        })
    ]
    

}