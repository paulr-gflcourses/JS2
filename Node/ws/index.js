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
var messages = require('./data/messages');
var counter = 0;
var wss = new ws.Server({port: 5555});

wss.on('connection', (wsc, request) => {
    console.log(request.headers.cookie);
    // console.log(request);
    let id = counter++;
    clients[id] = wsc;
    wsc.on('message', (message) => {
        message=JSON.parse(message);
        messages.push({username: message.username, message:message.message});
        for (let cid in clients) {
            let client = clients[cid];
            client.send(JSON.stringify({
                type: 'message',
                message: message.message, 
                username: message.username
            }));
        }
        /* 
            wss.clients.forEach((client) => {
                client.send(JSON.stringify({
                    type: 'message',
                    message
                }));
            })
        */
    });

    wsc.on('close', () => {
        console.log('connect close');
        // clearInterval(timer);
        delete clients[id];
    })

    wsc.send(JSON.stringify({
        type: 'messages',
        messages
    }));


    /* let timer = setInterval(() => {
        wsc.send(JSON.stringify({
            type: 'memoryInfo',
            data: process.memoryUsage()
        }))
    }, 200) */

    // Example disconnect
    /* setTimeout(() => {
        wsc.close()
    }, 5000) */
})

setInterval(() => {
    fs.writeFile('./data/messages.json', JSON.stringify(messages), (err) => {if (err) console.log('error',err)});
}, 1000);

// var tt = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject('some bad');
//         resolve('ok')
//     }, 5000)
// })

// tt.then((ok) => {console.log(ok)})
// .catch(() => {console.log('error')})
// .then(() => {console.log('always')})
