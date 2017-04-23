const { valid, invalid } = require('../dictionary/main');
const { generator } = require('./generator');
const { randomInterval } = require('./utils');
const { userInput, forwardChance } = require('../config');

const iterator = generator(valid, invalid, forwardChance);

randomInterval(() => console.log(iterator.next().value), userInput.min, userInput.max);
