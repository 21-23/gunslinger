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

function getStringTime() {
    return (new Date()).toISOString();
}

function pad(str, to) {
    if (str.length < to) {
        const spaces = new Array(to - str.length).join(' ');

        return str + spaces;
    }

    return str;
}

module.exports = {
    randomInteger,
    randomInterval,
    getStringTime,
    pad,
};
