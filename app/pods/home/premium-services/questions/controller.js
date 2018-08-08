import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { computed }  from '@ember/object';

export default Controller.extend({

  i18n: service(),

  session: service(),

  api: service(),

  userId: computed.reads('session.data.authenticated.id'),

  queryParams: ['type'],

  questionsVersion: 1,

  dietTypes: ['Muy variada', 'Menos variada'],

  objectives: ['Pérdida de peso', 'Ganancia de peso', 'Mantenimiento', 'Mejorar composición corporal', 'Otro'],

  reasons: ['Salud', 'Estética', 'Competición', 'Otro'],

  foodFrecuencies: ['Diario', 'Semanal', 'Mensual', 'Nunca'],

  otherSupevisors: ['Médico', 'Nutricionista', 'Farmacéutico', 'Entrenador', 'Otro'],

  employmentTypes: ['Sendentario', 'Activo'],

  transportTypes: ['A pie', 'Coche o moto', 'Bicicleta', 'Transporte público'],

  exerciseFrecuencies: ['De 1 a 3 horas', 'De 3 a 6 horas', 'De 9 a 12 horas', 'Más de 12 horas'],

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
  
  data: {},

  actions: {

    cancel() {
      this.replaceRoute('home')
    },

    next() {
      const userId = get(this, 'userId');
      const data = get(this, 'data');
      const queryParams = get(this, 'type');

      $('#modal-wait-questions').modal();

      if (this.get('questionsVersion') === 1) {
        const userInfo = {
          profile: {
            level: 1,
            data
          }
        };

        return this.get('api').editUser(userId, userInfo)
          .then(() => {
            $('#modal-wait-questions').modal('hide');
            this.transitionToRoute('home.premium-services.checkout', { queryParams });
          })
          .catch(() => $('#modal-questions-error').modal())
          .finally(() => $('#modal-wait-questions').modal('hide'));
      }
      
      return this.get('api').saveAdvanceQuestions(userId, data)
        .then(() => {
          $('#modal-wait-questions').modal('hide');
          this.transitionToRoute('home.premium-services.checkout', { queryParams });
        })
        .catch(() => $('#modal-questions-error').modal())
        .finally(() => $('#modal-wait-questions').modal('hide'));
    }
  }
});