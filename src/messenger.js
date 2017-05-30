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

function sendTo(id, stats, msg) {
    const message = JSON.stringify(format(msg));

    stats.send.push(Date.now());
    log(id, '-->', msg);

    this.send(message);
}

function receive(id, stats, msg) {
    const { message } = JSON.parse(msg);

    if (message.name !== 'solution.evaluated') {
        return;
    }

    const now = Date.now();
    const reactionTime = now - stats.send[stats.send.length - 1];

    stats.receive.push(reactionTime);
    log(id, '<--', `[${reactionTime} ms]`, msg);
}

function messenger(target, id) {
    return new Promise((resolve, reject) => {
        const url = target + id;
        const ws = new WebSocket(url);

        const stats = {
            send: [],
            receive: []
        };
        const send = sendTo.bind(ws, id, stats);
        const receiveFrom = receive.bind(ws, id, stats);

        function unsubscribe() {
            ws.removeAllListeners('open');
            ws.removeAllListeners('close');
            ws.removeAllListeners('message');

            ws.terminate();
        }

        function flush() {
            log(id, 'Sent:', stats.send.length, 'Received:', stats.receive.length);
            log(id, 'Longest reaction time:', `${Math.max(...stats.receive)} ms`);
        }

        ws.on('open', () => {
            log(`${id}: connected to `, url);
            resolve({ send, unsubscribe, flush })
        });
        ws.on('close', () => {
            log('messenger: closed', url);
            reject(unsubscribe)
        });
        ws.on('message', receiveFrom);

    });
}

module.exports = {
    messenger,
};
