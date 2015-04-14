var util = require('util');
var winston = require('winston');
var NodeInsights = require('node-insights');

var os = require('os');

var Insights = winston.transports.Insights = function (options) {
  winston.Transport.call(this, options);
  options = options || {};

  var requiredOptions = ['insertKey', 'accountId', 'eventType'];

  requiredOptions.forEach(function (item) {
    if (!options[item]) throw new Error("Missing required config '" + item + "'");
  });

  //
  // Name this logger
  //
  this.name = 'insights';

  //
  // Set the level from your options
  //
  this.level = options.level || 'error';

  //
  // Configure your storage backing as you see fit
  //
  var insightsOptions = {
    insertKey: options.insertKey,
    accountId: options.accountId
  };

  if (options.appId) insightsOptions.appId = options.appId;
  if (options.maxPending) insightsOptions.maxPending = options.maxPending;

  this.insights = new NodeInsights(insightsOptions);
  this.hostname = os.hostname();
  this.eventType = options.eventType;

  this.additionalParams = options.additionalParams || {};
};

//
// Inherit from `winston.Transport` so you can take advantage
// of the base functionality and `.handleExceptions()`.
//

util.inherits(Insights, winston.Transport);

//
// Expose the name of this Transport on the prototype
//

Insights.prototype.name = 'insights';

//
// ### function log (level, msg, [meta], callback)
// #### @level {string} Level at which to log the message.
// #### @msg {string} Message to log
// #### @meta {Object} **Optional** Additional metadata to attach
// #### @callback {function} Continuation to respond to when complete.
// Core logging method exposed to Winston. Metadata is optional.
//

Insights.prototype.log = function (level, msg, meta, callback) {
  //
  // Store this message and metadata, maybe use some custom logic
  // then callback indicating success.
  //

  var data = {
    level: level,
    message: msg,
    host: this.hostname
  };

  for (var m in meta) {
    data[m] = meta[m];
  }

  for (var a in this.additionalParams) {
    data[a] = this.additionalParams[a];
  }

  this.insights.add(data, this.eventType);
  
};