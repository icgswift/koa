var namefn = async function (ctx, next) {
    console.log('test')

    await next()
    var name = ctx.params.name //占位符:name 封装在ctx.params对象中

    ctx.response.type = 'text/html'
    ctx.response.body = `<h1>hello ${name}</h1>`
}


var indexfn = async (ctx, next) => {
    console.log('index')
    await next()
    ctx.type = 'text/html'
    ctx.body = `<h1>hello index</h1>
                                
                                    <!--action 处理表单提交的 URL,可被 <button>、<input type="submit">覆盖  method提交表单的http方式--> 
                                    <form  action='/signin' method='post'>
                                
                                    <!--name:表单名称，必须是独一无二的，相当于ID  -->
                                    <p>Name:<input type='text' value='koa' name='name'/></p>
                                    <p>Password:<input type='password' name='password'/></p>
                                
                                    <button>提交</button>
                                    </form>`
}



var signinfn = async (ctx, next) => {
    console.log('signin')

    await next()
    const name = ctx.request.body.name
    password = ctx.request.body.password
    if (name === 'koa' && password === '1234') {
        ctx.response.type = 'text/html'
        ctx.response.body = `<h1>hello ${name}</h1>`
    } else {
        ctx.response.type = 'text/html'
        ctx.response.body = `<h1>数据有误</h1>`
    }
}

// 对象属性名 数据类型：string  但一般省略 ''
module.exports = {
    'get/test/:name': namefn,
    'get/': indexfn,
    'post/signin': signinfn
}