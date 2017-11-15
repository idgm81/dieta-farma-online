import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('error-page', { path: '*path'});
  this.route('home', function() {
    this.route('appointments');
    this.route('clients', function() {
      this.route('client', { path: '/clients/:id' });
    });
    this.route('diets', function() {
      this.route('diet', { path: 'diets/:id' });
    });
    this.route('messages', function() {
      this.route('message', { path: 'messages/:id' });
    });
    this.route('profile');
  });
  this.route('login');
  this.route('register');
});

export default Router;
