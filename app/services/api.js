// app/services/api.js
import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from '../config/environment';

export default AjaxService.extend({

  session: Ember.inject.service(),

  host: ENV.APP.API_HOST,

  namespace: 'api',

  contentType: 'application/json; charset=utf-8',

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
    return this.request(`/users`, {
      method: 'PUT',
      data
    });
  },

  getDiets(userId) {
    return this.request(`/diets?userId=${userId}`, {
      method: 'GET'
    });
  },

  createDiet(data) {
    return this.request(`/diets`, {
      method: 'POST',
      data
    });
  },

  editDiet(dietId, data) {
    return this.request(`/diets/${dietId}`, {
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
    return this.request(`/appointments?userId=${userId}`, {
      method: 'GET'
    });
  },

  createAppointment(data) {
    return this.request(`/appointments`, {
      method: 'POST',
      data
    });
  },

  editAppointment(appointmentId, data) {
    return this.request(`/appointments/${appointmentId}`, {
      method: 'PUT',
      data
    });
  },

  getMessages(userId) {
    return this.request(`/messages?userId=${userId}`, {
      method: 'GET'
    });
  },

  createMessage(data) {
    return this.request(`/messages`, {
      method: 'POST',
      data
    });
  },

  getS3Url(category, fileName, fileType) {
    return this.request(`/signed-request`, {
      method: 'POST',
      data: {
        file: fileName,
        category,
        type: fileType
      }
    });
  },

  uploadToS3(file, signedRequest) {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', signedRequest)
      xhr.setRequestHeader('x-amz-acl', 'public-read')
      xhr.onload = () => { resolve() }
      xhr.send(file)
    })
  }
});