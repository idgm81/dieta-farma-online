import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  classNames: ['premium-services-steps'],

  currentStep: 1,

  steps: [
    {
      name: 'Tipo de dieta',
      icon: 'plus'
    }, {
      name: 'Fecha',
      icon: 'calendar-alt'
    }, {
      name: 'Preguntas',
      icon: 'file-medical'
    }, {
      name: 'Pago',
      icon: 'credit-card'
    }
  ],

  stepsNumber: computed('steps.[]', function () {
    return this.get('steps').length;
  }),

  value: computed('currentStep', function () {
    return this.get('currentStep') * (100 / this.get('stepsNumber'));
  })
});
