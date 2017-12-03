import Ember from 'ember';

export default Ember.Component.extend({

  attributeBindings: ['id'],

  classNames: ['top-content'],

  data: {},

  objectives: ['Pérdida de peso', 'Ganancia de peso', 'Mantenimiento', 'Mejorar composición corporal', 'Otro'],

  reasons: ['Salud', 'Estética', 'Competición', 'Otro'],

  foodFrecuency: ['Diario', 'Semanal', 'Mensual', 'Nunca'],

  otherSupevisors: ['Médico', 'Nutricionista', 'Farmacéutico', 'Entrenador', 'Otro'],

  employmentTypes: ['Sendentario', 'Activo'],

  transportTypes: ['A pie', 'Coche o moto', 'Bicicleta', 'Transporte público'],

  activityFrecuencies: ['De 1 a 3 horas a la semana', 'De 3 a 6 horas a la semana', 'De 9 a 12 horas a la semana', 'Más de 12 horas a la semana'],

  hasError: false,

  step: '1',

  didInsertElement() {
    this._super(...arguments);

    Ember.run.scheduleOnce('afterRender', this, function() {
      this.$('.register fieldset:first').fadeIn('slow');
      this.$('#register-birthday').datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true
      });
      this.$('#register-birthday').val('01-01-2000');
      this.$('form.register').find('fieldset').each((index, element) => {
        if (index > 0) {
          $(element).find('input, textarea, select').each((index, el) => {
            $(el).attr('data-validate', 'false');
          });
        }
      });

      $('input[name="checkInjuries"]').attr('data-validate', 'true');
      $('input[name="checkTerms"]').attr('data-validate', 'true');

      this.$('input#optGenre2').prop('checked', true);
      this.$('input#optFruit2').prop('checked', true);
      this.$('input#optMilk2').prop('checked', true);
      this.$('input#optCereals2').prop('checked', true);
      this.$('input#optProteins2').prop('checked', true);
      this.$('input#optSelfCook2').prop('checked', true);
      this.$('input#optReceiveDietsBefore2').prop('checked', true);
      this.$('input#optIsEmployed2').prop('checked', true);
      this.set('data.objective', this.get('objectives.0'));
      this.set('data.reason', this.get('reasons.0'));
      this.set('data.employmentType', this.get('employmentTypes.0'));
      this.set('data.transportType', this.get('transportTypes.0'));
      this.set('data.activityFrecuency', this.get('activityFrecuencies.0'));

      this.$('input#optTrainingInfo2').prop('checked', true);
      this.$('input#optSupplementInfo2').prop('checked', true);

      Ember.setProperties(this.get('data'), {
        genre: 'female',
        dayFruit: '0',
        dayMilk: '0',
        dayCereals: '0',
        dayProteins: '0',
        selfCook: '0',
        receiveDietsBefore: '0',
        isEmployed: '0',
        receiveTrainingInfo: '0',
        receiveSupplementInfo: '0',
        role: 'client',
        assignedNutritionist: '0'
      });

      this.$('form.register').validator();
      this.$('form.register').on('invalid.bs.validator', this._showError);
      this.$('form.register').on('valid.bs.validator', this._hideError);
      this.$('#end-register-modal-success').modal({ backdrop: 'static', keyboard: false, show: false});
      this.$('#end-register-modal-error').modal({ backdrop: 'static', keyboard: false, show: false});
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
    const errors = this.$('form.register').find('input, textarea, select').filter((index, element) =>
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

        if (Number(step) < 5) {
          this.incrementProperty('step');
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
    },

    register() {
      if (Number(this.get('step')) === 5) {
        this.sendAction('onsubmit', this.get('data'));
      }
    },

    success() {
      this.sendAction('onsuccess');
    }
  }
});
