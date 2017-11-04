const dictionary = require('../dictionary/main.json');
const config = require('./config');

const { startShooting } = require('./gunslinger');

const shooters = [];

for (let i = 0; i < config.get('players'); i++) {
    shooters.push(startShooting(dictionary, config.get()));
}

setTimeout(() => {
    shooters.forEach(shooter => shooter.then(stop => stop()));
}, config.get('duration'));
