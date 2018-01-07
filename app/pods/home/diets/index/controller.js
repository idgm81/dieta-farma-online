import Ember from 'ember';
import { USER_ROLES } from '../../constants';

const { inject: { service }, computed } = Ember;

export default Ember.Controller.extend({

  session: service(),

  isNutriotionist: computed.equal('session.data.authenticated.role', USER_ROLES.NUTRITIONIST),
});
