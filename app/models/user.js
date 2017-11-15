// models/user.js
import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  password: DS.attr('string'),
  name: DS.attr('string'),
  surname: DS.attr('string'),
  genre: DS.attr('string'),
  birthday: DS.attr('date'),
  role: DS.attr('string'),
  phone: DS.attr('string'),
  height: DS.attr('string'),
  weight: DS.attr('string'),
  shapes: DS.attr('string'),
  clinicHistory: DS.attr('string'),
  foodDiseases: DS.attr('string'),
  foodForbidden: DS.attr('string'),
  usualDiet: DS.attr('string'),
  dayFruit: DS.attr('boolean'),
  dayMilk: DS.attr('boolean'),
  dayCereals: DS.attr('boolean'),
  dayProteins: DS.attr('boolean'),
  selfCook: DS.attr('boolean'),
  receiveDietsBefore: DS.attr('boolean'),
  isEmployed: DS.attr('boolean'),
  employmentType: DS.attr('string'),
  transportType: DS.attr('string'),
  activityFrecuency: DS.attr('string'),
  injuries: DS.attr('string'),
  receiveTrainingInfo: DS.attr('boolean'),
  receiveSupplementInfo: DS.attr('boolean'),
  assignedNutritionist: DS.attr('string'),
  nextAppointment: DS.attr('date'),
  resetPasswordToken: DS.attr('string'),
  resetPasswordExpires: DS.attr('date'),
  isClient: Ember.computed.equal('role', 'client'),
  isNutritionist: Ember.computed.equal('role', 'nutritionist')
});