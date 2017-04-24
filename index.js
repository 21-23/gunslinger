const dictionary = require('./dictionary/main.json');
const config = require('./config');

const { startShooting } = require('./src/gunslinger');

const stopShooting = [];

for (let i = 0; i < config.players; i++) {
    stopShooting.push(startShooting(dictionary, config));
}


setTimeout(() => {
    stopShooting.forEach((promise) => {
        promise.then(stop => stop());
    });
}, config.duration);
