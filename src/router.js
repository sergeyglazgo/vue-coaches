import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from './components/CoachesList.vue';
import RegisterForm from './components/RegisterForm.vue';
import CoachPage from './components/CoachPage.vue';
import { store } from './store/index.js';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    { path: '/register', component: RegisterForm, meta: { requiresAuth: true }},
    { path: '/account', component: CoachPage, meta: { requiresAuth: true }},
    { path: '/:notFound(.*)', redirect: '/coaches' },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});
