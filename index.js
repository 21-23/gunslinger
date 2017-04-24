const dictionary = require('./dictionary/main.json');
const config = require('./config');

const { startShooting } = require('./src/gunslinger');

const stopShooting = [];

for (let i = 0; i < 120; i++) {
    stopShooting.push(startShooting(dictionary, config));
}


setTimeout(() => stopShooting.forEach((promise) => {
    promise.then(stop => stop());
}), 10000);
