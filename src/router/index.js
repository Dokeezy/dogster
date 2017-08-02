import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '../components/login/SignUp.vue'
import SignIn from '../components/login/SignIn.vue'
import Profile from '../components/profile/Profile.vue'
import Home from '../components/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signup',
      component: SignUp
    },
    {
      path: '/signin',
      component: SignIn
    },
    {
      path: '/profile/:id',
      props: true,
      component: Profile
    },
    {
      path: '/',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next('/signin');
        } else {
          next();
        }
      }
    },
  ]
})
