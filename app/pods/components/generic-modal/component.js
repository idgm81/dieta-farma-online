import Component from '@ember/component';

export default Component.extend({

  classNames: ['modal', 'fade'],

  attributeBindings: ['id', 'tabindex', 'role', 'aria-hidden'],

  tabindex: -1,

  role: 'dialog',

  'aria-hidden': 'true',

  buttonText: 'Ok',

  actions: {
    close: function() {
      this.sendAction('onclose');
    }
  }
});
