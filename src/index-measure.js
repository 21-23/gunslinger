const WebSocket = require('uws');
const uuidv4 = require('uuid/v4');

const config = require('./config');

const { randomInterval } = require('./utils');
const logger = require('./logger');

const stopShooting = [];

function receiveMessage(id, msg) {
    const { message } = JSON.parse(msg);

    if (message.name !== 'solution.evaluated') {
        return;
    }

    const now = Date.now();
    const solutionTime = now - JSON.parse(message.result)[0];

    logger.verbose(id, 'solution.evaluated', solutionTime, 'ms');
}

function startShooting(config) {
    const id = `&id=gl-msr-${uuidv4()}`;
    const url = config.target + id;
    const ws = new WebSocket(url);

    let clear;

    ws.on('open', () => {
        logger.info(`${id}: connected to `, url);

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
        logger.info('messenger: closed', url);
    });
    ws.on('error', (e) => {
        logger.info('messenger: error', e);
    });
    ws.on('message', receiveMessage.bind(null, id));

    return () => {
        ws.close();
        clear && clear();
    };
}

for (let i = 0; i < config.get('players'); i++) {
    stopShooting.push(startShooting(config.get()));
}

setTimeout(() => {
    stopShooting.forEach((stop) => {
        stop();
    });
}, config.get('duration'));
