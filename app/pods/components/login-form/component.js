import Ember from 'ember';

const validations = {
  email: /.@.+..+/,
  password: /.{8,}/
};

export default Ember.Component.extend({

  email: '',

  password: '',

  authError: false,

  msgError: Ember.computed('authError', function () {
    return 'Usuario o contraseña inválidos';
  }),

  validateCredentials(loginCredentials) {
    const isValidUser = loginCredentials.email !== undefined && validations.email.test(loginCredentials.email);
    const isValidPassword = loginCredentials.password !== undefined && validations.password.test(loginCredentials.password);

    if (!isValidUser) {
      Ember.$('form').find('input').eq(0).addClass('input-error');
    } else {
      Ember.$('form').find('input').eq(0).removeClass('input-error');
    }

    if (!isValidPassword) {
      Ember.$('form').find('input').eq(1).addClass('input-error');
    } else {
      Ember.$('form').find('input').eq(1).removeClass('input-error');
    }

    return isValidUser && isValidPassword;
  },

  actions: {
    submit() {
      const loginCredentials = {
        email: this.get('email'),
        password: this.get('password')
      };
      if (this.validateCredentials(loginCredentials)) {
        this.sendAction('onsubmit', loginCredentials);
      }
    }
  }
});
