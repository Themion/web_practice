const path = require('node:path')

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // 뒤에 있는 loader가 먼저 실행됨!
                use: [
                    // js(css) => html(css)
                    'style-loader',
                    // css => js
                    'css-loader'
                ]
            }
        ]
    }
}
