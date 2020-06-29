var fn1= async (ctx,next)=>{
    console.log(ctx.method,ctx.url)
    await next()
}
module.exports=fn1