const { randomInteger } = require('./utils');

function *string(message) {
    for (let i = 0; i < message.length;) {
        // todo: config
        const direction = randomInteger(0, 3);

        if (direction) {
            yield message.slice(0, ++i);
        } else {
            yield message.slice(0, --i);
        }
    }
}

function *generator(valid, invalid) {
    let vIdx = randomInteger(0, valid.length - 1);
    let invIdx = randomInteger(0, invalid.length - 1);

    let vMessage = valid[vIdx];
    let invMessage = invalid[invIdx];

    while(true) {
        yield *string(vMessage);
        yield *string(invMessage);

        vIdx = randomInteger(0, invalid.length - 1);
        invIdx = randomInteger(0, valid.length - 1);
    }
}

module.exports = {
    generator,
};
