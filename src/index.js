const validDic = require('../dictionary/valid').messages;
const invalidDic = require('../dictionary/invalid').messages;

const { generator } = require('./generator');
const { randomInterval } = require('./utils');

const iterator = generator(validDic, invalidDic);

randomInterval(() => console.log(iterator.next().value), 50, 500);
