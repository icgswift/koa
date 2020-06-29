// 对路由注册 模块化
// 使用函数使逻辑条理化

var fs = require('fs')
var router = require('koa-router')()

function mapfile(dirname) {
    var files = fs.readdirSync(dirname)
    var filterfiles = files.filter((f) => {
        return f.endsWith('.js')
    })

    filterfiles.map((f) => {
        var modulefile = require(dirname + "/" + f)
        handleobj(modulefile)
    })
}

function handleobj(modulefile) {
    for (const url in modulefile) {
        if (url.startsWith('get')) {
            var path = url.substring(3)
            router.get(path, modulefile[url])
        }
        if (url.startsWith('post')) {
            var path = url.substring(4)
            router.post(path, modulefile[url])
        }
    }
}


module.exports = function (dirname) {
    var dirname = dirname || './controller'
    mapfile(dirname)
    return router.routes()
}