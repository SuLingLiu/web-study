const path = require('path');
const HtmlWebpackPlugin =  require("html-webpack-plugin");
const {CleanWebpackPlugin} =  require("clean-webpack-plugin");
module.exports = {
  entry: {
    index: "./src/index.js",
    login: "./src/login.js"
    
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