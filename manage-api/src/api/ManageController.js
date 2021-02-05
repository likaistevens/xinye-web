import config from '../config'
import {getValue, setValue, getHashValue, deleteHash} from '../config/RedisConfig'

class ManageController {
    constructor(){}
    async saveProduct (ctx) {
        const  {body} = ctx.request
        const productName = body.params.productName
        const elementList = body.params.elementList
        const temp = {}
        temp[productName] = JSON.stringify(elementList)
        setValue('products', temp)
        getValue('products', productName).then(res => console.log(res)).catch(err => {
            console.log(err)
        })
        ctx.body = {
            code: 200,
            data: {
                productName: JSON.stringify(elementList)
            },
            msg: '保存成功'
        }
    }

    async getProductList (ctx) {
        let data = await getHashValue('products')
        ctx.body = {
            code: 200,
            data: data,
            msg: '获取成功'
        }
    }

    async deleteProduct (ctx) {
        const query = ctx.request.query
        const {productName} = query
        console.log(productName)
        try {
            await deleteHash('products',productName)
            ctx.body = {
                code: 200,
                data:productName,
                msg: '删除成功'
            }
        } catch{
            ctx.body = {
                code: 500,
                data: productName,
                msg: '删除失败'
            }
        }

    }
}

export default new ManageController()