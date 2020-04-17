const path = require('path');
const HtmlWebpackPlugin =  require("html-webpack-plugin");
const {CleanWebpackPlugin} =  require("clean-webpack-plugin");
const MiniCssExtractPlugin =  require("mini-css-extract-plugin");
const webpack = require('webpack')
module.exports = {
  entry: {
    index: "./src/index.js",
    login: "./src/login.js"
    
  },
  output: {//输出结构
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",//_[chunkhash:8]
  },
  mode: "development",//打包环境'development' or 'production'
  devtool: "cheap-module-eval-source-map",
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
        //数组里执行的顺序是从上到下，从右到左,"style-loader", "css-loader", "less-loader"
        // use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader",{
        //   loader: "postcss-loader",
        //   options: {
        //     plugins: () => [
        //       require("autoprefixer")({
        //         overrideBrowserslist: ["last 2 versions", ">1%"]
        //       })
        //     ]
        //   }
        // }]
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
      }
    ]
  },
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
    // new MiniCssExtractPlugin({
    //   filename: "[name]_[contenthash:8].css"//内容变了才变，也就是css变了才变
    // }),
    new webpack.HotModuleReplacementPlugin()//webpack自带插件
  ]
}