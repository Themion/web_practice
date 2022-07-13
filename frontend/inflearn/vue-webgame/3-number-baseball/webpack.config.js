const path = require('path')

module.exports = {
    entry: {
        app: './main.js',
    },
    module: {
        rules: [{}]
    },
    plugins: [],
    output: {
        // filename: '[name].js',
        filename: 'app.js',
        path: path.join(__dirname, 'build'),
    },
}
