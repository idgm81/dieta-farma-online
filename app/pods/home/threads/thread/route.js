import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import { get } from '@ember/object';
import { run }  from '@ember/runloop';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  session: service(),

  userId: reads('session.data.authenticated.id'),

  model(params, transition) {
    return this.get('api').getThreads(this.get('userId'))
      .then(({threads}) => threads && threads.findBy('_id', params.id))
      .catch(() => transition.abort());
  },

  setupController(controller, model) {
    this._super(...arguments);

    const messages = get(model, 'messages') || [];

    controller.set('nutritionistId', get(model, 'nutritionist_data.0._id'));
    controller.set('nutritionistName', get(model, 'nutritionist_data.0.profile.name'));
    controller.set('nutritionistAvatar', get(model, 'nutritionist_data.0.profile.avatar'));
    controller.set('customerId', get(model, 'customer_data.0._id'));
    controller.set('customerName', get(model, 'customer_data.0.profile.name'));
    controller.set('customerAvatar', get(model, 'customer_data.0.profile.avatar'));
    controller.set('userId', get(this, 'userId'));
    controller.set('messages', messages);
    controller.set('messageText', null);

    run.scheduleOnce('afterRender', this, () => {
      $('ul.chat').scrollTop(messages.length * 60)
    });
  },

  actions: {
    send(id, text) {
      if (text) {
        const message = {
          author: this.get('userId'),
          text
        };

        return this.get('api').createMessage(id, message)
          .then(() => this.refresh())
      }

      return;
    }
  }
});