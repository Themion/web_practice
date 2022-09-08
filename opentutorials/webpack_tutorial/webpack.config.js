const path = require('node:path')

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js'
    }
}
