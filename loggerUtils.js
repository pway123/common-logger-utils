const winston = require('winston');

const loggerUtils = new winston.Logger({
    transports: [
        new winston.transports.Console({
            timestamp: tsFormat,
            colorize: false,
            level: 'info',
            json: false,
            formatter: customFormat
        })
    ]
});

function tsFormat() {
    const dateString = getISO8601TimeStamp(new Date());
    return `${dateString}`;
}

function getISO8601TimeStamp(date) {
    let pad = function (amount, width) {
        let padding = '';
        while (padding.length < width - 1 && amount < Math.pow(10, width - padding.length - 1)) {
            padding += '0';
        }
        return padding + amount.toString();
    };
    date = date ? date : this;
    let offset = date.getTimezoneOffset();
    return pad(date.getFullYear(), 4) + '-' +
        pad(date.getMonth() + 1, 2) + '-' + pad(date.getDate(), 2) +
        'T' + pad(date.getHours(), 2) + ':' + pad(date.getMinutes(), 2) + ':' +
        pad(date.getSeconds(), 2) + (offset > 0 ? '-' : '+') +
        pad(Math.floor(Math.abs(offset) / 60), 2) + ':' + pad(Math.abs(offset) % 60, 2);
};

function calculateTransactionDuration(startTime) {
    let totalTime = 0;
    if (startTime) {
        totalTime = (new Date()) - startTime;
    }
    return totalTime;
}

function customFormat(options) {
    let timestamp = options.timestamp();
    let logLevel = options.level.toUpperCase();

    // let msgObj = options.message ? JSON.parse(options.message) : '';
    let meta = options.meta;
    let logs = `[${timestamp}] [${logLevel}] [${meta.logType}] [${meta.trxType}] [${meta.trxResult}] [${meta.trxId}] [${calculateTransactionDuration(meta.startTime)}]`;

    for (var property in meta) {
        if (property === 'others') {
            let valueInOthers = meta[property];

            for (var key in valueInOthers) {
                if (valueInOthers.hasOwnProperty(key)) {
                    logs += typeof valueInOthers[key] === 'object' ? ` [${key} : ${JSON.stringify(valueInOthers[key])}]` : ` [${valueInOthers[key]}]`;
                }
            }
        }
    }

    return logs;
};

module.exports = loggerUtils;