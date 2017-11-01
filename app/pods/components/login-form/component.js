import Ember from 'ember';

const validations = {
  user: /.@.+..+/,
  password: /.{8,}/
};

export default Ember.Component.extend({

  attributeBindings: ['id'],

  classNames: ['top-content'],

  user: null,

  password: null,

  didInsertElement() {
    this._super(...arguments);
    Ember.$.backstretch("../../assets/images/backgrounds/login-1.jpg");
  },

  validateCredentials(credentials) {
    const isValidUser = credentials.user !== undefined && validations.user.test(credentials.user);
    const isValidPassword = credentials.password !== undefined && validations.password.test(credentials.password);

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
    submit(e) {
      e.preventDefault();
      e.stopPropagation();

      const credentials = {
        user: this.get('user'),
        password: this.get('password')
      };
      if (this.validateCredentials(credentials)) {
        this.sendAction('submit', credentials);
      }
    }
  }
});
