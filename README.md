# ai-lib-logging

#### Description
ai-lib-logging is an abstraction over console logging, with support for all console methods.

#### Installation
    npm install @adinfinity/ai-lib-logging --save

#### Usage
    import { Logger } from "@adinfinity/ai-lib-logging";
    let logger: Logger = Logger.getInstance("log prefix", Logger.severity.info);
    logger.info("A sample log entry");