import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set, get, computed } from '@ember/object';
import { reads }  from '@ember/object/computed';
import $ from 'jquery';
import moment from 'moment';

export default Controller.extend({

  session: service(),

  api: service(),

  queryParams: ['userId', 'name'],

  userId: null,

  name: null,

  nutritionistId: reads('session.data.authenticated.id'),

  clientLinkLabel: computed('name', function() {
    return `Perfil de ${get(this, 'name')}`
  }),

  dietOptions: ['Dieta', 'Pauta dietética'],

  option: 'Dieta',

  actions: {

    cancel() {
      this.replaceRoute('home.clients');
    },

    fileSelected() {
      $('.form-group .file-uploader').parent().removeClass('has-error has-danger');
      $('.file-uploader + small').empty();
    },

    save() {
      $('#form-diet').validator('validate');

      const hasErrors = $('#form-diet').find('div').filter((index, element) =>
        $(element).hasClass('has-error')
      );
      const file = get(this, 'file');

      if (hasErrors.length || !file) {
        $('.form-group .file-uploader').parent().addClass('has-error has-danger');
        $('.file-uploader + small').html('<ul class="list-unstyled"><li>Debes adjuntar un archivo</li></ul>');
        return;
      }

      const fileName = get(file, 'name');
      const fileType = get(file, 'type');
      const category = 'diets';

      $('#modal-wait-diet').modal();

      return this.get('api').getS3Url(this.get('userId'), category, fileName, fileType).then((response) => {
        this.get('api').uploadToS3(get(this, 'file'), response.signedRequest).then(() => {
          set(this, 'url', response.url);

          const diet = {
            customer: get(this, 'userId'),
            nutritionist: get(this, 'nutritionistId'),
            title: get(this, 'title'),
            type: get(this, 'option') === 'Dieta' ? 'D' : 'P',
            fromDate: get(this, 'option') === 'Dieta'
              ? moment(get(this, 'fromDate'), 'DD/MM/YYYY').format()
              : moment().format(),
            toDate: get(this, 'option') === 'Dieta'
              ? moment(get(this, 'toDate'), 'DD/MM/YYYY').format()
              : moment().format(),
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