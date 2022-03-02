const Webpack = require('webpack')
const glob = require('glob')    //未下載
const { resolve } = require('path')

const entry = ( (filepathList) => {
    let entry = {}
    filepathList.forEach( filepath => {
        const list = filepath.split(/[\/|\/\/|\\|\\\\]/g)
        const key = list[list.length - 1].replace(/\.js/g, '')  //  取得文件的filename
        //  如果是development環境，才需 hot module
        entry[key] = process.env.NODE_ENV === 'development' ? [filepath, 'webpack-hot-middleware/client?reload=true'] : filepath
    })
    return entry
} )(glob.sync(resolve(__dirname, '../src/js/*.js')))

module.exports = {
    entry,
    module: {
        rules: [
            {
                test: /\.ejs$/,
                use: [
                    {
                        //未下載
                        loader: 'html-loader', //處理圖片引用
                        options: {
                            attrs: ['img:src', 'img:data-src']
                        }
                    },
                    {
                        //未下載
                        loader: 'ejs-html-loader', //處理ejs的includes語法
                        options: {
                            production: process.env.ENV === 'production'
                        }
                    }
                ]
            }
        ]
    }
}