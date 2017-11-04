import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('admin');
  this.route('home');
  this.route('register');
  this.route('login');
  this.route('error-page', { path: '*path'});
});

export default Router;
