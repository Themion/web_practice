const path = require('node:path')

module.exports = {
    mode: "development",
    entry: {
        index: './src/index.js', 
        about: './src/about.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}
