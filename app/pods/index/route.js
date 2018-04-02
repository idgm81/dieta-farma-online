import Route from '@ember/routing/route';

export default Route.extend({

  actions: {
    goToLogin() {
      this.transitionTo('login');
    },

    goToRegister() {
      this.transitionTo('register');
    }
  }
});
