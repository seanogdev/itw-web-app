import Vue from 'vue';

// plugins
import VueApollo from 'vue-apollo';
import VueMeta from 'vue-meta';
import Vuelidate from 'vuelidate';
import VTooltip from 'v-tooltip';

// deps
import router from './router';
import defaultClient from '@/apollo/client';
import components from '@/utils/components';
import filters from '@/utils/filters';
import store from './store';
import App from '@/App.vue';

// sw
import '@/registerServiceWorker';

Vue.config.productionTip = false;

// setup apollo
Vue.use(VueApollo);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.use(VTooltip);
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
