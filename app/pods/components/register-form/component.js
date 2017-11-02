import Ember from 'ember';

const rules = {
  email: /.@.+..+/,
  password: /.{8,}/
};

export default Ember.Component.extend({

  attributeBindings: ['id'],

  classNames: ['top-content'],

  step: '1',

  didInsertElement() {
    this._super(...arguments);

    Ember.$.backstretch("../../assets/images/backgrounds/register-1.jpg");
    this.$('.register fieldset:first').fadeIn('slow');

    this.$('.register input[type="text"], .register input[type="password"], .register input[type="email"], .register textarea').on('focus', () => {
      $(this).removeClass('input-error');
    });

    this.$('#register-birthday').datepicker({ format: 'dd/mm/yyyy' });
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

  _validateStep(stepNumber) {
    let validated = true;
    const parent_fieldset = '#register-step-' + stepNumber;

    $(parent_fieldset).find('input, textarea').each((index, element) => {
      if ($(element).attr('type') === 'text') {
        if(($(element).attr('required') && $(element).val() === '' )) {
          $(element).addClass('input-error');
          validated = false;
        }
        else {
          $(element).removeClass('input-error');
        }
      }

      if ($(element).attr('type') === 'email') {
        if(($(element).attr('required') && $(element).val() === '') || !rules.email.test($(element).val())) {
          $(element).addClass('input-error');
          validated = false;
        }
        else {
          $(element).removeClass('input-error');
        }
      }

      if ($(element).attr('type') === 'password') {
        if(($(element).attr('required') && $(element).val() === '') || !rules.password.test($(element).val())) {
          $(element).addClass('input-error');
          validated = false;
        }
        else {
          $(element).removeClass('input-error');
        }
      }

      if ($(element).tagName === 'textarea') {
        if(($(element).attr('required') && $(element).val() === '')) {
          $(element).addClass('input-error');
          validated = false;
        }
        else {
          $(element).removeClass('input-error');
        }
      }
    });

    return validated;

    /**
    if (!isValidInput) {
      Ember.$('form').find('input').eq(0).addClass('input-error');
    } else {
      Ember.$('form').find('input').eq(0).removeClass('input-error');
    }

    if (!isValidPassword) {
      Ember.$('form').find('input').eq(1).addClass('input-error');
    } else {
      Ember.$('form').find('input').eq(1).removeClass('input-error');
    }*/
  },


  actions: {

    previousStep() {
      const step = this.get('step');
      const parent_fieldset = '#register-step-' + step;
      const current_active_step = $('form.register').find('.register-step.active');
      const progress_line = $('form.register').find('.register-progress-line');
      this.decrementProperty(this.get('step'));

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
      const step = this.get('step');
      const parent_fieldset = '#register-step-' + step;
      const current_active_step = $('form.register').find('.register-step.active');
      const progress_line = $('form.register').find('.register-progress-line');

      if(this._validateStep(step)) {
        if (Number(step) < 5) {
          this.incrementProperty(this.get('step'));
          $(parent_fieldset).fadeOut(() => {
            // change icons
            current_active_step.removeClass('active').addClass('completed').next().addClass('active');
            // progress bar
            this._barProgress(progress_line, 'right');
            // show next step
            $(parent_fieldset).next().fadeIn();
            // scroll window to beginning of the form
            this._scrollToClass( $('.register'), 20 );
          });
        } else {
          this.sendAction('onsumit');
        }
      }
    }
  }
});
