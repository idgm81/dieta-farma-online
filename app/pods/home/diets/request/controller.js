import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({

  session: service(),

  api: service(),

  queryParams: ['userId'],

  userId: null,

  data: {},

  follows: [
    '0 - Nada',
    '1 - Muy poco',
    '2 - Poco',
    '3 - A medias',
    '4 - Bastante',
    '5 - Completamente'
  ],

  levels: [
    '0 - Ninguno',
    '1 - Muy poco',
    '2 - Poco',
    '3 - Medio',
    '4 - Elevado',
    '5 - Muy elevado'
  ],

  actions: {

    cancel() {
      this.replaceRoute('home.index');
    },

    save() {
      $('#modal-wait-request-diet').modal();

      const data = this.get('data');

      data.customer = this.get('userId');

      return this.get('api').requestDiet(data)
        .then(() => $('#modal-request-diet-ok').modal())
        .catch(() => $('#modal-request-diet-error').modal())
        .finally(() => {
          $('#modal-wait-request-diet').modal('hide');
        });
    },

    goToHome() {
      this.replaceRoute('home.index');
    }
  }
});