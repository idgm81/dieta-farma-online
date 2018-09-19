import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  classNames: ['premium-services-steps'],

  currentStep: 1,
  
  type: 'O',

  steps: computed('type', function() {
    const stepsArray = [
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
    }];

    if (this.get('type') === 'O') {
      stepsArray.splice(1,1);
    }

    return stepsArray;
  }),

  stepsNumber: computed('steps.[]', function () {
    return this.get('steps').length;
  }),

  value: computed('currentStep', 'stepsNumber', function () {
    return this.get('currentStep') * (100 / this.get('stepsNumber'));
  }),

  didInsertElement() {
    this._super(...arguments);
    this.$('.premium-services-step').css('width', `${(100 / this.get('stepsNumber'))}%`);
  }
});
