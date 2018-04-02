import Controller from '@ember/controller';
import moment from 'moment';

export default Controller.extend({

  actions: {
    onSelected(day) {
      this.set('dayAppointments', this.get('model.items').filter((item) =>
        moment(item.date).isSame(day, 'day')
      ));
    }
  }
});