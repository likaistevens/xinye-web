import { error } from 'console';
import redis from 'redis'

const options = {
    host: '47.110.240.19',
    port: 15001,
    password: '123456',
    detect_buffers: true,
    retry_strategy: function(options) {
        if (options.error && options.error.code === "ECONNREFUSED") {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new Error("The server refused the connection");
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error("Retry time exhausted");
        }
        if (options.attempt > 10) {
        // End reconnecting with built in error
        return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
}

const client = redis.createClient(options)

const setValue = (key, value, time) => {
    if(typeof value === 'undefined' || value === null || value === ''){
        return
    }
    if(typeof value === 'string'){
        if(typeof time !== 'undefined'){
            client.set(key, value, 'EX', time) // 设置键值对的过期时间,单位：秒
        }else{
            client.set(key, value)
        }
    }else if(typeof value === 'object'){
        Object.keys(value).forEach(item => {
            client.hset(key, item, value[item], redis.print)
        })
    }
}

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const hgetAsync = promisify(client.hget).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);
const hdelAsync = promisify(client.hdel).bind(client);
const delAsync = promisify(client.del).bind(client);

const getValue = (key,item) => {
    if(item){
        return hgetAsync(key, item)
    }else{
        return getAsync(key)
    }
}

const getHashValue = (key) => {
    return hgetallAsync(key)
}

const deleteHash = (key,item) => {
    console.log(key, item)
    if(item){
        return hdelAsync(key, item)
    }else {
        return delAsync(key)
    }
}

export {
    client,
    getValue,
    setValue,
    getHashValue,
    deleteHash
}