const mongoose = require('mongoose')

// 定义链接，连接过程 -> DBHelper.js
mongoose.connect('mongodb://127.0.0.1:27017/imooc',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// 链接collections，  model + schema ->  model/test.js
const User = mongoose.model('users', {
    name: String, 
    age: Number
})
const imooc = new User({
    name: 'imooc-test',
    age: 30
})
imooc.save().then(() => {
    console.log('save Ok!')
})