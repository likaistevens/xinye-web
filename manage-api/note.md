中间件
1. koa-router
    www.npmjs.com/package/koa-router
    npm install -S koa-router

2. koa-body
    www.npmjs.com/package/koa-body
    npm install -S koa-body

3. @koa/cors
    www.npmjs.com/package/@koa/cors
    npm install -S @koa/cors

4. koa-json
    直接将网页上显示的json字符串格式化
    www.npmjs.com/package/koa-json
    npm install -S koa-json

5. koa-combine-routers
    将路由分多个目录写，然后使用这个中间件组合起来
    www.npmjs.com/package/koa-combine-routers
    npm install -S koa-combine-routers

6. koa-helmet
    默认获得一些安全的头部

7. koa-static
    引入静态文件
    
8. mongoose
9. koa-redis
10. koa-jwt
    跨域认证，让某些路由必须验证jwt的secret
11. jsonwebtoken
    生成token，校验token
12. npm-run-all
    同时运行多个webpack的script， -s是sequence按顺序执行，-p是一起执行
    要是用webpack的alias，需要用webpack打包，即下面的watch自动打包，然后用nodemon热更新启动打包之后的文件。  这个操作可以用npm-run-all完成
    "watch": "cross-env NODE_ENV=dev webpack --watch --progress --config ./webpack.config.js",
    "debug": "nodemon --inspect ./dist/server.bundle.js"
    使用，在script里面加上
    "start:dist": "npm-run-all -p watch debug"

npm install -D nodemon  // node热更新插件
npm install -D webpack webpack-cli
clean-webpack-plugin  // 清除dist目录下的文件。 每次都会先清除再打包放入
webpack-node-externals  // 对node_modules下的文件排除处理。
@babel/core  // babel的
@babel/node  // 
@babel/preset-env
babel-loader
cross-env

npx nodemon index.js                 // 热更新启动
npx babel-node index.js              // babel-node运行  能使用es6语法
npx nodemon --exec babel-node index  // babel-node + 热更新
// 可以在package.json的脚本中设置 "start": "nodemon --exec babel-node index.js"

docker内启动redis-cli
docker exec -ti e07dbdde4023 redis-cli        

安装docker-compose
sudo curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
速度太慢的话用
sudo curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
添加权限
sudo chmod +x /usr/local/bin/docker-compose

// 每个冒号之后必须带空格（后面没有内容则不需要）
version: "3"
services: 
  redis-test: 
    image: "redis"
    restart: always
    container_name: "redis-test"
    ports: 
        - "15001:6379"
    volumes:
        - /home/redistest:/data
    command: ["redis-server", "--requirepass", "123456"]
