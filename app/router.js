import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('error-page', { path: '*path'});
  this.route('home', function() {
    this.route('calendar', function() {
      this.route('edit', { path: ':id' });
      this.route('new');
    });
    this.route('clients', function() {
    });
    this.route('diets', function() {
      this.route('diet', { path: ':id' });
      this.route('edit', { path: '/edit/:id' });
      this.route('new');
    });
    this.route('messages', function() {
      this.route('message', { path: ':id' });
      this.route('new');
    });
    this.route('profile', { path: '/profile/:id'}, function() {
      this.route('edit', { path: '/edit/:id' });
    });
  });
  this.route('login');
  this.route('register');
});

export default Router;
