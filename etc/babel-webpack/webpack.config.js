const path = require('node:path')

module.exports = {
    entry: path.join(__dirname, 'app.js'),
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}
