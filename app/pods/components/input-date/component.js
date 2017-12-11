import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['form-group'],

  innerId: null,

  labelText: '',

  type: 'text',

  format: 'dd/mm/yyyy',

  required: true,

  dateValue: null,

  didInsertElement() {
    this._super(...arguments);

    this.$('.input-group.date').datepicker({
      calendarWeeks: true,
      autoclose: true,
      format: this.get('format')
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
