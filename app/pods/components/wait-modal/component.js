import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['modal', 'fade'],

  attributeBindings: ['id', 'tabindex', 'role', 'aria-hidden'],

  tabindex: -1,

  role: 'dialog',

  'aria-hidden': 'true',

  willDestroyElement() {
    this._super(...arguments);

    $(`#${this.get('id')}`).modal('hide');
  }
});
