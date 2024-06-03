const winston = require('winston');
const { combine, json, prettyPrint, timestamp, colorize } = winston.format;

const event_logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json(),
        prettyPrint(),
        colorize(),
    ),
    defaultMeta: { service: 'event-controller' },
    transports: [
        // new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/event_controller_logs/all_logs.log', level: 'info' }),
        new winston.transports.File({ filename: 'logs/event_controller_logs/error_logs.log', level: 'error' }),
    ],
});

const user_logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json(),
        prettyPrint()
    ),
    defaultMeta: { service: 'user-controller' },
    transports: [
        // new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/user_controller_logs/all_logs.log', level: 'info' }),
        new winston.transports.File({ filename: 'logs/user_controller_logs/error_logs.log', level: 'error' }),
    ],
});

const message_logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json(),
        prettyPrint()
    ),
    defaultMeta: { service: 'message-controller' },
    transports: [
        // new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/message_controller_logs/all_logs.log', level: 'info' }),
        new winston.transports.File({ filename: 'logs/message_controller_logs/error_logs.log', level: 'error' }),
    ],
});

module.exports = { event_logger, user_logger, message_logger };