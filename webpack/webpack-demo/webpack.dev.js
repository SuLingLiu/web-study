const path = require('path');
const webpack = require('webpack')
const baseConfig = require("./webpack.base.js")
const merge = require("webpack-merge")// npm i webpack-merge -D
const devConfig = {
  output: {//输出结构
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  mode: "development",//打包环境'development' or 'production'
  devtool: "cheap-module-eval-source-map",
  watch: true,
  watchOptions: {
    //默认为空，不监听的文件或者目录，支持正则
    ignored: /node_modules/,
    //监听到文件变化后，等300ms再去执行，默认300ms
    aggregateTimeout: 300,
    //判断文件是否发生变化是通过不停的询问系统指定文件有没有变化，默认每秒一次,以毫秒为单位
    poll: 1000
    
  },
  devServer: {
    contentBase: "./dist",
    open: true,//自动打开浏览器
    port: 8081,
    hot: true,
    hotOnly: true,
    proxy: {//解决跨域
      "/api": {
        target: "http://localhost:8082"
      }
    }
  },
  module: {//loader模块处理
    rules: [
      
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader",{
          loader: "postcss-loader",
          options: {
            plugins: () => [
              require("autoprefixer")({
                overrideBrowserslist: ["last 2 versions", ">1%"]
              })
            ]
          }
        }]
      },
    ]
  },
  //插件配置
  plugins: [
    new webpack.HotModuleReplacementPlugin()//webpack自带插件
  ]
}

module.exports = merge(baseConfig, devConfig)