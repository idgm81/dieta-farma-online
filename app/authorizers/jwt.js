import { inject as service } from '@ember/service';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({

  session: service(),

  authorize(sessionData, block) {
    const { token } = sessionData
    if (this.get('session.isAuthenticated') && token) {
      block('Authorization', `JWT ${token}`);
    }
  }
});
