import Vue from 'vue';
import VueApollo from 'vue-apollo';
import VueMeta from 'vue-meta';
import Vuelidate from 'vuelidate';

import router from './router';
import defaultClient from '@/apollo/client';
import components from '@/utils/components';
import filters from '@/utils/filters';
import store from './store';
import App from '@/App.vue';

Vue.config.productionTip = false;

// setup apollo
Vue.use(VueApollo);
Vue.use(VueMeta);
Vue.use(Vuelidate);
const apolloProvider = new VueApollo({
  defaultClient,
});

// Filters
Object.entries(filters).forEach(([name, filterFunction]) => {
  Vue.filter(name, filterFunction);
});

// Components
Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component);
});

// @ts-ignore
new Vue({
  router,
  render: (h) => h(App),
  store,
  apolloProvider,
}).$mount('#app');
