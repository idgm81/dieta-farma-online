import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  queryParams: {
    from: {
      refreshModel: true
    },
    to: {
      refreshModel: true
    }
  },

  resetController(controller, isExiting, transition) {
    if (isExiting) {
      controller.set('from', '');
      controller.set('to', '');
      controller.set('title', '');
      controller.set('text', '');
    }
  }
});