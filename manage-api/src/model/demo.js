// npx babel-node src/model/demo.js
import User from './test'

// 增
const user = {
    name: 'brain',
    age: 30,
    email: 'brain@gimail.com'
}
const indertMethod = async () => {
    const data = new User(user) // User是一个model实例
    const result = await data.save()
    console.log(result)
}
// 删
const delteMethod = async () => {
    const result = await User.deleteOne({name: 'brain'})
    console.log(result)
}
// 改
const updateMethod = async () => {
    const result = await User.updateOne({name: 'brain'}, {
        email: 'newEmail@gmail.com'
    })
    console.log(result)
}

// 查
const findMethod = async () => {
    const result = await User.find()
    console.log(result)
}
// delteMethod()
indertMethod()

// npx babel-node src/model/demo.js