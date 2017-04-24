const { Server } = require('uws');
const wss = new Server({ port: 3030 });

function onMessage(ws, message) {
    setTimeout(() => ws.send(message), 10);
    console.log('received: ' + message);
}

wss.on('connection', function(ws) {
    ws.on('message', onMessage.bind(null, ws));
});
