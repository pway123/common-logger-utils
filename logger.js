const loggerUtils = require('./loggerUtils');

class logger {
    isObject(data) {
        return typeof data !== 'object' ? {} : data;
    }

    isString(data) {
        return typeof data !== 'string' ? undefined : data;
    }

    isDate(date) {
        return Object.prototype.toString.call(date) === '[object Date]' ? date : undefined;
    }

    error(trxType, trxResult, trxId, startTime, others, err) {
        let loggerObj = {
            trxType: this.isString(trxType),
            trxResult: this.isString(trxResult),
            trxId: this.isString(trxId),
            startTime: this.isDate(startTime),
            others: Object.keys(this.isObject(others)).length > 0 ? {
                ...others,
                metadata: {
                    ...others.metadata,
                    internalErrorInfo: {
                        errorReason: err.stack || err.message
                    }
                }
            } : {}
        }

        loggerUtils.error('', loggerObj);
    }

    warn(trxType, trxResult, trxId, startTime, others) {
        let loggerObj = {
            trxType: this.isString(trxType),
            trxResult: this.isString(trxResult),
            trxId: this.isString(trxId),
            startTime: this.isDate(startTime),
            others: this.isObject(others)
        }

        loggerUtils.warn('', loggerObj);
    }

    info(trxType, trxResult, trxId, startTime, others) {
        let loggerObj = {
            trxType: this.isString(trxType),
            trxResult: this.isString(trxResult),
            trxId: this.isString(trxId),
            startTime: this.isDate(startTime),
            others: this.isObject(others)
        }

        loggerUtils.info('', loggerObj);
    }

    debug(trxType, trxResult, trxId, startTime, others) {
        let loggerObj = {
            trxType: this.isString(trxType),
            trxResult: this.isString(trxResult),
            trxId: this.isString(trxId),
            startTime: this.isDate(startTime),
            others: this.isObject(others)
        }

        loggerUtils.debug('', loggerObj);
    }
}

module.exports = logger;