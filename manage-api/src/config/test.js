import {getValue, setValue} from './RedisConfig'

setValue('xia', 'love')
setValue('xia2', 'love2')


getValue('xia2').then(res => {
    console.log(res)
})
