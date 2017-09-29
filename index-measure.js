const WebSocket = require('uws');
const uuidv4 = require('uuid/v4');

const config = require('./config');

const { randomInterval } = require('./src/utils');
const { log } = require('./src/logger');

const stopShooting = [];

function receiveMessage(id, msg) {
    const { message } = JSON.parse(msg);

    if (message.name !== 'solution.evaluated') {
        return;
    }

    const now = Date.now();
    const solutionTime = now - JSON.parse(message.result)[0];

    log(id, 'solution.evaluated', solutionTime, 'ms');
}

function startShooting(config) {
    const id = `&id=gl-msr-${uuidv4()}`;
    const url = config.target + id;
    const ws = new WebSocket(url);

    let clear;

    ws.on('open', () => {
        log(`${id}: connected to `, url);

        clear = randomInterval(() => {
            const message = JSON.stringify({
                to: 'front-service',
                message: {
                    name: 'solution',
                    input:  `map(() => { return ${Date.now()} }).take(1)`,
                }
            });
            ws.send(message);
        }, config.userInput.min, config.userInput.max);
    });
    ws.on('close', () => {
        log('messenger: closed', url);
    });
    ws.on('error', (e) => {
        log('messenger: error', e);
    });
    ws.on('message', receiveMessage.bind(null, id));

    return () => {
        ws.close();
        clear && clear();
    };
}

for (let i = 0; i < config.players; i++) {
    stopShooting.push(startShooting(config));
}

setTimeout(() => {
    stopShooting.forEach((stop) => {
        stop();
    });
}, config.duration);
