import {getValue, setValue, getHashValue} from './RedisConfig'

setValue('1249', {
    name: '8a',
    list: JSON.stringify([{
        dianzu: 2,
        sss : 4
    }])
})
// setValue('xia2', 'love2')


// getValue('xia2').then(res => {
//     console.log(res)
// })
// getValue('1249','list').then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })
getHashValue('products').then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
// getValue('1249').then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })

