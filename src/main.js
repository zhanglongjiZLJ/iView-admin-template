// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios';
import store from './store/store';
import iviewArea from 'iview-area';
import echarts from 'echarts';



Vue.prototype.$echarts = echarts ;
Vue.prototype.$http = axios;

// Vue.config.productionTip = false
Vue.use(router);
Vue.use(iView);
Vue.use(iviewArea);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach(route => {
    iView.LoadingBar.finish();
});