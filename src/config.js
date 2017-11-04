const nconf = require('nconf');

const config = nconf.argv().env().file({ file: 'config.json', dir: process.cwd() });

config.defaults({
    userInput: {
        min: 300,
        max: 800
    },
    forwardChance: 9,
    target: 'ws://localhost:3001/gunslinger?session=rs-school-demo',
    players: 10,
    duration: 10000,
});

module.exports = config;
