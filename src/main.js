import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './index'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'

Vue.config.productionTip = false
Vue.use(ElementUI, {locale});


/* eslint-disable no-debugger */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
