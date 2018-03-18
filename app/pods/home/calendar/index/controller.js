import Ember from 'ember';
import moment from 'moment';

const { Controller, inject: { service } } = Ember;

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
