const loggerUtils = require('./loggerUtils');

const TYPE = { INFO: 'info', WARN: 'warn' }
const TRXRESULT = { SUCCESS: 'SUCCESS', FAILURE: 'FAILURE' };

let transactionId, startTime, logMetadata = {};
class logger {
    static get transactionId() {
        return transactionId;
    }

    static set transactionId(input) {
        transactionId = input;
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

    static success(logType, trxType, trxId, startTime, others, pnMetrics) {
        processLogFormat(TYPE.INFO, logType, trxType, TRXRESULT.SUCCESS, trxId, startTime, others, pnMetrics);
    }

    static failure(logType, trxType, trxId, startTime, others, pnMetrics, err) {
        processLogFormat(TYPE.WARN, logType, trxType, TRXRESULT.FAILURE, trxId, startTime, others, pnMetrics, err);
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

function processLogFormat(type, logType, trxType, trxResult, trxId, startTime, others, pnMetrics, err) {
    let loggerObj = {
        logType,
        trxType: isString(trxType),
        trxResult: isString(trxResult),
        trxId: isString(trxId),
        startTime: isDate(startTime),
        pnMetrics: pnMetrics === null ? {} : pnMetrics,
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