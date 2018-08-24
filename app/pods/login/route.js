import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(ApplicationRouteMixin, UnauthenticatedRouteMixin, {
  routeIfAlreadyAuthenticated: 'home'
});