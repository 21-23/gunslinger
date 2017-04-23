const { generator } = require('./generator');
const { randomInterval } = require('./utils');
const { messenger } = require('./messenger');

let shooters = 0;

function startShooting({ valid, invalid }, { forwardChance, userInput, address }) {
    const iterator = generator(valid, invalid, forwardChance);
    const send = messenger(address);
    const shooter = shooters++;

    return randomInterval(() => {
        const { value } = iterator.next();

        console.log(`Gunslinger ${shooter}: ${value}`);
        send(value);

    }, userInput.min, userInput.max);
}

module.exports = {
    startShooting
};
