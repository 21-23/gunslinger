const dictionary = require('./dictionary/main.json');
const config = require('./config');

const { startShooting } = require('./src/gunslinger');

const shooters = [];

for (let i = 0; i < config.players; i++) {
    shooters.push(startShooting(dictionary, config));
}

setTimeout(() => {
    shooters.forEach(shooter => shooter.then(stop => stop()));
}, config.duration);
