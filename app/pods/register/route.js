import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      name: '',
      surname: '',
      birthday: '01/01/1970',
      phone: '',
      height: '',
      weight: '',
      shapes: '',
      clinicHistory: '',
      foodDiseases: '',
      foodForbidden: ''
    }
  },

  actions: {
    register() {
      alert('Enhorabuena, ' + this.get('model.name') + '!, ya estás registrado en dietafarma.es!')
      //this.transitionTo('home');
    }
  }
});
