import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { imagePath } from 'dieta-farma-online/helpers/image-path';

export default Route.extend(AuthenticatedRouteMixin, {

  session: service(),

  api: service(),

  avatar: '',

  model() {
    return this.get('api').getUser(this.get('session.data.authenticated.id'));
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('avatar', model?.user?.profile?.avatar || imagePath('default-avatar.png'));
  }
});