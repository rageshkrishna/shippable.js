'use strict';

module.exports = Shippable;

var Account = require('./account.js'),
    Subscription = require('./subscription.js'),
    Project = require('./project.js'),
    bunyan = require('bunyan'),
    log = bunyan.createLogger({ name: 'shippable.js' });

function Shippable(apiEndpoint, apiToken) {
  //log.debug('Using API endpoint', apiEndpoint);

  var RequestHelper = require('./requestHelper.js');
  var helper = new RequestHelper(apiEndpoint, apiToken, log);
  var util = require('util');

  this.getAccountIds = function(callback) {
    return helper.get('/accounts', callback);
  };

  this.getAccount = function(accountId, callback) {
    var url = util.format('/accounts/%s', accountId);
    helper.get(url, function(err, accountData) {
      var account = null;
      if (!err) account = new Account(accountData, helper);
      callback(err, account);
    });
  };

  this.getSubscription = function(subscriptionId, callback) {
    var url = util.format('/subscriptions/%s', subscriptionId);
    helper.get(url, function(err, subData) {
      var sub = null;
      if (!err) sub = new Subscription(subData, helper);
      callback(err, sub);
    });
  };

  this.getProject = function(projectId, callback) {
    var url = util.format('/projects/%s', projectId);
    helper.get(url, function(err, projectData) {
      var project = null;
      if (!err) project = new Project(projectData, helper);
      callback(err, project);
    });
  };

}
