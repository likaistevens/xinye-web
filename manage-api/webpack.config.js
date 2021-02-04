const { readSync } = require('fs')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 在build之前，先清除之前dist目录下的内容，再重新生成打包文件  注意：一定要以括号的形式引用

const webpackconfig = {
    target: 'node',
    // 修改process.env.NODE_ENV的值  处于不同的环境  会自动给运用一些对应的plugins
    mode: 'development',  // production | development  
    // webpack从一个入口文件开始 打包成一个输出文件。  把所有js打包成一个文件，这样http请求就只用一次，节省服务器时间和性能  
    entry: {
        server: path.join(__dirname,'src/index.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname,'./dist')
    },
    resolve: {
        alias: { // 设置别名
            "@":path.resolve("src"),  // 这样配置后 @ 可以指向 src 目录
        }
    },
    devtool: 'eval-source-map',  // 方便调试
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: [path.join(__dirname, '/node_modules')]
            }
        ]
    },
    externals: [nodeExternals()], // 排除不会用到的模块
    plugins: [
        new CleanWebpackPlugin()  // 每次打包前都先清空dist目录
    ],
    node: {
        // console: true,
        global: true,
        // process: true,
        // Buffer: true,
        __filename: true,
        __dirname: true,
        // setImmediate: true,
        // path: true
    }
}

module.exports = webpackconfig