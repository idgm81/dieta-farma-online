import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import { get } from '@ember/object';
import $ from 'jquery';

export default Component.extend({

  version: 1,

  dietTypes: ['Muy variada', 'Menos variada'],

  objectives: ['Pérdida de peso', 'Ganancia de peso', 'Mantenimiento', 'Mejorar composición corporal', 'Otro'],

  reasons: ['Salud', 'Estética', 'Competición', 'Otro'],

  foodFrecuencies: ['Diario', 'Semanal', 'Mensual', 'Nunca'],

  otherSupevisors: ['Médico', 'Nutricionista', 'Farmacéutico', 'Entrenador', 'Otro'],

  employmentTypes: ['Sendentario', 'Activo'],

  transportTypes: ['A pie', 'Coche o moto', 'Bicicleta', 'Transporte público'],

  exerciseFrecuencies: ['De 1 a 3 horas', 'De 3 a 6 horas', 'De 9 a 12 horas', 'Más de 12 horas'],

  follows: [
    '0 - Nada',
    '1 - Muy poco',
    '2 - Poco',
    '3 - A medias',
    '4 - Bastante',
    '5 - Completamente'
  ],

  levels: [
    '0 - Ninguno',
    '1 - Muy poco',
    '2 - Poco',
    '3 - Medio',
    '4 - Elevado',
    '5 - Muy elevado'
  ],

  answers: {},

  mandatory: false,

  hasError: false,

  didInsertElement() {
    this._super(...arguments);

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

    this.set('hasError', errors.length ? true : false);
  },

  actions: {
    save() {
      this._checkFormErrors();
      if (!this.get('hasError')) {
        this.sendAction('onsubmit', this.get('answers'));
      }
    }
  }
});
