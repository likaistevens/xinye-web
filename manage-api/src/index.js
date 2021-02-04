// const koa = require('koa')
// const app = new koa()
import koa from 'koa'
import path from 'path'
import koaBody from 'koa-body'
import jsonutil from 'koa-json'
import JWT from 'koa-jwt'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import combineRouter from './routes/routers'
// const combineRouter = require('./routes/routes')
import compose from 'koa-compose'
import errorHandler from './common/errorHandler'
import config from './config/index'

const app = new koa()

// 定义公共的路径，不需要jwt鉴权   uless后面的路径不校验, 传入一个数组，里面是正则表达式，匹配路由
const jwt = JWT({ secret: config.JWT_SECRET }).unless({ path: [/^\/public/, /\/login/] })

// app.use(combineRouter())
// app.use(statics(path.join(__dirname, '../public')))
// app.use(helmet())
// 使用koa-compose整合所有中间件
const middleware = compose([
    koaBody(),
    statics(path.join(__dirname, '../public')),
    cors(),
    jsonutil({pretty: false, param: 'pretty'}),
    helmet(),
    errorHandler,
    jwt
    // combineRouter() 
])

app.use(middleware)
app.use(combineRouter())
console.log('listen to 9420')
app.listen(9420)