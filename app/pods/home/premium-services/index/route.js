import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { reads }  from '@ember/object/computed';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  session: service(),

  stripe: service('stripev3'),

  api: service(),

  userId: reads('session.data.authenticated.id'),

  beforeModel(transition) {
    this._super(...arguments);

    this.get('stripe').load();

    return transition;
  },

  model() {
    return this.get('api').getUser(this.get('userId'));
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.setup(model);
  }
});
