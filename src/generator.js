const { randomInteger } = require('./utils');

function *string(message, forwardChance) {
    for (let i = 0; i < message.length;) {
        const direction = randomInteger(0, forwardChance);

        if (direction) {
            yield message.slice(0, ++i);
        } else {
            yield message.slice(0, --i);
        }
    }
}

function *generator(valid, invalid, forwardChance) {
    let vIdx;
    let invIdx;

    let vMessage;
    let invMessage;

    while(true) {
        vIdx = randomInteger(0, valid.length - 1);
        invIdx = randomInteger(0, invalid.length - 1);

        vMessage = valid[vIdx];
        invMessage = invalid[invIdx];

        yield *string(vMessage, forwardChance);
        yield *string(invMessage, forwardChance);
    }
}

module.exports = {
    generator,
};
