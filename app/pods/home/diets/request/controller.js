import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set, get, computed } from '@ember/object';
import $ from 'jquery';

export default Controller.extend({

  session: service(),

  api: service(),

  queryParams: ['userId'],

  userId: null,

  data: {},

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