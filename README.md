# winston-insights
A WinstonJS logging transport for New Relic Insights

```javascript
var winston = require('winston');

require('winston-insights');

var options = {
  appId: <YOUR APP ID (optional)>,
  insertKey: <YOUR INCIDENT KEY (required)>,
  accountId: <YOUR ACCOUNT ID (required)>,
  eventType: "winstonInsightsTest",
  level: "error",
  maxPending: 1
};

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.Insights)(options)
  ]
});

logger.error("Test, test, test", {
  "param1": "val1",
  "param2": "val2",
  "param3": "val3",
  "param4": "val4",
  "param5": "val5"
});
```