import Vue from 'vue';
import VueApollo from 'vue-apollo';
import VueMeta from 'vue-meta';

import App from '@/App.vue';
import router from './router';
import defaultClient from '@/apollo/client';
import filters from '@/utils/filters';
import store from './store';

Vue.config.productionTip = false;

// setup apollo
Vue.use(VueMeta);
Vue.use(VueApollo);
const apolloProvider = new VueApollo({
  defaultClient,
});

// Filters
Object.entries(filters).forEach(([name, filterFunction]) => {
  Vue.filter(name, filterFunction);
});

// @ts-ignore
new Vue({
  router,
  render: (h) => h(App),
  store,
  apolloProvider,
}).$mount('#app');
