//找到入口文件，分析内容，有依赖拿到依赖路径，转换代码（浏览器中可以运行的）
const path = require("path")
const fs = require("fs")
const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const { transformFromAst } = require("@babel/core")//把ast按照规则转换成对应的ts代码


const entry = (entryFile) => {
    const content = fs.readFileSync(entryFile,"utf-8")
    const ast = parser.parse(content, {
        sourceType: "module"
    })
    const dependecies = {};
    traverse(ast, {
        //以函数的形式
        ImportDeclaration({node}) {
            const dirname = path.dirname(entryFile)//会分析入口文件的目录 ./src
            const value = node.source.value
            
            let newPath = "./" + path.join(dirname,value)
            newPath = newPath.replace('\\', '/')
            dependecies[value] = newPath
        }
    })

   
    const { code } = transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    })
    
    return {
        entryFile,
        dependecies,
        code
    }
}

// const info = entry("./src/index.js")




//分析出所有依赖关系
const dependecies = entryFile => {
    const info =  entry(entryFile)

    const modules = []
    modules.push(info)
    for(let i = 0; i<modules.length; i++) {
        const item = modules[i]
        const { dependecies } = item
        if(dependecies) {
            for(let j in dependecies) {
                modules.push(entry(dependecies[j]))
            }
        }
    }

    const obj = {};
    modules.forEach(item => {
        obj[item.entryFile] = {
            dependecies: item.dependecies,
            code: item.code
        }
    })

    return obj;

}


//生成代码
const genCode = (entryFile) => {
    const obj = dependecies(entryFile)
    const graph = JSON.stringify(obj)

    console.log(obj)

    const bundle = `(function(graph){
            
        function require(module) {
            function localRequire(relativePath) {
                return require(graph[module].dependecies[relativePath])
            }
            var exports = {};
            (function(require,exports,code){
                eval(code);
            })(localRequire,exports,graph[module].code)

            return exports;
        }

        require('${entryFile}')

    })(${graph})`

    fs.writeFileSync(path.resolve(__dirname, "./dist/main.js"),bundle,'utf-8')


}
genCode('./src/index.js')

//输出源代码，把代码放到./dist/main.js