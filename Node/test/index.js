var http = require('http');
var fs = require('fs');
var test_module = require('./test');


http.createServer(function(request, response) {
    test_module('new request', request.url);
    switch(request.url) {
        case '/':
            response.end('Home from us...');
            break;
        default:
            fs.readFile('./test/index.html', (err, data) => {
                response.end(data);

            });
            //response.end('Other');
            break;
    }
    /* response.statusCode = 404;
    response.statusMessage = 'Erorr ahsjdfhkjasd';
    response.end('Hello world'); */
}).listen(5000);
