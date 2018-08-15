import Component from '@ember/component';
import { run } from '@ember/runloop';

export default Component.extend({

  email: '',

  password: '',

  didInsertElement() {
    this._super(...arguments);

    run.scheduleOnce('afterRender', this, function() {
      this.$('.login-form').on('invalid.bs.validator', (e) => $(e.relatedTarget).addClass('field-error'));
      this.$('.login-form').on('valid.bs.validator', (e) => $(e.relatedTarget).removeClass('field-error'));

      this.$('.login-form').validator().on('submit', (e) => {
        if (!e.isDefaultPrevented()) {
          e.preventDefault();
          e.stopPropagation();
          // everything looks good!
          const credentials = {
            email: this.get('email'),
            password: this.get('password')
          };

          this.sendAction('onsubmit', credentials);
        }
      });
    });
  },

  actions: {
    reset() {
      this.sendAction('onreset');
    }
  }
});