const fs = require('fs');
const path = require('path');
const { getStringTime, pad } = require('./utils');

const filePath = path.resolve(`../logs/${Date.now()}.txt`);
const dirname = path.dirname(filePath);

if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
}

const file = fs.createWriteStream(filePath, { flags : 'w' });

function log(module, ...messages) {
    let str = `[${getStringTime()}] ${module}`;
    str = pad(str, 35) + messages.join(' ');

    file.write(str + '\n');
    console.log(str);
}

module.exports = {
    log,
};
