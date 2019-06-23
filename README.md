## To use:
- npm install `git+https://github.com/pway123/common-logger-utils.git`

## Two methods for common usage:
- logger.success
    - Logger success will print out info log with default success state.
- logger.failure
    - Logger failure will print out warn log with default failure state.
- logger.audit
    - Logger audit will print out info log with custom state.

## Mandatory parameters for logger
1. logType
2. trxType
3. sessionId
4. trxId
5. startTime

- Any missing mandatory fields will be displayed as undefined except startTime.

## Logger generated will be in the following standard format:
[current_timestamp] [logLevel] [logType] [trxType] [trxResult] [sessionId] [trxId] [transaction_duration] [others] [metadata]

- logLevel eg. INFO, WARN
- (*) logType eg. TRANS, AUDIT
- (*) trxType = "Service:Function name" where logger being executed
- trxResult (SUCCESS/FAILURE) depends on which logger function being called
- (*) sessionId
- (*) trxId = UUID 
- (*) transaction_duration = the total processing time (current time - start time). Will returned as 0 when start time is not provided.
- others = extra informations generate in [] sequentially before metadata.
- metadata = Contain metadata/err

(*) is mandatory field