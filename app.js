/*
              路由的概念
客户端（ Web 前端、移动端等）向服务器发起请求时包括两个元素：
 路径（URI）     HTTP 请求方法（包括 GET、POST 等）  合称端点(endpoint)
服务器根据客户端访问的端点选择相应处理逻辑的机制就叫做路由
 */

var Koa=require('koa')

// 一个能集中处理URL的middleware，它根据不同的URL调用不同的处理函数
// koa-router 返回的是函数
var router = require('koa-router')()
var app=new Koa()

app.use( async (ctx,next)=>{
    console.log(ctx.method,ctx.url)
    await next()
})

// request.url --->   router middleware   --->  middleware ---> response   

                               //处理get请求
router.get('/test/:name',async function(ctx,next){
await next()
var name=ctx.params.name    //占位符:name 封装在ctx.params对象中
/* 
req.body：客户端请求体的数据，可能是表单或 JSON 数据
req.params：请求 URI 中的路径参数
req.query：请求 URI 中的查询参数
req.cookies：客户端的 cookies
 */
ctx.response.type='text/html'
ctx.response.body= `<h1>hello ${name}</h1>`
})

router.get('/',async(ctx,next)=>{
    await next()
    ctx.type='text/html'
    ctx.body=`<h1>hello index</h1>

    <!--action 处理表单提交的 URL,可被 <button>、<input type="submit">覆盖  method提交表单的http方式--> 
    <form  action='/signin' method='post'>

    <!--name:表单名称，必须是独一无二的，相当于ID  -->
    <p>Name:<input type='text' value='koa' name='name'/></p>
    <p>Password:<input type='password' name='password'/></p>

    <button>提交</button>
    </form>`
})


                    //    处理post请求
/*
post请求 作为request的body发送
Node.js提供的原始request对象,koa提供的ctx对象，都不提供解析request的body的功能！
引入另一个middleware来解析原始request请求，把解析后的参数，绑定到ctx.request.body中  */
var bodyparser=require('koa-bodyparser')

router.post('/signin', async (ctx,next)=>{
    await next()
    // console.log(ctx.request.body)     不注册app.use(bodyparser())中间件undefined
    const  name = ctx.request.body.name 
           password = ctx.request.body.password 
if(name==='koa' && password ==='1234'){
    ctx.response.type='text/html'
    ctx.response.body= `<h1>hello ${name}</h1>`
}else{
    ctx.response.type='text/html'
ctx.response.body= `<h1>数据有误</h1>`
}
})
    
app.use(bodyparser())
app.use(router.routes())




app.listen(8080)