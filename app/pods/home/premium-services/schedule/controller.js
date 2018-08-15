import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed }  from '@ember/object';
import { inject as controller } from '@ember/controller';
import moment from 'moment';

export default Controller.extend({

  i18n: service(),

  session: service(),

  api: service(),

  premiumController: controller('home.premium-services.index'),

  dietType: computed(function() {
    const type = this.get('premiumController.data.type');

    return this.get('i18n').t(`label.meet.${type === 'P' ? 'face' : 'video'}`);
  }),

  actions: {

    cancel() {
      this.replaceRoute('home')
    },

    onSelectDay(day) {
      const index = this.get('dayOptions').indexOf(day);
      this.set('hourOptions', this.get(`calendar.${index}.hours`));
      this.set('bookHour', this.get('hourOptions.0'));
      this.set('bookDay', day);
    },

    next() {
      this.set('premiumController.data.date', moment.parseZone(`${this.get('bookDay')} ${this.get('bookHour')}`).toISOString());
      
      this.transitionToRoute('home.premium-services.questions');
    }
  }
});