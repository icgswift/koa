// koa采用es6语法，koa是一个class，须大写
var Koa =require('koa')

// 创建一个koa实例表示web APP本身
var app=new Koa()

// app.use()  表示注册一个中间件，也可以传入一个函数，因此中间件就是一个函数
// ctx是由koa传入的封装了request和response的变量,通过它访问request和response，next是koa传入的将要处理的下一个异步函数(中间件)
// 中间件：将具体的业务逻辑和底层逻辑解耦的组件，中间件是按顺序执行的
// 每个async函数（异步函数）都可以做一些自己的事情，然后用await next()来调用下一个async函数(中间件)
app.use(async (ctx,next)=>{          //注意 ctx必须在next前面
await next()                        //调用下面的中间件
ctx.response.type='text/html'
ctx.response.body='<h1>hello koa!</h1>'
})

app.use(async (ctx,next)=>{
    console.log(ctx.request.method,ctx.request.url)
    })

app.listen(3000)
console.log('app started at port 3000')