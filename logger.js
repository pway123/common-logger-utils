const loggerUtils = require('./loggerUtils');

const TYPE = { INFO: 'info', WARN: 'warn' }
const TRXRESULT = { SUCCESS: 'SUCCESS', FAILURE: 'FAILURE' };

class logger {
    static success(logType, trxType, trxId, startTime, others) {
        processLogFormat(TYPE.INFO, logType, trxType, TRXRESULT.SUCCESS, trxId, startTime, others);
    }

    static failure(logType, trxType, trxId, startTime, others, err) {
        processLogFormat(TYPE.WARN, logType, trxType, TRXRESULT.FAILURE, trxId, startTime, others, err);
    }
}

function isObject(data) {
    return typeof data !== 'object' ? {} : data;
}

function isString(data) {
    return typeof data !== 'string' ? undefined : data;
}

function isDate(date) {
    return Object.prototype.toString.call(date) === '[object Date]' ? date : undefined;
}

function processLogFormat(type, logType, trxType, trxResult, trxId, startTime, others, err) {
    let loggerObj = {
        logType,
        trxType: isString(trxType),
        trxResult: isString(trxResult),
        trxId: isString(trxId),
        startTime: isDate(startTime),
        others: Object.keys(isObject(others)).length > 0 ? {
            ...others,
            metadata: {
                ...others.metadata
            }
        } : { metadata: {} }
    }

    if (type === TYPE.WARN && loggerObj.others.metadata && err) {
        loggerObj.others.metadata.internalErrorInfo = { errorReason: err.stack || err.message }
    }

    loggerUtils[type]('', loggerObj);
}

module.exports = logger;