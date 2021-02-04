import mongoose from '../config/DBHelper'

// shema 相当于对表结构的定义
const Schema = mongoose.Schema  // Schema 类

const TestSchema = new Schema({
    'name': {type: String},
    'age': {type: Number},
    'email': {type: String},
})

// 这是一个model 类   model相当于定义一个表  第一个参数是表名称
const TestModel = mongoose.model('likaiForm', TestSchema)

export default TestModel