'use strict';

var _ = require('underscore'),
    util = require('util'),
    Build = require('./build.js');

module.exports = Project;

function Project(data, helper) {
  var self = this;
  _.extend(this, data);

  this.loadDetails = function(callback) {
    var url = util.format('/projects/%s', this.id);
    helper.get(url, function(err, data) {
      if (!err) {
        _.extend(self, data);
      }
      callback(err, self);
    });
  };

  this.enableBuilds = function(callback) {
    var url = util.format('/projects/%s/enable',self.id),
        body = {
          projectId: self.id
        };

    helper.post(url, body, function(err) {
      if (!err) {
        self.loadDetails(callback);
      } else {
        callback(err);
      }
    });
  };

  this.disableBuilds = function(callback) {
    var url = util.format('/projects/%s/disable',self.id);
        body = {
          projectId: self.id
        };

    helper.post(url, body, function(err) {
      if (!err) {
        self.loadDetails(callback);
      } else {
        callback(err);
      }
    });
  };

  this.build = function(callback) {
    var url = util.format('/projects/%s/newBuild', self.id),
        body = {
          projectId: self.id
        };

    helper.post(url, body, function(err, result) {
      var build = null;
      if (!err) build = new Build({ id: result.buildId }, helper);
      callback(err, build);
    });
  };
}
