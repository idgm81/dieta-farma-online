import { isArray } from '@ember/array';
import { helper } from '@ember/component/helper';

const IMAGE_PATH = '/assets/images/';

/**
 * Image path function.
 *
 * @example
 *     imagePath('image.png')
 *         Returns 'assets/images/image.png'
 *
 * @method imagePath
 * @param  {String|Array}		params  The relative path to the image
 * @return {String}									Path to the image
 *
 */
export function imagePath(params = '') {
	let imgPath = isArray(params) ? params[0] : params;

	// imgPath is not string >> empty string
	if (typeof imgPath !== 'string') {
		imgPath = '';
	}

	return `${IMAGE_PATH}${imgPath}`;
}

/**
 * Image path helper.
 *
 * @example
 *     {{image-path 'image.png'}}
 *
 * @namespace App
 * @extension_for Ember.Helper.helper
 */
export default helper(imagePath);