import Router from 'koa-router'
import ManageController from '../api/ManageController'

const router = new Router()

router.prefix('/api')
router.post('/setting/saveProduct', ManageController.saveProduct)
router.get('/getProductList', ManageController.getProductList)
router.get('/deleteProduct', ManageController.deleteProduct)
// ManageController.saveProduct)
export default router