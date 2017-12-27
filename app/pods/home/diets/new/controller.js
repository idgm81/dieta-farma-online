import Ember from 'ember';
import moment from 'moment';

const { Controller, inject: { service }, get, set } = Ember;

export default Controller.extend({

  session: service(),

  flashMessages: service(),

  api: service(),

  queryParams: ['userId'],

  userId: null,

  file: null,

  nutritionistId: Ember.computed('session.data', function() {
    return this.get('session.data.authenticated.id');
  }),

  actions: {
    save() {
      const fileName = `${get(this, 'userId')}_${get(this, 'file.name')}`
      const fileType = get(this, 'file.type');
      const category = 'diets';

      return this.get('api').getS3Url(category, fileName, fileType).then((signedData) => {
        this.get('api').uploadToS3(get(this, 'file'), signedData.signedRequest).then(() => {
          set(this, 'url', signedData.url);

          const diet = {
            client: get(this, 'userId'),
            nutritionist: get(this, 'nutritionistId'),
            title: get(this, 'title'),
            fromDate: moment(get(this, 'fromDate'), 'DD/MM/YYYY').format(),
            toDate: moment(get(this, 'toDate'), 'DD/MM/YYYY').format(),
            url: get(this, 'url')
          };

          return this.get('api').createDiet(diet)
            .then(() => {
              this.get('flashMessages').success('Dieta creada correctamente!');
              this.replaceRoute('home.clients');
            })
            .catch(() => this.get('flashMessages').error('Error al crear la diera!'));
        });
      });
    }
  }
});
