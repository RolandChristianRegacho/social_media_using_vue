import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import PostView from '../views/PostView.vue'
import ProfileView from '../views/ProfileView.vue'
import MessageView from '../views/MessageView.vue'
import NotAuthorized from '../views/Error_Pages/NotAuthorized.vue'
import NotFound from '../views/Error_Pages/NotFound.vue'
import NotAllowed from '../views/Error_Pages/NotAllowed.vue'
import ServerError from '../views/Error_Pages/ServerError.vue'

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
      path: '/message',
      name: 'MessagePage',
      component: MessageView
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
    },
    {
      path: '/401',
      name: 'NotAuthorized',
      component: NotAuthorized
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/405',
      name: 'NotAllowed',
      component: NotAllowed
    },
    {
      path: '/500',
      name: 'ServerError',
      component: ServerError
    }
  ]
})

export default router
