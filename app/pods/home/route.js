import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { get } from '@ember/object';
import { reads } from '@ember/object/computed';
import RSVP from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {

  session: service(),

  api: service(),

  userId: reads('session.data.authenticated.id'),

  beforeModel(transition) {
    this._super(...arguments);

    const id = get(this, 'userId');
        
    if (!id) {
      return this.transitionTo('index')
    }

    return transition;
  },

  model() {
    const id = get(this, 'userId');

    return RSVP.hash({
      userData: this.get('api').getUser(id),
      inboxThreads: this.get('api').getThreads(id)
    })
    .catch(() => this.transitionTo('index'));
  },

  setupController: function(controller, model) {
    this._super(...arguments);

    later(() => this.get('session').invalidate(), 10 * 60 * 1000); // close session after 10 minutes

    controller.setup(model);
  },

  actions: {
    loading(transition, originRoute) {
      $('#modal-loading-home').modal();

      transition.promise.finally(function() {
        $('#modal-loading-home').modal('hide')
      });
    }
  }
});