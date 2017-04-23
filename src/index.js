const { valid, invalid } = require('../dictionary/main');
const { generator } = require('./generator');
const { randomInterval } = require('./utils');

const iterator = generator(valid, invalid);

randomInterval(() => console.log(iterator.next().value), 250, 500);
