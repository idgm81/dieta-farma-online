import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, RSVP, inject: { service }, get, isEmpty } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  model(params) {
    const parentController = this.modelFor('home.diets.index');

    if (isEmpty(parentController)) {
      return this.get('api').getDiets().then(({ diets }) => diets.findBy('_id', params.id));
    }

    return get(parentController, 'diets').findBy('_id', params.id);
  },

  actions: {
    save() {
       this.get('api').editDiet({
         title: this.get('title'),
         fromDate: this.get('fromDate'),
         toDate: this.get('toDate'),
         detail: this.get('detail')
       }).then((response) => this.transitionTo('home.clients.index'))
    },
    cancel() {
      this.replaceWith('home.clients.index');
    }
  }
});
