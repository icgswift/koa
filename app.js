var Koa = require('koa')

var router = require('koa-router')()
var app = new Koa()

var fn1 = require('./middleware')
app.use(fn1)

var fs = require('fs')
// 读取文件夹 返回值：文件名数组
var files = fs.readdirSync('./controller')
// 过滤出js文件
var filterfiles = files.filter((f) => {
    return f.endsWith('.js')
})

// 遍历数组，操作value
filterfiles.map
for (const f of filterfiles) {
    // 引入模块
    var modulefile = require('./controller/' + f)
    // 遍历module对象
    for (const url in modulefile) {
        if (url.startsWith('get')) {
            console.log('我被调用了')
            var path = url.substring(3)
            console.log(path)
            router.get(path, modulefile[url])
        }
        if (url.startsWith('post')) {
            console.log('我被调用了')
            var path = url.substring(4)
            console.log(path)
            router.post(path, modulefile[url])
        }
    }
}

/* 
  1.字符串两个方法   endsWith('xxx')  startsWith('yyy')  用于筛选

  2.for(const X of Y){ }  遍历数组    for(const X in Y){ }  遍历对象属性

  3.对象属性名的问题
      var obj = {
            name: 'cj',
            age: 18
        }

        console.log(obj['name'] === obj.name)   true
        console.log(typeof obj.name)           string
*/


var bodyparser = require('koa-bodyparser')
app.use(bodyparser()) //中间件顺序，不可乱序
app.use(router.routes())

app.listen(8080)