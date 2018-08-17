import Controller from '@ember/controller';
import moment from 'moment';
import { set }  from '@ember/object';

export default Controller.extend({

  actions: {
    onSelected(day) {
      set(this, 'day', day);
      set(this, 'dayAppointments', this.get('model.appointments').filter((item) =>
        moment(item.date).isSame(day, 'day')
      ));
    },
    showUser(id) {
      this.transitionToRoute('home.clients.client', id);
    }
  }
});