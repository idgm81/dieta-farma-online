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
    },
    delete(id) {
      $('#modal-wait-appointment').modal();

      return this.get('api').deleteAppointment(id)
        .then(() => $('#modal-delete-appointment-ok').modal())
        .catch(() => $('#modal-delete-appointment-error').modal())
        .finally(() => {
          $('#modal-wait-message').modal('hide');
        })
    }
  }
});
