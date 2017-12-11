import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, RSVP, inject: { service }, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  actions: {
    save() {
      this.get('api').createDiet({
        title: this.get('title'),
        text: this.get('detail')
      });
    }
  }
});
