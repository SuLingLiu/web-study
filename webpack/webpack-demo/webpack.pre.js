const path = require('path');
const MiniCssExtractPlugin =  require("mini-css-extract-plugin");
const baseConfig = require("./webpack.base.js")
const merge = require("webpack-merge")//用来合并配置代码

const preConfig = {
  output: {//输出结构
    path: path.resolve(__dirname, "./dist"),
    filename: "[name][chunkhash:8].js",
  },
  mode: "production",
  devtool: 'none',
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader",{
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
        use: ["babel-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css"//内容变了才变，也就是css变了才变
    }),
  ]
  
}
module.exports = merge(baseConfig, preConfig)