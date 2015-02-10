import Authenticator from 'client/authenticators/ledger';

export default {
	name: 'simple-auth-ledger',
	before: 'simple-auth',
	after: 'simple-auth-torii',
	initialize: function (container) {
		var torii = container.lookup('torii:main');
		var authenticator = Authenticator.create({torii: torii});
		container.register('simple-auth-authenticator:ledger', authenticator, {instantiate: false});
	}
};
