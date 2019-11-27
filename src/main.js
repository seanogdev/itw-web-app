import Vue from 'vue';
import VueApollo from 'vue-apollo';

import App from '@/App.vue';
import router from './router';
import defaultClient from '@/apollo/client';

Vue.config.productionTip = false;

// setup apollo
Vue.use(VueApollo);
const apolloProvider = new VueApollo({
  defaultClient,
});

// @ts-ignore
new Vue({
  router,
  render: (h) => h(App),
  apolloProvider,
}).$mount('#app');
