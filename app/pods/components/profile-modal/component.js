import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

  i18n: service(),

  classNames: ['modal', 'fade'],

  attributeBindings: ['id', 'tabindex', 'role', 'aria-hidden'],

  tabindex: -1,

  role: 'dialog',

  'aria-hidden': 'true',

  value: null,

  actions: {
    save() {
      if (!$('button.btn-df').hasClass('disabled')) {
        $('.modal').modal('hide');
        this.sendAction('onsave', this.get('field'), this.get('value'));
      }
    },
    cancel() {
      this.sendAction('oncancel');
    },
    validate() {
      const field = this.get('field');
      const patterns = {
        birthday: '^\\d{2}\\/\\d{2}\\/\\d{4}$',
        email: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
        phone: '^(\\+34)?(6|7|9)\\d{8}$'
      }
      const validated = new RegExp(patterns[field] || '.*', 'g').test(this.get('value'));

      validated
        ? $('button.btn-df').removeClass('disabled')
        : $('button.btn-df').addClass('disabled');
    }
  }
});