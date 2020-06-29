var namefn = async function (ctx, next) {
    await next()
    var name = ctx.params.name
    ctx.response.type = 'text/html'
    ctx.response.body = `<h1>hello ${name}</h1>`
}

var indexfn = async (ctx, next) => {
    await next()
    ctx.type = 'text/html'
    ctx.body = `<h1>hello index</h1>
                                    <form  action='/signin' method='post'>
                                    <p>Name:<input type='text' value='koa' name='name'/></p>
                                    <p>Password:<input type='password' name='password'/></p>
                                    <button>提交</button>
                                    </form>`
}

var signinfn = async (ctx, next) => {
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

module.exports = {
    'get/test/:name': namefn,
    'get/': indexfn,
    'post/signin': signinfn
}