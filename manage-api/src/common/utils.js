import {getValue} from '@/config/RedisConfig'

const checkCode = async (key, value) => {
    const redisData = await getValue(key)
    console.log('redisData: ' + redisData)
    console.log('value: ' + value)
    
    if(redisData){
        return redisData.toLowerCase() === value.toLowerCase()
    }else {
        return false
    }
}

export {
    checkCode
}