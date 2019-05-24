## To use:
- npm install git+https://github.com/pway123/common-logger-utils.git

## Two methods for common usage:
- logger.success
    - Logger success will print out info log.
- logger.failure
    -Logger failure will print out warn log.

## Mandatory parameters for logger
1. logType
2. trxType
3. trxId
4. startTime

## Logger generated will be in the following standard format:
- [current_timestamp] [logLevel] [logType] [trxType] [trxResult] [trxId] [transaction_duration] [others] [metadata]

- logLevel eg. TRANS, AUDIT
- trxType = Function name where logger being executed
- trxResult (SUCCESS/FAILURE) depends on which logger function being called
- trxId = UUID 
- transaction_duration = the total processing time (current time - start time)
- others = extra informations generate in [] before metadata
- metadata = Contain metadata/err