import { isArray } from '@ember/array';
import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

const LABELS = {
	['P'] : 'label.meet.face.paid',
	['L'] : 'label.meet.face.payLater',
	['V'] : 'label.meet.video',
	['O'] : 'label.meet.online'
};

/**
 * Translate meet type helper
 *
 *	@example
 *		{{translate-meet-type 'V'}}
 *		returns Videollamada
 *
 * @namespace App
 * @extends Ember.Helper.helper
 */
export default Helper.extend({

	/**
	 * I18n service injection
	 *
	 * @property i18n
	 * @type {Ember.Service}
	 */
	i18n: service(),

	compute(params) {
		const type = isArray(params) ? params[0] : params;

		if (type) {
			return this.get('i18n').t(LABELS[type]).toString();
		}
	}
});