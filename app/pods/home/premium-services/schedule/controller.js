import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { computed }  from '@ember/object';
import moment from 'moment';

export default Controller.extend({

  i18n: service(),

  session: service(),

  api: service(),

  queryParams: ['type'],

  dietType: computed('type', function() {
    return this.get('i18n').t(`label.meet.${this.get('type') === 'P' ? 'face' : 'video'}`);
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

    save() {
      const data = {
        customer: get(this, 'session.data.authenticated.id'),
        type: this.get('type'),
        date: moment.parseZone(`${this.get('bookDay')} ${this.get('bookHour')}`).toISOString()
      };

      $('#modal-wait-new-appointment').modal();

      return this.get('api').createAppointment(data)
        .then(() => {
          $('#modal-wait-new-appointment').modal('hide');
          this.transitionToRoute('home.premium-services.questions');
        })
        .catch(() => $('#modal-new-appointment-error').modal())
        .finally(() => $('#modal-wait-new-appointment').modal('hide'));
    }
  }
});