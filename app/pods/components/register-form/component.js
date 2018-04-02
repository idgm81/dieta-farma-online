import Component from "@ember/component";
import { inject as service } from "@ember/controller";
import { run } from "@ember/runloop";
import { setProperties } from "@ember/object";

export default Component.extend({

  api: service(),

  classNames: ['dt-register-page', 'top-content'],

  data: {},

  dietTypes: ['Muy variada', 'Menos variada'],

  objectives: ['Pérdida de peso', 'Ganancia de peso', 'Mantenimiento', 'Mejorar composición corporal', 'Otro'],

  reasons: ['Salud', 'Estética', 'Competición', 'Otro'],

  foodFrecuencies: ['Diario', 'Semanal', 'Mensual', 'Nunca'],

  otherSupevisors: ['Médico', 'Nutricionista', 'Farmacéutico', 'Entrenador', 'Otro'],

  employmentTypes: ['Sendentario', 'Activo'],

  transportTypes: ['A pie', 'Coche o moto', 'Bicicleta', 'Transporte público'],

  exerciseFrecuencies: ['De 1 a 3 horas', 'De 3 a 6 horas', 'De 9 a 12 horas', 'Más de 12 horas'],

  hasError: false,

  step: '1',

  didInsertElement() {
    this._super(...arguments);

    run.scheduleOnce('afterRender', this, function() {
      this.$('.register fieldset:first').fadeIn('slow');
      this.$('form.register').find('fieldset').each((index, element) => {
        if (index > 0) {
          $(element).find('input, textarea, select').each((index, el) => {
            $(el).attr('data-validate', 'false');
          });
        }
      });

      $('input[name="checkTerms"]').attr('data-validate', 'true');

      setProperties(this.get('data'), {
        birthday: { day: 1, month: 1, year: 1970 },
        genre: 'female',
        measures: {
          height: '',
          weight: '',
          imc: '',
          fat: '',
          water: '',
          mass: '',
          biotype: '',
          boneMass: '',
          metabolicExpense: '',
          metabolicAge: '',
          visceralFat: '',
          creases: {
            bicipital: '',
            tricipital: '',
            subescapular: '',
            suprailiaco: ''
          },
          segments: {
            arm: {
              left: {
                fatPercentage: '',
                mass: ''
              },
              right: {
                fatPercentage: '',
                mass: ''
              }
            },
            leg: {
              left: {
                fatPercentage: '',
                mass: ''
              },
              right: {
                fatPercentage: '',
                mass: ''
              }
            },
            trunk: {
              fatPercentage: '',
              mass: ''
            }
          },
          shapes: {
            wrist: '',
            waist: '',
            hip: '',
            arm: '',
            leg: '',
            chest: ''
          }
        },
        objective: this.get('objectives.4'),
        reason: this.get('reasons.3'),
        foodDiseases: '',
        foodForbidden: '',
        foodFavourite: '',
        dietType: this.get('dietTypes.0'),
        dayFruit: this.get('foodFrecuencies.3'),
        dayMilk: this.get('foodFrecuencies.3'),
        dayCereals: this.get('foodFrecuencies.3'),
        dayProteins: this.get('foodFrecuencies.3'),
        selfCook: false,
        receiveDietsBefore: false,
        supervisor: this.get('otherSupevisors.4'),
        supervisorDetail: '',
        isEmployed: false,
        employmentType: this.get('employmentTypes.0'),
        transportType: this.get('transportTypes.0'),
        doExercise: false,
        sportDetail: '',
        exerciseFrecuency: this.get('exerciseFrecuencies.0'),
        increaseActivity: false,
        injuries: '',
        receiveTrainingInfo: false,
        receiveSupplementInfo: false,
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
