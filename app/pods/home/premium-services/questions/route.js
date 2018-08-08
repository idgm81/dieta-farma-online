import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  session: service(),

  i18n: service(),

  model() {
    return this.get('api').getUser(get(this, 'session.data.authenticated.id'));
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('questionsVersion', model.user.profile.level < 1 ? 1 : 2);
  }
});