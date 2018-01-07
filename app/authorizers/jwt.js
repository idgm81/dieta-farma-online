import Base from 'ember-simple-auth/authorizers/base';
import Ember from 'ember';

export default Base.extend({

  session: Ember.inject.service(),

  authorize(sessionData, block) {
    const { token } = sessionData
    if (this.get('session.isAuthenticated') && token) {
      block('Authorization', `JWT ${token}`);
    }
  }
});
