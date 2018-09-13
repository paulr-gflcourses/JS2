var http = require('http');
var fs = require('fs');
var url = require('url');
var ws = require('ws');
var server = new http.Server();

server.on('request', (req, res) => {
    let urlObj = url.parse(req.url, true);
    fs.readFile('./public/index.html', (err, data) => {
        res.end(data);
    });
})
server.listen(5000);

var clients = {};

var messages = {};
var counter = 0;
var wss = new ws.Server({
    port: 5555
});

wss.on('connection', (wsc, request) => {
    console.log(request.headers.cookie);
    let id = counter++;
    clients[id] = wsc;
    wsc.on('message', (message) => {

        message = JSON.parse(message);
        messages[id] = {
            x: message.x,
            y: message.y,
            color: message.color
        };
        for (let cid in clients) {
            let client = clients[cid];
            client.send(JSON.stringify({
                type: 'messages',
                messages: messages
            }));
        }

    });

    wsc.on('close', () => {
        console.log('connect close');
        delete clients[id];
        delete messages[id];
        for (let cid in clients) {
            let client = clients[cid];
            client.send(JSON.stringify({
                type: 'messages',
                messages: messages
            }));
        }
    })

    wsc.send(JSON.stringify({
        type: 'messages',
        messages
    }));

})