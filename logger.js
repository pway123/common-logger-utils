const loggerUtils = require('./loggerUtils');

const TYPE = { INFO: 'info', WARN: 'warn' }
const TRXRESULT = { SUCCESS: 'SUCCESS', FAILURE: 'FAILURE' };

let sessionId, trxId, startTime, logMetadata = {};
class logger {
    static get sessionId() {
        return sessionId;
    }

    static set sessionId(input) {
        sessionId = input;
    }

    static get transactionId() {
        return trxId;
    }

    static set transactionId(input) {
        trxId = input;
    }

    static get startTime() {
        return startTime;
    }

    static set startTime(input) {
        startTime = input;
    }

    static get logMetadata() {
        return logMetadata;
    }

    static set logMetadata(input) {
        logMetadata = input;
    }

    static success(logType, trxType, others) {
        processLogFormat(TYPE.INFO, logType, trxType, TRXRESULT.SUCCESS, sessionId, trxId, startTime, others);
    }

    static failure(logType, trxType, others, err) {
        processLogFormat(TYPE.WARN, logType, trxType, TRXRESULT.FAILURE, sessionId, trxId, startTime, others, err);
    }

    static audit(logType, trxType, state, others) {
        processLogFormat(TYPE.INFO, logType, trxType, state, sessionId, trxId, startTime, others);
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

function processLogFormat(type, logType, trxType, trxResult, sessionId, trxId, startTime, others, err) {
    let loggerObj = {
        logType,
        trxType: isString(trxType),
        trxResult: isString(trxResult),
        sessionId: isString(sessionId),
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