import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import { setProperties } from '@ember/object';
import moment from 'moment';
import $ from 'jquery';

export default Component.extend({

  api: service(),

  classNames: ['dt-register-page', 'top-content'],

  birthdayYear: {
    min: 1936,
    max: moment().year() 
  },

  data: {},

  hasError: false,

  step: '1',

  didInsertElement() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, () => {
      $('.register fieldset:first').fadeIn('slow');
      setProperties(this.get('data'), {
        birthday: { day: 1, month: 1, year: 1970 },
        genre: 'female',
        measures: {
          height: '',
          weight: ''
        },
        phone: ''
      });

      $('form.register').on('invalid.bs.validator', this._showError);
      $('form.register').on('valid.bs.validator', this._hideError);
      $('#end-register-modal-success').modal({ backdrop: 'static', keyboard: false, show: false});
      $('#end-register-modal-error').modal({ backdrop: 'static', keyboard: false, show: false});
    });
  },

  _showError(e) {
    $(e.relatedTarget).addClass('field-error');
  },

  _hideError(e) {
    $(e.relatedTarget).removeClass('field-error');
  },

  _scrollToClass(element_class, removed_height) {
    const scroll_to = $(element_class).offset().top - removed_height;
    if ($(window).scrollTop() != scroll_to) {
      $('html, body').stop().animate({scrollTop: scroll_to}, 0);
    }
  },

  _barProgress(progress_line_object, direction) {
    const number_of_steps = progress_line_object.data('number-of-steps');
    const now_value = progress_line_object.data('now-value');
    let new_value = 0;

    if(direction == 'right') {
      new_value = now_value + ( 100 / number_of_steps );
    }
    else if(direction == 'left') {
      new_value = now_value - ( 100 / number_of_steps );
    }
    progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
  },

  _checkFormErrors() {
    const formFields = $(`#register-step-${this.get('step')}`).find('input');
    formFields.attr('data-validate', 'true');
    formFields.attr('required', 'true');

    $('form.register').validator('validate');
    const errors = $('form.register').find('input, textarea, select').filter((index, element) =>
      $(element).hasClass('field-error')
    );

    this.set('hasError', errors.length ? true : false);
  },

  actions: {

    selectEmploymentType(type) {
      this.set('data.employmentType', type);
    },

    selectTransportType(type) {
      this.set('data.transportType', type);
    },

    selectActivityFrecuency(frecuency) {
      this.set('data.activityFrecuency', frecuency);
    },

    previousStep() {
      const step = this.get('step');
      const parent_fieldset = '#register-step-' + step;
      const current_active_step = $('form.register').find('.register-step.active');
      const progress_line = $('form.register').find('.register-progress-line');
      this.decrementProperty('step');

      $(parent_fieldset).fadeOut(() => {
        // change icons
        current_active_step.removeClass('active').prev().removeClass('completed').addClass('active');
        // progress bar
        this._barProgress(progress_line, 'left');
        // show previous step
        $(parent_fieldset).prev().fadeIn();
        // scroll window to beginning of the form
        this._scrollToClass( $('.register'), 20 );
      });
    },

    saveStep() {
      this._checkFormErrors();
      if (!this.get('hasError')) {
        const step = this.get('step');
        const parent_fieldset = '#register-step-' + step;
        const current_active_step = $('form.register').find('.register-step.active');
        const progress_line = $('form.register').find('.register-progress-line');

        if (Number(step) < 2) {
          this.incrementProperty('step');
          $(parent_fieldset).fadeOut(() => {
            // change icons
            current_active_step.removeClass('active').addClass('completed').next().addClass('active');
            // progress bar
            this._barProgress(progress_line, 'right');
            // show next step
            $(parent_fieldset).next().fadeIn();
            // scroll window to beginning of the form
            this._scrollToClass($('.register'), 20 );
          });
        } else {
          this.sendAction('onsumit');
        }
      }
    },

    register() {
      if (Number(this.get('step')) === 2) {
        this._checkFormErrors();
        if (!this.get('hasError')) {
          this.sendAction('onsubmit', this.get('data'));
        }
      }
    },

    success() {
      this.sendAction('onsuccess');
    }
  }
});
