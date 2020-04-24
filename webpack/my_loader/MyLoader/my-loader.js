//loader的基本结构,最好把api过一遍https://webpack.docschina.org/api/loaders/#this-callback  以及 看参与贡献
const utils = require("loader-utils")//使用 loader-utils 中提供的 getOptions 方法 来提取给定 loader 的 option。
module.exports = function(source) {
    //不能为箭头函数，因为需要this的正确指向
    let content = source;

    // content = content.replace('loader', "my_loader")


    //获取配置参数,this.query是传递的参数，就是为什么不能使用箭头函数
    // console.log(this.query.name,333)
    // const options = utils.getOptions(this)
    // const {name} = options
    // console.log(name,333)
    

    // return content//必须要返回内容,返回一个参数
    // this.callback(//返回多个参数
    //     null,
    //     content,
    //   );

    //定义一个异步处理，告诉webpack，这个loader里有异步事件，在里面调用下这个异步
    //this.callback注意参数的使用
    const callback = this.async()

    //如果有异步怎么处理
    setTimeout(() => {
        content = content.replace('loader', "my_loader")
        callback(null,content)
    }, 3000)
    
}