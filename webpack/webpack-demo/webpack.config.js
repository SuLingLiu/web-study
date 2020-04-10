const path = require('path');

module.exports = {
  //entry: "./src/index.js",//打包入口文件
  entry: {
    index: "./src/index.js",
    test: "./src/test.js"
    
  },
  output: {//输出结构
    path: path.resolve(__dirname, "./dist"),
    //filename: "main.js"
    filename: "[name]_[chunkhash:8].js",//占位符，name就对应entry的key。chunkhash是时间戳，:8指定8位，可以用版本管理
  },
  mode: "development",//打包环境'development' or 'production'
  module: {//loader模块处理

  },
  //插件配置
  plugins: []
}