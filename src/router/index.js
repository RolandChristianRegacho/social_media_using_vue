import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import PostView from '../views/PostView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomeView
    },
    {
      path: '/post:id',
      name: 'PostPage',
      component: PostView
    },
    {
      path: '/profile:id',
      name: 'ProfilePage',
      component: ProfileView
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'SignUpPage',
      component: SignUpView
    }
  ]
})

export default router
