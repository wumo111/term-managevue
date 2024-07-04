import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'font-awesome/css/font-awesome.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {setSessionStorage,getSessionStorage,removeSessionStorage,setLocalStorage,getLocalStorage} 
from './common.js';
import qs from "qs"
import myaxios from '@/api'

//axios.defaults.baseURL = '/sys';//基础路径

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$setSessionStorage=setSessionStorage;
Vue.prototype.$getSessionStorage=getSessionStorage;
Vue.prototype.$setLocalStorage=setLocalStorage;
Vue.prototype.$getLocalStorage = getLocalStorage;
Vue.prototype.$axios=myaxios;
//Vue.prototype.$axios=axios;
Vue.prototype.$qs=qs;
Vue.prototype.$removeSessionStorage=removeSessionStorage;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
