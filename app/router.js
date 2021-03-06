import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
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
      this.route('request');
    });
    this.route('threads', function() {
      this.route('new');
      this.route('thread', { path: ':id' });
    });
    this.route('profile', { path: '/profile/:id'});
  });
  this.route('login');
  this.route('payment', function() {
    this.route('success');
    this.route('error');
  });
  this.route('premium');
  this.route('register');
  this.route('reset-password');
});

export default Router;
