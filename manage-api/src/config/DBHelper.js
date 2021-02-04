import mongoose from 'mongoose'
import config from './index' 

const COLLECTION_URL = '/imooc'
// 创建连接
mongoose.connect(config.DB_URL + COLLECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// 连接成功
mongoose.connection.on('connected', () => {
    console.log('Monggose connection open to' + 
    config.DB_URL)
})

// 连接失败
mongoose.connection.on('error', (err) => {
    console.log('Monggose connection error' + err)
})

// 断开连接
mongoose.connection.on('disconnected', () => {
    console.log('Monggose is disconnected')
})

export default mongoose