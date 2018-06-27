import Service from '@ember/service';
import { get }  from '@ember/object';
import CryptoJS from 'cryptojs'
import moment from 'moment';
import ENV from '../config/environment';

const TPV_KEY = 'sq7HjrUOBfKmC576ILgskD5srU870gJ7';
const HOST = ENV.environment === 'production'
  ? 'https://dieta-farma-api.herokuapp.com'
  : 'http://localhost:4200'
const DS_PARAMS = {
  'DS_MERCHANT_AMOUNT': '',
  'DS_MERCHANT_ORDER': moment().format('YYMMDDHHmmss').toString(),
  'DS_MERCHANT_MERCHANTCODE': ENV.environment === 'production' ? '336823737PP' : '336823737',
  'DS_MERCHANT_CURRENCY': '978',
  'DS_MERCHANT_TRANSACTIONTYPE': '0',
  'DS_MERCHANT_TERMINAL': '001',
  'DS_MERCHANT_MERCHANTURL': '',
  'DS_MERCHANT_URLOK': `${HOST}/premium/success?userId=:userId&type=:type`,
  'DS_MERCHANT_URLKO': `${HOST}/premium/error?userId=:userId&type=:type`
};

export default Service.extend({

  setParam(key, value) {
    DS_PARAMS[key] = value;
  },

  getOrder(params) {
    return (get(params, 'Ds_Merchant_Order') || get(params, 'DS_MERCHANT_ORDER') || '').trim();
  },

  getParam(key) {
    return DS_PARAMS[key.toUpperCase()];
  },

  getOrderNotif(params) {
    return (get(params, 'Ds_Order') || get(params, 'DS_ORDER') || '').trim();
  },

  getDsParams() {
    return DS_PARAMS;
  },

  createMerchantParameters() {
    return btoa(JSON.stringify(this.getDsParams()));
  },

  createMerchantSignature() {
    const merchant_params = this.createMerchantParameters();
    const key = this.encrypt3DES(this.getOrder(DS_PARAMS), TPV_KEY);
    const hash = CryptoJS.HmacSHA256(merchant_params, key);

    return CryptoJS.enc.Base64.stringify(hash);
  },

  encrypt3DES (order, key) {
    const keyHex = CryptoJS.enc.Base64.parse(key);

    const extra = {
      iv: CryptoJS.enc.Utf8.parse('\0'),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    };

    return CryptoJS.TripleDES.encrypt(order, keyHex, extra).ciphertext;
  }
});