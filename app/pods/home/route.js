import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';
import { get } from '@ember/object';
import { reads } from '@ember/object/computed';
import RSVP from 'rsvp';
import { USER_ROLES } from './constants';

export default Route.extend({

  session: service(),

  api: service(),

  userId: reads('session.data.authenticated.id'),

  model() {
    const id = get(this, 'userId');

    return RSVP.hash({
      userData: this.get('api').getUser(id),
      inboxThreads: this.get('api').getThreads(id)
    }).catch(() => this.transitionTo('index'));
  },

  redirect(model) {
    this._super(...arguments);

    run.later(() => this.get('session').invalidate(), 15 * 60 * 1000); //close session after 15 minutes

    const nextRoute = get(model, 'userData.user.role') === USER_ROLES.NUTRITIONIST
      ? 'home.clients.index'
      : 'home.index';

    this.transitionTo(nextRoute);
  },

  setupController: function(controller, model) {
    this._super(...arguments);

    controller.setup(model);
  }
});