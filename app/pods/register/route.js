import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {

  actions: {
    register(data) {
      data.birthday = new Date(data.birthday);
      const newUser = this.store.createRecord('user', data);

      newUser.save()
        .then((response) => {
          Ember.$('#end-register-modal-success').modal();
        })
        .catch((error) => {
          Ember.$('#end-register-modal-error').modal();
        });
    },

    goToLogin() {
      this.transitionTo('login');
    }
  }
});
