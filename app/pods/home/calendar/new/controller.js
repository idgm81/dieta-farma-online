import Ember from 'ember';
import moment from 'moment';

const { inject: { service }, get } = Ember;

export default Ember.Controller.extend({

  session: service(),

  api: service(),

  actions: {

    cancel() {
      this.replaceRoute('home')
    },

    onSelectDay(day) {
      const index = this.get('dayOptions').indexOf(day);
      this.set('hourOptions', this.get(`calendar.${index}.hours`));
      this.set('bookDay', day);
    },

    save() {
      const data = {
        customer: get(this, 'session.data.authenticated.id'),
        type: this.get('bookType') === 'Presencial' ? 'P' : 'S',
        date: moment(`${this.get('bookDay')} ${this.get('bookHour')}`, 'YYYY-MM-DD HH:mm').format()
      };

      $('#modal-wait-appointment').modal();

      return this.get('api').createAppointment(data)
        .then(() => $('#modal-new-appointment-ok').modal())
        .catch(() => $('#modal-new-appointment-error').modal())
        .finally(() => {
          $('#modal-wait-appointment').modal('hide');
        })
    },

    goToHome() {
      this.replaceRoute('home.index');
    }
  }
});