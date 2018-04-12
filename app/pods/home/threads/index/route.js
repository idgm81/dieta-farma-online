import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  session: service(),

  model() {
    const userId = this.get('session.data.authenticated.id');

    return this.get('api').getThreads(userId).then(({threads}) => {
      threads.forEach((thread) => { thread.messages = thread.messages.reverse() });

      return threads;
    });
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('isNutritionist', get(this, 'session.data.authenticated.role') === 'N');
  },

  actions: {
    new() {
      const queryParams = { from: this.get('session.data.authenticated.id') }
      this.transitionTo('home.threads.new', { queryParams });
    },
    detail(id) {
      this.transitionTo('home.threads.thread', id);
    }
  }
});