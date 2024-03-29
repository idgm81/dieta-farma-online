import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Route.extend({

  i18n: service(),

  api: service(),

  _normalize(data) {
    return {
      email: data.email,
      password: data.password,
      profile: {
        name: data.name,
        surname: data.surname,
        genre: data.genre,
        phone: data.phone,
        birthday: moment(`${data.birthday.year}-${data.birthday.month}-${data.birthday.day}`, 'YYYY-MM-DD').startOf('day').toISOString(),
        measures: {
          height: data.measures.height,
          weight: data.measures.weight
        }
      }
    };
  },

  actions: {
    register(data) {
      $('div.loading-container').show();
      this.get('api').createUser(this._normalize(data))
        .then(() => {
          $('#modal-registration-ok').modal();
        })
        .catch(() => {
          $('#modal-registration-error').modal();
        })
        .finally(() => $('div.loading-container').hide());
    },

    goToLogin() {
      this.transitionTo('login');
    }
  }
});