const path = require('path');
const HtmlWebpackPlugin =  require("html-webpack-plugin");
const {CleanWebpackPlugin} =  require("clean-webpack-plugin");




module.exports = {
  entry: {
    index: "./src/index.js",
    login: "./src/login.js"
    
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
    new HtmlWebpackPlugin({
      title: '首页',
      template: "./src/index.html",
      inject: true,
      chunks: ['index'],
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      title: '注册',
      template: "./src/index.html",
      inject: true,
      chunks: ['login'],
      filename: "login.html"
    }),
    new CleanWebpackPlugin(),
    
  ]
}