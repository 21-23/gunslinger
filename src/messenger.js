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
    const ws = { address };
    ws.send = () => {};
    ws.addEventListener = (event, callback) => callback();

    return new Promise((resolve, reject) => {
        const sendTo = send.bind(null, ws);
        ws.addEventListener('open', () => resolve(sendTo));
        ws.addEventListener('close', (e) => reject(e));
    });
}

module.exports = {
    messenger,
};
