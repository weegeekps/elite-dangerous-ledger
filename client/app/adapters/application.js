import DS from 'ember-data';

export default DS.RESTAdapter.extend( {
  coalesceFindRequests: true,   // these blueprints support coalescing (reduces the amount of requests)
  namespace: '/',               // same as API prefix in Sails config
  host: 'http://localhost:8081' // Sails server
});
