import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';
import { get } from '@ember/object';
import { reads } from '@ember/object/computed';
import RSVP from 'rsvp';
import { USER_ROLES } from './constants';

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
    $('#modal-loading-home').modal();
    const id = get(this, 'userId');

    return RSVP.hash({
      userData: this.get('api').getUser(id),
      inboxThreads: this.get('api').getThreads(id)
    })
    .catch(() => this.transitionTo('index'))
    .finally(() => $('#modal-loading-home').modal('hide'));
  },

  redirect(model) {
    this._super(...arguments);

    run.later(() => this.get('session').invalidate(), 15 * 60 * 1000); // close session after 15 minutes

    this.transitionTo('home.index');
  },

  setupController: function(controller, model) {
    this._super(...arguments);

    controller.setup(model);
  }
});