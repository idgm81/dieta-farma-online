import Ember from 'ember';
import moment from 'moment';

const { Controller, inject: { service }, get, set, $ } = Ember;

export default Controller.extend({

  session: service(),

  api: service(),

  queryParams: ['userId'],

  userId: null,

  file: null,

  nutritionistId: Ember.computed('session.data', function() {
    return this.get('session.data.authenticated.id');
  }),

  actions: {

    cancel() {
      this.replaceRoute('home.clients');
    },

    save() {
      const fileName = get(this, 'file.name');
      const fileType = get(this, 'file.type');
      const category = 'diets';

      $('#modal-wait-diet').modal();

      return this.get('api').getS3Url(category, fileName, fileType).then((response) => {
        this.get('api').uploadToS3(get(this, 'file'), response.signedRequest).then(() => {
          set(this, 'url', response.url);

          const diet = {
            client: get(this, 'userId'),
            nutritionist: get(this, 'nutritionistId'),
            title: get(this, 'title'),
            fromDate: moment(get(this, 'fromDate'), 'DD/MM/YYYY').format(),
            toDate: moment(get(this, 'toDate'), 'DD/MM/YYYY').format(),
            url: get(this, 'url')
          };


          return this.get('api').createDiet(diet)
            .then(() => $('#modal-new-diet-ok').modal())
            .catch(() => $('#modal-new-diet-error').modal())
            .finally(() => {
              $('#modal-wait-diet').modal('hide');
            })
        }).catch(() => {
          $('#modal-new-diet-error').modal();
        }).finally(() => {
          $('#modal-wait-diet').modal('hide');
        });
      }).catch(() => {
        $('#modal-new-diet-error').modal();
      }).finally(() => {
        $('#modal-wait-diet').modal('hide');
      });
    },

    goToHome() {
      this.replaceRoute('home.clients');
    }
  }
});
