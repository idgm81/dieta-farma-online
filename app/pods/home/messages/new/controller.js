import Ember from 'ember';
import moment from 'moment';

const { Controller, inject: { service }, get, $ } = Ember;

export default Controller.extend({

  session: service(),

  api: service(),

  queryParams: ['client', 'nutritionist'],

  actions: {
    send() {
      $('div.loading-container').show();

      const message = {
        client: get(this, 'client'),
        nutritionist: get(this, 'nutritionist'),
        title: get(this, 'title'),
        date: moment().format(),
        text: get(this, 'content')
      };

      return this.get('api').createMessage(message)
        .then(() => $('#modal-new-message-ok').modal())
        .catch(() => $('#modal-new-message-error').modal())
        .finally(() => {
          $('div.loading-container').hide();
        })

    },

    goToHome() {
      this.replaceRoute('home.clients');
    }
  }
});
