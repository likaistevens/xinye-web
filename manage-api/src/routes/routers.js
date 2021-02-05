import combineRoutes from 'koa-combine-routers'

import publicRouter from './publicRouter'
import loginRouter from './loginRouter'
import manageRouter from './manageRouter'

export default combineRoutes(publicRouter, loginRouter,manageRouter)