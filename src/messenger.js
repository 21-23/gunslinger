const WebSocket = require('uws');
const { log } = require('./logger');

function format(message) {
    return {
        to: 'front-service',
        message: {
            name: 'solution',
            input:  message,
        }
    }
}

function sendTo(module, sendTimeArray, msg) {
    const message = JSON.stringify(format(msg));

    sendTimeArray.push(Date.now());
    log(module, '-->', msg);

    this.send(message);
}

function receive(module, sendTimeArray, msg) {
    const mesg = JSON.parse(msg);
    if (mesg.message.name === 'solution.evaluated') {
        log(module, '<--', `[${Date.now() - sendTimeArray[0]}ms]`, msg);
        sendTimeArray.shift();
    }

}

function messenger(target, id) {
    return new Promise((resolve, reject) => {
        const url = target + id;
        const ws = new WebSocket(url);

        const sendTimeArray = [];
        const send = sendTo.bind(ws, id, sendTimeArray);
        const receiveFrom = receive.bind(ws, id, sendTimeArray);

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
