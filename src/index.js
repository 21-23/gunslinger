const config = require('./config');
const logger = require('./logger');

const { startShooting } = require('./gunslinger');

const dictionary = require(`../dictionary/${config.get('d')}.json`);
const shooters = [];

for (let i = 0; i < config.get('players'); i++) {
    shooters.push(startShooting(dictionary, config.get()));
}

setTimeout(() => {
    logger.info('DONE; Flushing results...', 'Waiting for late messages...');
    shooters.forEach(shooter => shooter.then(stop => stop()));
}, config.get('duration'));
