const http = require('http');
var fs = require('fs')

const port = 3000;

const app = http.createServer(function (request, response) {
    const url = request.url == '/' ? '/index.html' : request.url;
    if (request.url == '/favicon.ico') return response.writeHead(404);
    ;
    response.end(fs.readFileSync(__dirname + url));

});
app.listen(port, () => {
    console.log(`Server is now open at: http://localhost:${port}`)
});
