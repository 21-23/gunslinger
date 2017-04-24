const fs = require('fs');
const path = require('path');
const { format } = require('util');
const { getStringTime } = require('./utils');

const filePath = path.resolve(`../logs/${Date.now()}.txt`);
const dirname = path.dirname(filePath);

if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
}

const file = fs.createWriteStream(filePath, { flags : 'w' });

function log(module, ...messages) {
    const str = `[${getStringTime()}] ${module}: ` + messages.join(' ');
    file.write(format(str) + '\n');
    console.log(str);
}

module.exports = {
    log,
};
