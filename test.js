var winston = require('winston');

require('./index.js');

var options = {
  appId: process.env.NR_APP_ID,
  insertKey: process.env.NR_INSERT_KEY,
  accountId: process.env.NR_ACCOUNT_ID,
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


logger.error("Test, test, test", {
  "param1": "val1",
  "param2": "val2",
  "param3": "val3",
  "param4": "val4",
  "param5": "val5"
});


logger.error("Test, test, test", {
  "param1": "val1",
  "param2": "val2",
  "param3": "val3",
  "param4": "val4",
  "param5": "val5"
});