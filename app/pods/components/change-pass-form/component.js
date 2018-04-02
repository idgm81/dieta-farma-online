import Component from '@ember/component';
import { run } from '@ember/runloop';

export default Component.extend({

  password: '',

  confirmPassword: '',

  didInsertElement() {
    this._super(...arguments);

    $('#form-confirm-password').attr('data-equals', 'form-password')
    $('#form-confirm-password').attr('data-equals-error', 'Las contraseñas no son iguales')

    run.scheduleOnce('afterRender', this, function() {
      this.$('.pass-form').on('invalid.bs.validator', (e) => $(e.relatedTarget).addClass('field-error'));
      this.$('.pass-form').on('valid.bs.validator', (e) => $(e.relatedTarget).removeClass('field-error'));

      this.$('.pass-form').validator({
        custom: {
          equals: function($el) {
            return $el.val() !== $(`#${$el.data('equals')}`).val()
          }
        }
      }).on('submit', (e) => {
        if (!e.isDefaultPrevented()) {
          e.preventDefault();
          e.stopPropagation();
          // everything looks good!

          this.sendAction('onsubmit', this.get('password'));
        }
      });
    });
  }
});
