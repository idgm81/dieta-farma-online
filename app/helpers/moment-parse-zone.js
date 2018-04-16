import { isArray } from '@ember/array';
import { helper } from '@ember/component/helper';
import moment from 'moment';


/**
 * Moment parse zone
 *
 * @example
 *     momentParseZone('2018-04-18T09:00:00.000Z')
 * 				Returns
 *
 * @method momentParseZone
 * @param  {String|Array}		params	date and format
 * @return {String}									Formatted date
 *
 */
export function momentParseZone(params = '') {
	const date = isArray(params) ? params[0] : params;
	const format = isArray(params) ? params[1] : '';

	return moment(date).utc().format(format);
}

/**
 * Moment parse zone helper.
 *
 * @example
 *     {{moment-parse-zone '2018-04-18T09:00:00.000Z' 'DD/MM/YYYY HH:mm'}}
 *
 * @namespace App
 * @extension_for Ember.Helper.helper
 */
export default helper(momentParseZone);