import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  queryParams: {
    userId: {
      refreshModel: true
    },
    name: {
      refreshModel: true
    }
  }
});