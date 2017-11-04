function randomInteger(from, to = Number.MAX_SAFE_INTEGER) {
    return Math.round(Math.random() * (to - from) + from);
}

function randomInterval(callback, from, to) {
    let duration = randomInteger(from, to);
    let timeoutId;

    function randomCallback() {
        callback();

        duration = randomInteger(from, to);
        timeoutId = setTimeout(randomCallback, duration);
    }

    timeoutId = setTimeout(randomCallback, duration);

    return function clear() {
        clearTimeout(timeoutId);
    };
}

module.exports = {
    randomInteger,
    randomInterval,
};
