import { reads } from '@ember/object/computed';
import { run } from '@ember/runloop';
import Component from '@ember/component';

export default Component.extend({

  email: '',

  error: null,

  msgError: reads('error'),

  didInsertElement() {
    this._super(...arguments);

    run.scheduleOnce('afterRender', this, function() {
      this.$('.email-form').on('invalid.bs.validator', (e) => $(e.relatedTarget).addClass('field-error'));
      this.$('.email-form').on('valid.bs.validator', (e) => $(e.relatedTarget).removeClass('field-error'));

      this.$('.email-form').validator().on('submit', (e) => {
        if (!e.isDefaultPrevented()) {
          e.preventDefault();
          e.stopPropagation();

          this.sendAction('onsubmit', this.get('email'));
        }
      });
    });
  }
});