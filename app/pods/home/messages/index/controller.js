import Ember from 'ember';

const { inject: { service }, computed } = Ember;

export default Ember.Controller.extend({
  session: service(),

  isNutritionist: computed.equal('session.data.authenticated.role', 'N')
});
