const WebSocket = require('uws');
const { log } = require('./logger');

function format(message) {
    return {
        type: 'GUNSLINGER',
        message,
    }
}

function send(ws, module, msg) {
    const message = JSON.stringify(format(msg));

    log(`${module} send`, msg);
    ws.send(message);
}

function receive(msg, module) {
    const message = msg.data;

    log(`${module} receive`, msg);
}

function messenger(address, module) {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(address);
        const sendTo = send.bind(null, ws, module);

        ws.on('open', () => resolve(sendTo));
        ws.on('close', (e) => reject(e));
        ws.on('message', (m) => receive(m, module));
    });
}

module.exports = {
    messenger,
};
