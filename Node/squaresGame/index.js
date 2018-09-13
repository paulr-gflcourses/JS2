var http = require('http');
var fs = require('fs');
var ws = require('ws');
var server = new http.Server();

server.on('request', (req, res) => {
    fs.readFile('./public/index.html', (err, data) => {
        res.end(data);
    });
})
server.listen(5000);

var clients = {};

var squares = {};
var counter = 0;
var wss = new ws.Server({
    port: 5555
});

wss.on('connection', (wsc, request) => {
    let sendSquares = function(){
        for (let cid in clients) {
            let client = clients[cid];
            client.send(JSON.stringify({
                type: 'squares',
                squares: squares
            }));
        }
    }

    console.log(request.headers.cookie);
    let id = counter++;
    clients[id] = wsc;
    wsc.on('message', (square) => {
        square = JSON.parse(square);
        squares[id] = {
            x: square.x,
            y: square.y,
            color: square.color
        };
        sendSquares();
    });

    wsc.on('close', () => {
        console.log('closing connection');
        delete clients[id];
        delete squares[id];
        sendSquares();
    })

    wsc.send(JSON.stringify({
        type: 'squares',
        squares
    }));

})