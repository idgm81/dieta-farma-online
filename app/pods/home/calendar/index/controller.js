import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Controller.extend({

  api: service(),

  appointments: [],

  actions: {
    onSelected(day) {
      this.set('dayAppointments', this.get('appointments').filter((cita) =>
        moment(cita.date).format('DD-MM-YYYY') === day.format('DD-MM-YYYY')
      ));
    }
  }
});