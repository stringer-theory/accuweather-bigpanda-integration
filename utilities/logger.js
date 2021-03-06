'use strict';

const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;

var options = {
    timeZone: "America/Chicago",
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric'
};

var formatter = new Intl.DateTimeFormat([], options);

const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
    //let msg = `${timestamp} [${level}] : ${message} `
    let msg = formatter.format(new Date(timestamp)) + " [" + level + "] :" + message;
    // if (metadata) {
    //     msg += JSON.stringify(metadata)
    // }
    return msg
});

const logger = createLogger({
    level: 'debug',
    format: combine(
        format.colorize(),
        format.json(),
        splat(),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console({ level: 'info' }),
        //new transports.File({ filename: config.get("app.logging.outputfile"), level: 'debug' }),
        new transports.File({ filename: 'output.log', level: 'debug' }),
    ]
});

module.exports = logger