/* var express = require('express')
var fs = require('fs')

var app = express()
app.listen(1234, () => {
    console.log(__dirname)
    console.log('starting server...')
})

app.get('/', (req, res) => {
    res.redirect('/index.html')
})

app.get('/:id', (req, res) => {
    fs.readFile(__dirname + `/${req.params.id}`, (error, data) => {
        if (error) { console.error(error) }
        else {
            res.writeHead(200, {'Content-Type':'text/html'})
            res.end(data)
        }
    })
})

 */
const http = require('http');
var fs = require('fs')

const port = 3000;

const app = http.createServer(function (request, response) {
    const url = request.url == '/' ? '/index.html' : request.url;
    if (request.url == '/favicon.ico') return response.writeHead(404);
    
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));

});
app.listen(port, () => {
    console.log("Server is now open!")
    console.log(Math.random())
});
