// app/services/api.js
import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from '../config/environment';

export default AjaxService.extend({

  session: Ember.inject.service(),

  host: ENV.APP.API_HOST,

  namespace: 'api',

  contentType: 'application/json; charset=utf-8',

  userId: Ember.computed('session.data', function() {
    return this.get('session.data.authenticated.id');
  }),

  options() {
    const result = this._super(...arguments);

    if (result.contentType === this.get('contentType')) {
      result.data = JSON.stringify(result.data)
    }
    return result
  },

  headers: Ember.computed('session.data.authenticated.token', {
    get() {
      let headers = {};
      const authToken = this.get('session.data.authenticated.token');
      if (authToken) {
        headers['Authorization'] = `JWT ${authToken}`;
      }
      return headers;
    }
  }),

  getUser(id) {
    return this.request(`/users/${id}`, {
      method: 'GET'
    });
  },

  getUsers(role) {
    return this.request(`/users?role=${role}`, {
      method: 'GET'
    });
  },

  createUser(data) {
    return this.request(`/users`, {
      method: 'POST',
      data
    });
  },

  editUser(data) {
    return this.request(`/users/${this.get('userId')}`, {
      method: 'PUT',
      data
    });
  },

  getDiets() {
    return this.request(`/diets/${this.get('userId')}`, {
      method: 'GET'
    });
  },

  createDiet(data) {
    return this.request(`/diets`, {
      method: 'POST',
      data
    });
  },

  editDiet(id, data) {
    return this.request(`/diets/${id}/?id=${this.get('userId')}`, {
      method: 'PUT',
      data
    });
  },

  deleteDiet(id) {
    return this.request(`/diets/${id}`, {
      method: 'DELETE'
    });
  },

  getAppointments() {
    return this.request(`/appointments/${this.get('userId')}`, {
      method: 'GET'
    });
  },

  createAppointment(data) {
    return this.request(`/appointments/${this.get('userId')}`, {
      method: 'POST',
      data
    });
  },

  editAppointment(id, data) {
    return this.request(`/appointments/${id}/?id=${this.get('userId')}`, {
      method: 'PUT',
      data
    });
  },

  getMessages() {
    return this.request(`/messages/${this.get('userId')}`, {
      method: 'GET'
    });
  },

  createMessage(data) {
    return this.request(`/messages/${this.get('userId')}`, {
      method: 'POST',
      data
    });
  },

});
