import { inject } from 'vue';

const $cookies = inject('$cookies');

function getCookie(key) {
  return $cookies.get(key);
}

function setCookie(key, value, expireTimes, path = '/') {
  $cookies.set(key, value, expireTimes, path);
}

export {
  getCookie, 
  setCookie
};