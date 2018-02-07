import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, $ } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  queryParams: {
    userId: {
      refreshModel: true
    }
  },

  resetController(controller, isExiting, transition) {
    if (isExiting) {
      controller.set('title', '');
      controller.set('text', '');
    }
  }
});
