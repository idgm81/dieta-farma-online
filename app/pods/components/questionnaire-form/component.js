import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import { get, setProperties } from '@ember/object';
import { reads } from '@ember/object/computed';
import { isPresent }  from '@ember/utils';
import $ from 'jquery';

export default Component.extend({

  showLargeQuestionnaire: true,

  dietTypes: ['Muy variada', 'Menos variada'],

  objectives: ['Pérdida de peso', 'Ganancia de peso', 'Mantenimiento', 'Mejorar composición corporal', 'Otro'],

  reasons: ['Salud', 'Estética', 'Competición', 'Otro'],

  foodFrecuencies: ['Diario', 'Semanal', 'Mensual', 'Nunca'],

  otherSupevisors: ['Médico', 'Nutricionista', 'Farmacéutico', 'Entrenador', 'Otro'],

  employmentTypes: ['Sendentario', 'Activo'],

  transportTypes: ['A pie', 'Coche o moto', 'Bicicleta', 'Transporte público'],

  exerciseFrecuencies: ['De 1 a 3 horas', 'De 3 a 6 horas', 'De 9 a 12 horas', 'Más de 12 horas'],

  followOptions: [
    '0 - Nada',
    '1 - Muy poco',
    '2 - Poco',
    '3 - A medias',
    '4 - Bastante',
    '5 - Completamente'
  ],

  levelOptions: [
    '0 - Ninguno',
    '1 - Muy poco',
    '2 - Poco',
    '3 - Medio',
    '4 - Elevado',
    '5 - Muy elevado'
  ],

  answers: {},

  mandatory: reads('showLargeQuestionnaire'),

  hasError: false,

  didInsertElement() {
    this._super(...arguments);

    if (get(this, 'showLargeQuestionnaire')) {
      setProperties(this.get('answers'), {
        objective: get(this, 'objectives.0'),
        reason: get(this, 'reasons.0'),
        dietType: get(this, 'dietTypes.0'),
        dayFruit: get(this, 'foodFrecuencies.0'),
        dayMilk: get(this, 'foodFrecuencies.0'),
        dayCereals: get(this, 'foodFrecuencies.0'),
        dayProteins: get(this, 'foodFrecuencies.0'),
        supervisor: get(this, 'otherSupevisors.0'),
        employmentType: get(this, 'employmentTypes.0'),
        transportType: get(this, 'transportTypes.0'),
        exerciseFrecuency: get(this, 'exerciseFrecuencies.0')
      });  
    } else {
      setProperties(this.get('answers'), {
        q2: get(this, 'followOptions.0'),
        q7: get(this, 'levelOptions.0')
      });
    }

    scheduleOnce('afterRender', this, () => {
      $('form.premium-form').on('invalid.bs.validator', this._showError);
      $('form.premium-form').on('valid.bs.validator', this._hideError);
    });
  },

  _showError(e) {
    $(e.relatedTarget).addClass('field-error');
  },

  _hideError(e) {
    $(e.relatedTarget).removeClass('field-error');
  },

  _checkFormErrors() {
    const $form = $('form.premium-form');

    if (get(this, 'mandatory')) {
      $form.find('.check').attr('data-validate', 'true');
      $form.find('.check').attr('required', 'true');
    }

    $form .validator('validate');
    const errors = $form.find('input, textarea, select').filter((index, element) =>
      $(element).hasClass('field-error')
    );

    this.set('hasError', isPresent(errors));
  },

  actions: {
    cancel() {
      if (this.get('oncancel')) {
        this.sendAction('oncancel');
      }
    },
    save() {
      this._checkFormErrors();
      if (!this.get('hasError')) {
        this.sendAction('onsubmit', this.get('answers'));
      }
    }
  }
});
