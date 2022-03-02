// server/bin/server.js 文件代码
const path = require('path')


let app = require('../app')

const port = '8080'

app.listen(port, () => console.log(`development is listening on port ${port}`))