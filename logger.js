const loggerUtils = require('./loggerUtils');
const TYPE = {
    INFO: 'info',
    DEBUG: 'debug',
    ERROR: 'error',
    WARN: 'warn'
}

class logger {
    error(trxType, trxResult, trxId, startTime, others, err) {
        processLogFormat(TYPE.ERROR, trxType, trxResult, trxId, startTime, others, err);
    }

    warn(trxType, trxResult, trxId, startTime, others, err) {
        processLogFormat(TYPE.ERROR, trxType, trxResult, trxId, startTime, others, err)
    }

    info(trxType, trxResult, trxId, startTime, others) {
        processLogFormat(TYPE.INFO, trxType, trxResult, trxId, startTime, others);
    }

    debug(trxType, trxResult, trxId, startTime, others) {
        processLogFormat(TYPE.DEBUG, trxType, trxResult, trxId, startTime, others);
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

function processLogFormat(type, trxType, trxResult, trxId, startTime, others, err) {
    let loggerObj = {
        trxType: isString(trxType),
        trxResult: isString(trxResult),
        trxId: isString(trxId),
        startTime: isDate(startTime),
        others: Object.keys(isObject(others)).length > 0 ? {
            ...others,
            metadata: {
                ...others.metadata,
                // internalErrorInfo: {
                //     errorReason: err.stack || err.message
                // }
            }
        } : {}
    }

    if ((type === TYPE.ERROR || type === TYPE.WARN) && loggerObj.others.metadata && err) {
        loggerObj.others.metadata.internalErrorInfo = { errorReason: err.stack || err.message }
    }

    if (type === TYPE.INFO) {
        loggerUtils.info('', loggerObj);
    }
    else if (type === TYPE.DEBUG) {
        loggerUtils.debug('', loggerObj);
    }
    else if (type === TYPE.WARN) {
        loggerUtils.warn('', loggerObj);
    }
    else {
        loggerUtils.error('', loggerObj);
    }
}

module.exports = logger;