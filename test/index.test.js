'use strict';

var Analytics = require('@segment/analytics.js-core').constructor;
var integration = require('@segment/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');
var Beeketing = require('../lib/');

describe('Beeketing', function() {
  var analytics;
  var beeketing;
  var options = {
    token: 'test'
  };

  beforeEach(function() {
    analytics = new Analytics();
    beeketing = new Beeketing(options);
    analytics.use(Beeketing);
    analytics.use(tester);
    analytics.add(beeketing);
  });

  afterEach(function() {
    analytics.restore();
    analytics.reset();
    beeketing.reset();
    sandbox();
  });

  it('should have the right settings', function() {
    analytics.compare(Beeketing, integration('Beeketing')
      .global('BeeketingTrack')
      .option('token', ''));
  });
});
