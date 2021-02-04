import jsonwebtoken from  'jsonwebtoken'
import config from '../config'
import { checkCode } from '@/common/utils.js'

class LoginController {
    constructor(){}
    async forget(ctx){
        console.log('LoginController.forget')
    }

    async login (ctx) {
        console.log('LoginController.login')
        // 接受用户的数据
        
        // 返回token
        const { body } = ctx.request
        let sid = body.sid
        let code = body.code
        // 验证图片验证码的时效性和正确性
        const checked = await checkCode(sid, code)
        console.log(checked + '--sid: ' + sid + '--code: ' + code)
        if(checked){
            // 验证用户账户密码的正确
            console.log('code is ok : '+ code)
            // moongoDB查库
            if(true){ 
                // 用户名密码验证通过，返回token数据
                const token = jsonwebtoken.sign({ _id: 'brian', exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 }, config.JWT_SECRET) 
                // sign(payload, privateKey, options)   payload是明文,记录一些用户信息
                // 过期时间可以写在payload里面，也可以写在options里面 { expiresIn: '2d'} 两天过期 options内的写法 1h 1d
                ctx.body = {
                    code: 200,
                    token
                }
            }else {
                // 用户名密码验证失败，返回提示
                ctx.body = {
                    code: 404,
                    msg: '用户名或密码错误'
                }
            }
        }else {
            // 图片验证码校验失败
            ctx.body = {
                code: 401,
                msg: '图片验证码不正确，请检查！'
            }
        }
    }
}

export default new LoginController()