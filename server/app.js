const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')

let webpackConfig = require('../../build/webpack.dev.config')
const { routerFactory } = require('../routes')

const isDev = process.env.NODE_ENV === 'development'

let compiler = webpack(webpackConfig)

let app = express()

// 开发环境下才需要启用实时编译和热更新
if (isDev) {
    // 用 webpack-dev-middleware 启动 webpack 编译
    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        overlay: true,
        hot: true
    }))
    
    // 使用 webpack-hot-middleware 支持热更新
    app.use(webpackHotMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        noInfo: true
    }))
}

// 添加静态资源拦截转发
app.use(webpackConfig.output.publicPath, express.static(path.resolve(__dirname, isDev ? '../../src' : '../../dist')))

// 构造路由
routerFactory(app)

// 错误处理
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send(err.stack || 'Service Error')
})

module.exports = app