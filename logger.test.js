const logger = require('./logger');

describe('logging', () => {
    test('testing', () => {
        logger.transactionId = 'transactionId';
        logger.sessionId = 'sessionId';
        let loggerObj = {
            logType: 'TRANS',
            trxType: 'INDEX_HANDLER',
            startTime: new Date(),
            others: {
                key1: 'key1',
                key2: 'key2',
                key3: 'key3',
                metadata: {
                    newKey: 'newKey'
                },
                key4: 'key4',
            }
        }

        try {
            // testFailure();
            logger.success(loggerObj.logType, loggerObj.trxType, loggerObj.others);
        } catch (err) {
            logger.failure(loggerObj.logType, loggerObj.trxType, loggerObj.others, err);
        }
    })
});