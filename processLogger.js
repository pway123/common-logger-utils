const loggerUtils = require('./loggerUtils');
const TYPE = {
    INFO: 'info',
    DEBUG: 'debug',
    ERROR: 'error',
    WARN: 'warn'
}

class processLogger {
    constructor(type, logType, trxType, trxResult, trxId, startTime, others, err) {
        this.type = type;
        this.logType = logType;
        this.trxType = trxType;
        this.trxResult = trxResult;
        this.trxId = trxId;
        this.startTime = startTime;
        this.others = others;
        this.err = err;
    }

    processLogFormat(type, logType, trxType, trxResult, trxId, startTime, others, err) {
        console.log('type ?? ', type);
        console.log('this.type??', this.type);
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
    console.log('this.type??', type);
    console.log('this.type??', this.type);
    // let loggerObj = {
    //     logType: isString(logType),
    //     trxType: isString(trxType),
    //     trxResult: isString(trxResult),
    //     trxId: isString(trxId),
    //     startTime: isDate(startTime),
    //     others: Object.keys(isObject(others)).length > 0 ? {
    //         ...others,
    //         metadata: {
    //             ...others.metadata,
    //             // internalErrorInfo: {
    //             //     errorReason: err.stack || err.message
    //             // }
    //         }
    //     } : {}
    // }

    // if ((type === TYPE.ERROR || type === TYPE.WARN) && loggerObj.others.metadata && err) {
    //     loggerObj.others.metadata.internalErrorInfo = { errorReason: err.stack || err.message }
    // }

    // if (type === TYPE.INFO) {
    //     loggerUtils.info('', loggerObj);
    // }
    // else if (type === TYPE.DEBUG) {
    //     loggerUtils.debug('', loggerObj);
    // }
    // else if (type === TYPE.WARN) {
    //     loggerUtils.warn('', loggerObj);
    // }
    // else {
    //     loggerUtils.error('', loggerObj);
    // }
}

module.exports = processLogger;
// module.exports.TYPE = TYPE;