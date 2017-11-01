import Ember from 'ember';

export default Ember.Component.extend({

  attributeBindings: ['id'],

  classNames: ['top-content'],

  didInsertElement() {
    this._super(...arguments);

    Ember.$.backstretch("../../assets/images/backgrounds/register-1.jpg");
    this.$('.f1 fieldset:first').fadeIn('slow');

    this.$('.f1 input[type="text"], .f1 input[type="password"], .f1 textarea').on('focus', () => {
      $(this).removeClass('input-error');
    });

    // next step
    this.$('.f1 .btn-next').on('click', (e) => {
      var parent_fieldset = $(e.currentTarget).parents('fieldset');
      var next_step = true;
      // navigation steps / progress steps
      var current_active_step = $(e.currentTarget).parents('.f1').find('.f1-step.active');
      var progress_line = $(e.currentTarget).parents('.f1').find('.f1-progress-line');

      // fields validation
      parent_fieldset.find('input[type="text"], input[type="password"], textarea').each((index, element) => {
        if(element.val() === "" ) {
          element.addClass('input-error');
          next_step = false;
        }
        else {
          element.removeClass('input-error');
        }
      });
      // fields validation

      if( next_step ) {
        parent_fieldset.fadeOut(400, (element) => {
          // change icons
          current_active_step.removeClass('active').addClass('activated').next().addClass('active');
          // progress bar
          this._barProgress(progress_line, 'right');
          // show next step
          $(element).next().fadeIn();
          // scroll window to beginning of the form
          this._scrollToClass( $('.f1'), 20 );
        });
      }
    });

    // previous step
    $('.f1 .btn-previous').on('click', () => {
      // navigation steps / progress steps
      var current_active_step = $(this).parents('.f1').find('.f1-step.active');
      var progress_line = $(this).parents('.f1').find('.f1-progress-line');

      $(this).parents('fieldset').fadeOut(400, () => {
        // change icons
        current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
        // progress bar
        this._barProgress(progress_line, 'left');
        // show previous step
        $(this).prev().fadeIn();
        // scroll window to beginning of the form
        this._scrollToClass( $('.f1'), 20 );
      });
    });

    /**
    // submit
    $('.f1').on('submit', function(e) {
      // fields validation
      $(this).find('input[type="text"], input[type="password"], textarea').each() => {
        if( $(this).val() == "" ) {
          e.preventDefault();
          $(this).addClass('input-error');
        }
        else {
          $(this).removeClass('input-error');
        }
      });
    });
    */

  },

  _scrollToClass(element_class, removed_height) {
    const scroll_to = $(element_class).offset().top - removed_height;
    if ($(window).scrollTop() != scroll_to) {
      $('html, body').stop().animate({scrollTop: scroll_to}, 0);
    }
  },

  _barProgress(progress_line_object, direction) {
    var number_of_steps = progress_line_object.data('number-of-steps');
    var now_value = progress_line_object.data('now-value');
    var new_value = 0;
    if(direction == 'right') {
      new_value = now_value + ( 100 / number_of_steps );
    }
    else if(direction == 'left') {
      new_value = now_value - ( 100 / number_of_steps );
    }
    progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
  },


  actions: {

  }
});
