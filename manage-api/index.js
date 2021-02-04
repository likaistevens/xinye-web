const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const path = require('path')
const koaBody = require('koa-body')
const json = require('koa-json')
const helmet = require('koa-helmet')
const statics = require('koa-static')

const app = new Koa()
const router = new Router()

// app.use(async ctx => {
//     console.log(ctx)  // request:  response:   app:   socket: 等等
//     ctx.body = 'hello world'
// })

router.prefix('/api')  // router的prefix方法，给所有的请求都设置统一的前缀

router.get('/', ctx => {
    ctx.body = 'Hello world!!!'
})
router.get('/home', ctx => {
    const params = ctx.request.query // 获取get请求的 query
    console.log(params) 
    ctx.body = 'Hello home!!'
})

router.post('/testPost', async (ctx) => {
    let { body } = ctx.request // 拿到请求的参数
    console.log(body)
    console.log(ctx.request)
    ctx.body = {  // 设置反悔参数为 
        ...body
    }
})

app.use(koaBody())
app.use(cors())
app.use(helmet())
app.use(json({pretty: false, param: 'pretty'}))  // 需要在地址栏最后加上pretty才可以转义json
// 直接 app.use(json())就会在任何情况先都转换
app.use(statics(path.join(__dirname, 'public')))

app.use(router.routes())
.use(router.allowedMethods()) // 拦截器 拦截router里面没有的错误

app.listen(3000)