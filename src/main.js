// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import elementUI from 'element-ui';

import store from './appStore';

Vue.config.productionTip = false;
Vue.use(elementUI);



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});

let ss = store.commit('initConnection');
console.log(ss);