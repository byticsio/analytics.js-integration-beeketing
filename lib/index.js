
/**
 * Module dependencies.
 */
var dates = require('convert-dates');
var each = require('each');
var includes = require('includes');
var integration = require('analytics.js-integration');

/**
 * Expose `BeeketingTrack` integration.
 */

var BeeketingTrack = module.exports = integration('BeeketingTrack')
    .global('BeeketingTrack')
    .option('token', '');

/**
 * Initialize.
 *
 * https://beeketing.com/help/reference/javascript#installing
 * https://beeketing.com/help/reference/javascript-full-api-reference#beeketing.init
 *
 * @api public
 */

BeeketingTrack.prototype.initialize = function() {

  /* eslint-disable */
  // Sell lib code
  /* eslint-enable */

  this.options.increments = lowercase(this.options.increments);
  var options = alias(this.options, optionsAliases);
  window.BeeketingTrack.init(options.token, options);
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @api private
 * @return {boolean}
 */

BeeketingTrack.prototype.loaded = function() {
  return !!(window.BeeketingTrack && window.BeeketingTrack.config);
};

/**
 * Identify.
 *
 * https://mixpanel.com/help/reference/javascript#super-properties
 * https://mixpanel.com/help/reference/javascript#user-identity
 * https://mixpanel.com/help/reference/javascript#storing-user-profiles
 *
 * @api public
 * @param {Identify} identify
 */

BeeketingTrack.prototype.identify = function(identify) {
  //var username = identify.username();
  //var email = identify.email();
  var id = identify.userId();
  if (id) window.BeeketingTrack.identify(id);
};

/**
 * Track.
 *
 * https://mixpanel.com/help/reference/javascript#sending-events
 * https://mixpanel.com/help/reference/javascript#tracking-revenue
 *
 * @api public
 * @param {Track} track
 */

BeeketingTrack.prototype.track = function(track) {
  window.BeeketingTrack.track(track.event(), track.properties());
};