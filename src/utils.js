function randomInteger(from, to = Number.MAX_SAFE_INTEGER) {
    return Math.round(Math.random() * (to - from) + from);
}

function randomInterval(callback, from, to) {
    let duration = randomInteger(from, to);
    const res = {};

    function randomCallback() {
        callback();

        duration = randomInteger(from, to);
        res.id = setTimeout(randomCallback, duration);
    }

    res.id = setTimeout(randomCallback, duration);

    return res;
}

module.exports = {
    randomInteger,
    randomInterval,
};
