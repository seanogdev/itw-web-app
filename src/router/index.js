import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/:year/:month/:slug',
    name: 'post-single',
    component: () => import(/* webpackChunkName: "post-single" */ '@/views/PostSingle.vue'),
  },
  {
    path: '/category/:slug',
    name: 'category-single',
    component: () =>
      import(/* webpackChunkName: "categories-single" */ '@/views/CategorySingle.vue'),
  },
  {
    path: '/author/:nicename',
    name: 'author-single',
    component: () => import(/* webpackChunkName: "categories-single" */ '@/views/AuthorSingle.vue'),
  },
  {
    path: '*',
    component: () =>
      import(/* webpackChunkName: "categories-single" */ '@/components/EmptyState.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

export default router;
