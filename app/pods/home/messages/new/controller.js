import Ember from 'ember';
import moment from 'moment';

const { Controller, inject: { service }, get, $ } = Ember;

export default Controller.extend({

  session: service(),

  api: service(),

  queryParams: ['from', 'to'],

  userId: null,

  actions: {
    cancel() {
      this.replaceRoute('home.messages');
    },

    send() {
      const message = {
        from: get(this, 'from'),
        to: get(this, 'to'),
        title: get(this, 'title'),
        date: moment().format(),
        text: get(this, 'text')
      };

      $('#modal-wait-message').modal();

      return this.get('api').createMessage(message)
        .then(() => $('#modal-new-message-ok').modal())
        .catch(() => $('#modal-new-message-error').modal())
        .finally(() => {
          $('#modal-wait-message').modal('hide');
        })

    },

    goToHome() {
      this.replaceRoute('home');
    },

    goToMessages() {
      this.replaceRoute('home.messages.index');
    }
  }
});
