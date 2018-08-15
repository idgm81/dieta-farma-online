import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { get } from '@ember/object';
import { computed }  from '@ember/object';

export default Controller.extend({

  i18n: service(),

  session: service(),

  api: service(),

  userId: computed.reads('session.data.authenticated.id'),

  premiumController: controller('home.premium-services.index'),

  type: computed.reads('premiumController.data.type'),

  level: computed.reads('premiumController.data.profile.level'),

  setup() {
    this.set('isMandatory', get(this, 'type') === 'O');
    this.set('questionsVersion', get(this, 'level') < 1 ? 1 : 2);
  },

  actions: {

    cancel() {
      this.replaceRoute('home')
    },

    next(answers) {
      const userId = get(this, 'userId');
      let request = null;

      $('#modal-wait-questions').modal();

      if (this.get('questionsVersion') === 1) {
        request = this.get('api').editUser(userId, {
          'profile.level': 1,
          'profile.questionnaire' : answers
          }
        );
      } else {
        request = this.get('api').saveAdvanceQuestions(userId, answers)
      }

      return request.then(() => {
        $('#modal-wait-questions').modal('hide');
        this.transitionToRoute('home.premium-services.checkout');
      })
      .catch(() => $('#modal-questions-error').modal())
      .finally(() => $('#modal-wait-questions').modal('hide'));
    }
  }
});