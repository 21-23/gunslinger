const dictionary = require('./dictionary/main.json');
const config = require('./config');

const { startShooting } = require('./src/gunslinger');

const stop = startShooting(dictionary, config);

setTimeout(stop, 10000);
