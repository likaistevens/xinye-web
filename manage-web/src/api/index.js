import axios from '@/utils/request.js'

const saveProduct = (params) => axios.post('api/setting/saveProduct', { params })
const getProductList = (params) => axios.get('api/getProductList', { params })
const deleteProduct = (params) => axios.get('api/deleteProduct', { params })

export default {
  saveProduct,
  getProductList,
  deleteProduct
}
