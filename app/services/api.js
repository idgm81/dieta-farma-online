// app/services/api.js
import { inject as service } from '@ember/service';

import { computed } from '@ember/object';
import RSVP from 'rsvp';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from '../config/environment';

export default AjaxService.extend({

  session: service(),

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

  headers: computed('session.data.authenticated.token', {
    get() {
      let headers = {};
      const authToken = this.get('session.data.authenticated.token');
      if (authToken) {
        headers['Authorization'] = `JWT ${authToken}`;
      }
      return headers;
    }
  }),

  checkEmail(email) {
    return this.request(`/auth/checkEmail?email=${email}`, {
      method: 'GET'
    });
  },

  modifyPassword(data) {
    return this.request(`/auth/modifyPassword`, {
      method: 'POST',
      data
    });
  },

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

  editUser(userId, key, value) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      data: {
        [key]: value
      }
    });
  },

  deleteUser(userId) {
    return this.request(`/users/${userId}`, {
      method: 'DELETE'
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

  deleteDiet(dietId, userId) {
    return this.request(`/diets/${dietId}?userId=${userId}`, {
      method: 'DELETE'
    });
  },

  getAppointments(userId) {
    return this.request(`/appointments?userId=${userId}`, {
      method: 'GET'
    });
  },

  getAvailableDates(userId) {
    return this.request(`/appointments/calendar?userId=${userId}`, {
      method: 'GET'
    });
  },

  createAppointment(data) {
    return this.request(`/appointments`, {
      method: 'POST',
      data
    });
  },

  deleteAppointment(appointmentId, updateCredits) {
    return this.request(`/appointments/${appointmentId}/?updateCredits=${updateCredits}`, {
      method: 'DELETE'
    });
  },

  editAppointment(appointmentId, data) {
    return this.request(`/appointments/${appointmentId}`, {
      method: 'PUT',
      data
    });
  },

  getThreads(userId) {
    return this.request(`/threads?userId=${userId}`, {
      method: 'GET'
    });
  },

  createThread(data) {
    return this.request(`/threads`, {
      method: 'POST',
      data
    });
  },

  createMessage(threadId, data) {
    return this.request(`/threads/${threadId}`, {
      method: 'PUT',
      data
    });
  },

  createPurchase(data) {
    return this.request(`/purchases`, {
      method: 'POST',
      data
    });
  },

  createFreePurchase(data) {
    return this.request(`/purchases?free=true`, {
      method: 'POST',
      data
    });
  },

  getS3Url(userId, category, fileName, fileType) {
    return this.request(`/signed-request`, {
      method: 'POST',
      data: {
        userId,
        file: fileName,
        category,
        type: fileType
      }
    });
  },

  uploadToS3(file, signedRequest) {
    return new RSVP.Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', signedRequest)
      xhr.setRequestHeader('x-amz-acl', 'public-read')
      xhr.onload = () => { resolve() }
      xhr.send(file)
    })
  }
});