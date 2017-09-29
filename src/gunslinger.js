const uuidv4 = require('uuid/v4');

const { generator } = require('./generator');
const { randomInterval } = require('./utils');
const { messenger } = require('./messenger');

function startShooting({ valid, invalid }, { forwardChance, userInput, target }) {
    const iterator = generator(valid, invalid, forwardChance);
    const id = `&id=gl-${uuidv4()}`;

    return messenger(target, id)
        .then(({ send, flush }) => {
            const clear = randomInterval(() => {
                const { value } = iterator.next();
                send(value);
            }, userInput.min, userInput.max);

            return function stop() {
                flush();
                clear();
            }
        });
}

module.exports = {
    startShooting
};
