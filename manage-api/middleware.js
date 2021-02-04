const Koa = require('koa')
const app = new Koa()

const middleware1 = function async(ctx, next) {
    console.log('This is a middleware1')
    console.log(ctx.request.path)
}
const middleware2 = function async(ctx, next) {
    console.log('This is a middleware2')
    console.log(ctx.request.path)
    next()
    console.log('middleware2 ending')  // next之后操作会在 所有middleware结束之后执行。 类似于回调的执行顺序
}

app.use(middleware2)
app.use(middleware1)
// koa按照顺序去执行中间件，遇到next就会把ctx上下文交给下一个中间件，如果没有next就会结束，返回

app.listen(3000)