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

  getUser(userId) {
    return this.request(`/users/${userId}`, {
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

  editUser(userId, data) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      data
    });
  },

  getDiets(userId) {
    return this.request(`/diets/${userId}`, {
      method: 'GET'
    });
  },

  createDiet(data) {
    return this.request(`/diets`, {
      method: 'POST',
      data
    });
  },

  editDiet(dietId, userId, data) {
    return this.request(`/diets/${dietId}/?id=${userId}`, {
      method: 'PUT',
      data
    });
  },

  deleteDiet(dietId) {
    return this.request(`/diets/${dietId}`, {
      method: 'DELETE'
    });
  },

  getAppointments(userId) {
    return this.request(`/appointments/${userId}`, {
      method: 'GET'
    });
  },

  createAppointment(userId, data) {
    return this.request(`/appointments/${userId}`, {
      method: 'POST',
      data
    });
  },

  editAppointment(appointmentId, userId, data) {
    return this.request(`/appointments/${appointmentId}/?id=${userId}`, {
      method: 'PUT',
      data
    });
  },

  getMessages(userId) {
    return this.request(`/messages/${userId}`, {
      method: 'GET'
    });
  },

  createMessage(userId, data) {
    return this.request(`/messages/${userId}`, {
      method: 'POST',
      data
    });
  },

});
