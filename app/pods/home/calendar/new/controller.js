import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import moment from 'moment';

export default Controller.extend({

  session: service(),

  api: service(),

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
        type: this.get('bookType') === 'Presencial' ? 'P' : 'S',
        date: moment(`${this.get('bookDay')} ${this.get('bookHour')}`, 'YYYY-MM-DD HH:mm').toISOString(true)
      };

      $('#modal-wait-new-appointment').modal();

      return this.get('api').createAppointment(data)
        .then(() => $('#modal-new-appointment-ok').modal())
        .catch(() => $('#modal-new-appointment-error').modal())
        .finally(() => {
          $('#modal-wait-new-appointment').modal('hide');
        })
    },

    goToHome() {
      this.replaceRoute('home.index');
    }
  }
});