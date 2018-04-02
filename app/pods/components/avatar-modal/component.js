import { set } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

  classNames: ['modal', 'fade'],

  attributeBindings: ['id', 'tabindex', 'role', 'aria-hidden'],

  tabindex: -1,

  role: 'dialog',

  'aria-hidden': 'true',

  file: null,

  avatar: null,

  actions: {
    fileLoaded(file) {

      set(this, 'file', file);

      const myCroppie = $('.modal-body').croppie({
        viewport: {
          width: 100,
          height: 100,
          type: 'circle'
        },
        boundary: {
          width: 300,
          height: 200,
        }
      });

      myCroppie.croppie('bind', {
        url: file.data
      });
    },
    save() {
      $('.modal-body').croppie('result', {
        type: 'base64',
        format: 'png',
        circle: 'true' 
			}).then((avatar) => {
        set(this, 'avatar', avatar);

        this.sendAction('onsave', avatar);
			})
    },
    cancel() {
      set(this, 'file', null);
      set(this, 'avatar', null)
      $('.modal-body').croppie('destroy');

      this.sendAction('oncancel');
    }
  }
});