import Ember from 'ember';

const { Helper: { helper } } = Ember;

const IMAGE_PATH = '/assets/images/';

/**
 * Image path function.
 *
 * @example
 *     getImage('image.png')
 *         Returns 'assets/images/image.png'
 *
 * @method imagePath
 * @param  {String}|{Array}		params  The relative path to the image
 * @return {String}            	Path to the image
 *
 */
export function imagePath(params = '') {
	let imgPath = Ember.isArray(params) ? params[0] : params;

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
