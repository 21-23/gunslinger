const { generator } = require('./generator');
const { randomInterval } = require('./utils');
const { messenger } = require('./messenger');

let shooters = 0;

function startShooting({ valid, invalid }, { forwardChance, userInput, address }) {
    const iterator = generator(valid, invalid, forwardChance);

    return messenger(address, `gl#${++shooters}`)
        .then(({ send, unsubscribe }) => {
            const clear = randomInterval(() => {
                const { value } = iterator.next();
                send(value);
            }, userInput.min, userInput.max);

            return function stop() {
                clear();
                //unsubscribe();
            }
        });
}

module.exports = {
    startShooting
};
