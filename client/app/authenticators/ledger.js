import Ember from 'ember';
import Torii from 'simple-auth-torii/authenticators/torii';

export default Torii.extend({
    authenticate: function (provider) {
        var self = this;
        return new Ember.RSVP.Promise(function (resolve, reject) {
            self._super(provider).then(function (data) {
                // Exchange token stuff here with server.

                Ember.$.ajax({
                    data: {
                        code: data.authorizationCode
                    },
                    type: 'POST',
                    url: 'http://localhost:8081/auth/login' // TODO: Make this configurable in the environment.js file.
                }).then(function (data) {
                    // Do stuff
	                var sessionData = {
		                'access_token': data.accessToken,
		                'user_id': data._id
	                };

	                self.resolveWith(provider, sessionData, resolve);
                }, function (err) {
                    console.log(err);
	                self.reject();
                });
            }, reject);
        });
    },
    restore: function (sessionData) {
        var self = this;
        sessionData = sessionData || {};
        return new Ember.RSVP.Promise(function (resolve, reject) {
            if (!Ember.isEmpty(sessionData.provider) && !Ember.isEmpty(sessionData.access_token) && !Ember.isEmpty(sessionData.user_id)) {
	            Ember.$.ajax({
					data: {
						accessToken: sessionData.access_token,
						userId: sessionData.user_id
					},
					type: 'POST',
					url: 'http://localhost:8081/auth/validate' // TODO: Make this configurable in the environment.js file.
				}).then(function (data) {
					self.resolveWith(sessionData.provider, data, resolve);
				}, function (err) {
					console.log(err);
					delete sessionData.provider;
					reject();
				});
            } else {
                delete sessionData.provider;
                reject();
            }
        });
    },
    invalidate: function (data) {
        var self = this;
        return new Ember.RSVP.Promise(function (resolve, reject) {
            self._super(self.provider).then(function () {
                Ember.$.ajax({
                    type: 'GET',
                    url: 'http://localhost:8081/auth/logout/' + data.user_id
                });

                resolve();
            }, reject);
        });
    }
});
