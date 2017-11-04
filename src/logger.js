const winston = require('winston');

const config = require('./config');

module.exports = new winston.Logger({
    level: config.get('v') ? 'verbose' : 'info',
    transports: [
        new winston.transports.Console({
            colorize: true,
            timestamp: true,
            stderrLevels: ['error'],
        }),
        new winston.transports.File({
            level: 'verbose',
            dirname: 'logs',
            filename: 'gunslinger.log',
            json: true,
            maxsize: 5000000, // ~5Mb
            maxFiles: 100,
            tailable: true,
            timestamp: true,
        }),
    ]
});
