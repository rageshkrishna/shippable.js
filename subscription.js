'use strict';

var _ = require('underscore'),
    util = require('util');

module.exports = Subscription;


function Subscription(data, helper) {
  var self = this;
  _.extend(this, data);

  this.loadDetails = function(callback) {
    var url = util.format('/subscriptions/%s', this.id);
    helper.get(url, function(err, data) {
      if (!err) {
        _.extend(self, data);
      }
      callback(err, self);
    });
  };

  this.getProjects = function(callback) {
    var url = util.format('/subscriptions/%s/projects', this.id);
    helper.get(url, callback);
  };
}
