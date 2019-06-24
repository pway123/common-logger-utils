const logger = require('./logger');

describe('logging', () => {
    test('testing', () => {
        let loggerObj = {
            logType: 'TRANS',
            trxType: 'INDEX_HANDLER',
            trxId: '12345',
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
            // salahhh();
            logger.transactionId = '1234';
            logger.success(loggerObj.logType, loggerObj.trxType, logger.transactionId, loggerObj.startTime, loggerObj.others);
        } catch (err) {
            logger.failure(loggerObj.logType, loggerObj.trxType, loggerObj.trxId, loggerObj.startTime, loggerObj.others, err);
        }
    })
});