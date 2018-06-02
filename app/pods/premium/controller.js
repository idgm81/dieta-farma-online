import Controller from '@ember/controller';
import { reads }  from '@ember/object/computed';
import { inject as service } from '@ember/service';

const uris = {
	real: 'https://sis.redsys.es/sis/realizarPago',
  test: 'https://sis-t.redsys.es:25443/sis/realizarPago'
};

export default Controller.extend({

  session: service(),

  sermepa: service(),

  userId: reads('session.data.authenticated.id'),

  uri: uris.test,

  params: '',

  signature: '',

  actions: {
    buy(amount) {
      const sermepa = this.get('sermepa');

      sermepa.setParam('DS_MERCHANT_AMOUNT', amount*100);
      this.set('params', sermepa.createMerchantParameters());
      this.set('signature', sermepa.createMerchantSignature());
      $('#paymentForm').find('#Ds_MerchantParameters').val(this.get('params'));
      $('#paymentForm').find('#Ds_Signature').val(this.get('signature'));

      $('#paymentForm').submit();
    }
  }
});
