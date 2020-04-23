(function(graph){
            
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

        require('./src/index.js')

        

    })({"./src/index.js":{"dependecies":{"./a.js":"./src/a.js","./b.js":"./src/b.js"},"code":"\"use strict\";\n\nvar _a = require(\"./a.js\");\n\nvar _b = require(\"./b.js\");\n\ndocument.write((0, _b.b)('webpack'));\nconsole.log(88);"},"./src/a.js":{"dependecies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.a = a;\n\nfunction a(name) {\n  return \"hello\" + name + word();\n}"},"./src/b.js":{"dependecies":{"./word.js":"./src/word.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.b = b;\n\nvar _word = require(\"./word.js\");\n\nfunction b(name) {\n  return \"hello\" + name + (0, _word.word)();\n}"},"./src/word.js":{"dependecies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.word = word;\n\nfunction word() {\n  return \"word\";\n}"}})