import Controller from '@ember/controller';
import { reads }  from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { TPV_URI, DIET_PRICES } from '../constants';

export default Controller.extend({

  session: service(),

  sermepa: service(),

  userId: reads('session.data.authenticated.id'),

  uri: TPV_URI.test,

  prices: DIET_PRICES,

  params: '',

  signature: '',

  actions: {
    buy(type) {
      const sermepa = this.get('sermepa');
      const userId = this.get('userId');
      const urlOK = sermepa.getParam('DS_MERCHANT_URLOK')
        .replace('userId', userId)
        .replace('type', type);
      const urlKO = sermepa.getParam('DS_MERCHANT_URLKO')
        .replace('userId', userId)
        .replace('type', type);

      sermepa.setParam('DS_MERCHANT_AMOUNT', DIET_PRICES[type]*100);
      sermepa.setParam('DS_MERCHANT_URLOK', urlOK);
      sermepa.setParam('DS_MERCHANT_URLKO', urlKO);

      this.set('params', sermepa.createMerchantParameters());
      this.set('signature', sermepa.createMerchantSignature());
  
      $('#paymentForm').find('#Ds_MerchantParameters').val(this.get('params'));
      $('#paymentForm').find('#Ds_Signature').val(this.get('signature'));
      $('#paymentForm').submit();
    }
  }
});
