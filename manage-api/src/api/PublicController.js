import svgCaptcha from 'svg-captcha'
import {getValue, setValue} from '../config/RedisConfig'


class PublicController {
    constructor(){}
    async getCaptcha(ctx){
        const query = ctx.request.query
        const newCaptcha = svgCaptcha.create({
            size: 4,  // 长度
            ignoreChars: '0o1i',  // 忽略容易混淆的字符
            color: true,  // 是否有颜色
            noise: Math.floor(Math.random() * 5), // 干扰线的数量
            width: 150,
            height: 50
        })
        // setValue(query.sid, newCaptcha.text, 10 * 60)
        // getValue(query.sid).then(res => console.log(res))
        ctx.body = {
            code: 200,
            data: newCaptcha.data
        }
    }
}

export default new PublicController()