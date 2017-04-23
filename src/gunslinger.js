const { generator } = require('./generator');
const { randomInterval } = require('./utils');
const { messenger } = require('./messenger');


function startShooting({ valid, invalid }, { forwardChance, userInput, address }) {
    const iterator = generator(valid, invalid, forwardChance);
    const send = messenger(address);

    return randomInterval(() => {
        const { value } = iterator.next();

        console.log(`Gunslinger: ${value}`);
        send(value);

    }, userInput.min, userInput.max);
}

module.exports = {
    startShooting
};
