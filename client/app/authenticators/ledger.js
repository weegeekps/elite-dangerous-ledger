import Ember from 'ember';
import Torii from 'simple-auth-torii/authenticators/torii';

export default Torii.extend({
	authenticate: function (provider) {
		var self = this;
		return new Ember.RSVP.Promise(function (resolve, reject) {
			self._super(provider).then(function (data) {
				// Exchange token stuff here with server.

				self.resolveWith(provider, data, resolve);
			}, reject);
		});
	},
	restore: function (data) {
		var self = this;
		data = data || {};
		return new Ember.RSVP.Promise(function (resolve, reject) {
			if (!Ember.isEmpty(data.provider)) {
				self._super(data).then(function (data) {
					// Refresh token with server here.

					self.resolveWith(data.provider, data, resolve);
				}, function () {
					delete data.provider;
					reject();
				});
			} else {
				delete data.provider;
				reject();
			}
		});
	}
});
