import Ember from 'ember';
import moment from 'moment';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const { Route, inject: { service } } = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {

  api: service(),

  _normalize(data) {
    return {
      email: data.email,
      password: data.password,
      profile: {
        name: data.name,
        surname: data.surname,
        genre: data.genre,
        phone: data.phone,
        birthday: moment(`${data.birthday.year}-${data.birthday.month}-${data.birthday.day}`, 'YYYY-MM-DD').format(),
        measures: {
          height: data.measures.height,
          weight: data.measures.weight,
          imc: data.measures.imc,
          fat: data.measures.fat,
          water: data.measures.water,
          mass: data.measures.mass,
          biotype: data.measures.biotype,
          boneMass: data.measures.boneMass,
          metabolicExpense: data.measures.metabolicExpense,
          metabolicAge: data.measures.metabolicAge,
          visceralFat: data.measures.visceralFat,
          creases: {
            bicipital: data.measures.creases.bicipital,
            tricipital: data.measures.creases.tricipital,
            subescapular: data.measures.creases.subescapular,
            suprailiaco: data.measures.creases.suprailiaco
          },
          segments: {
            arm: {
              left: {
                fatPercentage: data.measures.segments.arm.left.fatPercentage,
                mass: data.measures.segments.arm.left.mass
              },
              right: {
                fatPercentage: data.measures.segments.arm.right.fatPercentage,
                mass: data.measures.segments.arm.right.mass
              }
            },
            leg: {
              left: {
                fatPercentage: data.measures.segments.leg.left.fatPercentage,
                mass: data.measures.segments.leg.left.mass
              },
              right: {
                fatPercentage: data.measures.segments.leg.right.fatPercentage,
                mass: data.measures.segments.leg.right.mass
              }
            },
            trunk: {
              fatPercentage: data.measures.segments.trunk.fatPercentage,
              mass: data.measures.segments.trunk.mass
            }
          },
          shapes: {
            wrist: data.measures.shapes.wrist,
            waist: data.measures.shapes.waist,
            hip: data.measures.shapes.hip,
            arm: data.measures.shapes.arm,
            leg: data.measures.shapes.leg,
            chest: data.measures.shapes.chest
          }
        },
        objective: data.objective,
        reason: data.reason,
        foodDiseases: data.foodDiseases,
        foodForbidden: data.foodForbidden,
        foodFavourite: data.foodFavourite,
        dietType: data.dietType,
        dayFruit: data.dayFruit,
        dayMilk: data.dayMilk,
        dayCereals: data.dayCereals,
        dayProteins: data.dayProteins,
        selfCook: data.selfCook,
        receiveDietsBefore: data.receiveDietsBefore,
        supervisor: data.supervisor,
        supervisorDetail: data.supervisorDetail,
        isEmployed: data.isEmployed,
        employmentType: data.employmentType,
        transportType: data.transportType,
        doExercise: data.doExercise,
        sportDetail: data.sportDetail,
        exerciseFrecuency: data.exerciseFrecuency,
        increaseActivity: data.increaseActivity,
        injuries: data.injuries,
        receiveTrainingInfo: data.receiveTrainingInfo,
        receiveSupplementInfo: data.receiveSupplementInfo
      }
    };
  },

  actions: {
    register(data) {
      $('div.loading-container').show();
      this.get('api').createUser(this._normalize(data))
        .then(() => {
          $('#modal-registration-ok').modal();
        })
        .catch(() => {
          $('#modal-registration-error').modal();
        })
        .finally(() => $('div.loading-container').hide());
    },

    goToLogin() {
      this.transitionTo('login');
    }
  }
});
