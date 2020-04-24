//plugin基本结构
//本质是一个类
class MyPlugin {
    constructor(options) {//options是外部传入参数
        this.options = options
    }   

    apply(compiler) {
        //在输出目录放入一个.txt的文件，异步的钩子
        //hooks.emit 定义在某个时刻
        compiler.hooks.emit.tapAsync(
            "MyPlugin",//插件名称
            (compilation, cb) => {
                compilation.assets["copyright.txt"] = {
                    source: function() {//文件的内容
                        return "hello copy"
                    },
                    size: function() {//文件的大小
                        return 1024;
                    }
                }

                cb()
            }
        )
    }
}

module.exports = MyPlugin