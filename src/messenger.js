const WebSocket = require('uws');
const { log } = require('./logger');

function format(message) {
    return {
        type: 'GUNSLINGER',
        message,
    }
}

function send(module, sendTimeArray, msg) {
    const message = JSON.stringify(format(msg));

    sendTimeArray.push(Date.now());
    log(module, '-->', msg);

    this.send(message);
}

function receive(module, sendTimeArray, msg) {
    log(module, '<--', `[${Date.now() - sendTimeArray[0]}ms]`, msg);

    sendTimeArray.shift();
}

function messenger(address, module) {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(address);
        const sendTimeArray = [];
        const sendTo = send.bind(ws, module, sendTimeArray);
        const receiveFrom = receive.bind(ws, module, sendTimeArray);

        ws.on('open', () => resolve(sendTo));
        ws.on('close', reject);
        ws.on('message', receiveFrom);
    });
}

module.exports = {
    messenger,
};
