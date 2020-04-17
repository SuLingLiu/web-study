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
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            // loader: 'file-loader',
            loader: 'url-loader',
            options: {
              name: "[name].[ext]",//ext后缀
              outputPath: "images/",
              limit: 20480//小于这个值会被转换成base64
            }
          }
        ]
      },
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
        // use: {
        //   loader: "babel-loader",
        //   options: {
        //     presets: [[
        //       "@babel/preset-env",
        //       {
        //         targets: {
        //           edge: "17",
        //           firefox: "60",
        //           chrome: "67",
        //           safari: "11.1"
        //         },
        //         useBuiltIns: "usage"//安需注入
        //       }
        //     ]]
        //   }
        // }
      }
    ]
  },
  //插件配置
  plugins: [
    new webpack.HotModuleReplacementPlugin()//webpack自带插件
  ]
}

module.exports = merge(baseConfig, devConfig)