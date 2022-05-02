import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue';
import ProjectView from '../views/ProjectView.vue'
import ExperienceView from '../views/ExperienceView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AboutView,
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectView
  },
  {
    path: '/experience',
    name: 'experience',
    component: ExperienceView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
