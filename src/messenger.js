const WebSocket = require('uws');
const { log } = require('./logger');

function format(message) {
    return {
        type: 'GUNSLINGER',
        message,
    }
}

function sendTo(module, sendTimeArray, msg) {
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
        let ws = new WebSocket(address);

        const sendTimeArray = [];
        const send = sendTo.bind(ws, module, sendTimeArray);
        const receiveFrom = receive.bind(ws, module, sendTimeArray);

        function unsubscribe() {
            ws.removeAllListeners('open');
            ws.removeAllListeners('close');
            ws.removeAllListeners('message');

            ws.terminate();
        }

        ws.on('open', () => resolve({ send, unsubscribe }));
        ws.on('close', () => reject(unsubscribe));
        ws.on('message', receiveFrom);

    });
}

module.exports = {
    messenger,
};
