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
  },

  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    
    controller.setProperties({
      title: '',
      fromDate: '',
      toDate: '',
      file: null
    });
  }
});