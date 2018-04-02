import { equal } from '@ember/object/computed';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  isNutritionist: equal('session.data.authenticated.role', 'N')
});