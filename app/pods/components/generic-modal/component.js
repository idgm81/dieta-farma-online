import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['modal', 'fade'],

  attributeBindings: ['id', 'tabindex', 'role', 'aria-hidden'],

  tabindex: -1,

  role: 'dialog',

  'aria-hidden': 'true',

  actions: {
    ok: function() {
      this.$('.modal').modal('hide');
      this.sendAction('onaccept');
    },

    close: function() {
      this.$('.modal').modal('hide');
      this.sendAction('onclose');
    }
  },

});
