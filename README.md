# lib-logging

#### Description
A browser console logging library, with support for colors, log levels and objects (dirxml).

#### Installation
    npm install @kartik-rao/lib-logging --save

#### Usage
    import { Logger } from "@kartik-rao/lib-logging";

    // First we supply some prefixes to prepend to each log message
    // Then we override the default severity (warn) to debug
    let logger: Logger = Logger.Logger.getInstance(["lib-logging-test", "logprefix"], Logger.severity.debug);

    // Log this message with severity info
    logger.info("A sample log entry");

#### Sample Output

##### Debug (black)
```14:04:05 [debug] lib-logging-test logprefix  A sample log entry```

##### Info (black)
```14:04:05 [info] lib-logging-test logprefix  A sample log entry```

##### Warn (dark orange)
```14:04:05 [warn] lib-logging-test logprefix  A sample log entry```

##### Error (red)
```14:04:05 [error] lib-logging-test logprefix  A sample log entry```