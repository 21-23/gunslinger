function format(message) {
    return {
        type: 'GUNSLINGER',
        message,
    }
}

function messenger(address) {
    const ws = { address };
    ws.send = () => {
    };

    return function send(msg) {
        const message = format(msg);

        ws.send(JSON.stringify(message));
    };
}

module.exports = {
    messenger,
};
