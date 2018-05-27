import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import $ from 'jquery';

export default Controller.extend({

  session: service(),

  api: service(),

  queryParams: ['from', 'to'],

  actions: {
    cancel() {
      this.replaceRoute('home.threads.index');
    },

    send() {
      const thread = {
        from: get(this, 'from'),
        to: get(this, 'to'),
        title: get(this, 'title'),
        text: get(this, 'text')
      };

      $('#modal-wait-thread').modal();

      return this.get('api').createThread(thread)
        .then(() => $('#modal-new-thread-ok').modal())
        .catch(() => $('#modal-new-thread-error').modal())
        .finally(() => {
          $('#modal-wait-thread').modal('hide');
        })

    },

    goToHome() {
      this.replaceRoute('home');
    },

    goToThreads() {
      this.replaceRoute('home.threads.index');
    }
  }
});
