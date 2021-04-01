import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import Todo from '../components/Todo.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/Register',
    name: 'Register',
    component: Register,
    meta: {
      requiredAuthentication: false,
    },
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      requiredAuthentication: false,
    },
  },
  {
    path: '/Todo',
    name: 'Todo',
    component: Todo,
    meta: {
      requiredAuthentication: true,
    },
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const beforeRouterEnter = async (to, from, next) => {
  if (to.meta.requiredAuthentication) {
    // console.log(Vue.$store.getters['auth/authenticated']);
    if (Vue.$store.getters['auth/authenticated']) {
      next();
    } else {
      next({ name: 'Login' });
    }
  } else {
    next();
  }
  // else {
  //   next();
  // }
};

router.beforeEach(beforeRouterEnter);
Vue.$router = router;
export default router;
