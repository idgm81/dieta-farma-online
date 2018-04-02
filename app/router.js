import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('change-password');
  this.route('error-page', { path: '*path'});
  this.route('home', function() {
    this.route('calendar', function() {
      this.route('edit', { path: '/edit/:id' });
      this.route('new');
    });
    this.route('clients', function() {
      this.route('client', { path: ':id' });
    });
    this.route('diets', function() {
      this.route('edit', { path: '/edit/:id' });
      this.route('new');
    });
    this.route('messages', function() {
      this.route('detail', { path: ':id' });
      this.route('new');
    });
    this.route('profile', { path: '/profile/:id'}, function() {
      this.route('edit');
    });
  });
  this.route('login');
  this.route('register');
  this.route('reset-password');
});

export default Router;
