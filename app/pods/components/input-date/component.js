import Component from '@ember/component';

const DATE_FORMAT = 'dd/mm/yyyy';

export default Component.extend({

  classNames: ['form-group'],

  id: '',

  labelText: '',

  value: '',

  required: true,

  didInsertElement() {
    this._super(...arguments);

    this.$(`.${this.get('id')}`).datepicker({
      language: 'es',
      autoclose: true,
      format: DATE_FORMAT,
      container: `.${this.get('id')}`,
      todayHighlight: true,
      orientation: 'bottom'
    });
  },

  /**
	 * Change event.
	 *
	 * @method change
	 */
	change(e) {
		this._super(e);

		if (this.get('onchange')) {
			this.sendAction('onchange', this.get('value'));
		}
	}
});
