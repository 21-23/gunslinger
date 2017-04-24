const WebSocket = require('uws');

function format(message) {
    return {
        type: 'GUNSLINGER',
        message,
    }
}

function send(ws, msg) {
    const message = format(msg);

    ws.send(JSON.stringify(message));
}

function messenger(address) {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(address);
        const sendTo = send.bind(null, ws);

        ws.on('open', () => resolve(sendTo));
        ws.on('close', (e) => reject(e));
    });
}

module.exports = {
    messenger,
};
