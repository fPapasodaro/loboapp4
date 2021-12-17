import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import AddQuery from '../views/AddQuery.vue'
import Querys from '../views/Querys.vue'
import TodoList from '../views/TodoList.vue'
import SmokeGenerator from '../views/SmokeGenerator.vue'
import Retros from '../views/Retros.vue'
/* import TaskForce from '../views/TaskForce.vue' */


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/AddQuery',
    name: 'AddQuery',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AddQuery.vue')
    component: AddQuery
  },
  {
    path: '/Querys',
    name: 'Querys',
    //component: () => import(/* webpackChunkName: "about" */ '../views/TodoList.vue')
    component: Querys
  },
  {
    path: '/TodoList',
    name: 'TodoList',
    //component: () => import(/* webpackChunkName: "about" */ '../views/TodoList.vue')
    component: TodoList
  },
  {
    path: '/SmokeGenerator',
    name: 'SmokeGenerator',
    //component: () => import(/* webpackChunkName: "about" */ '../views/TodoList.vue')
    component: SmokeGenerator
  },
  {
    path: '/Retros',
    name: 'Retros',
    //component: () => import(/* webpackChunkName: "about" */ '../views/TodoList.vue')
    component: Retros
  },
/*   {
    path: '/TaskForce',
    name: 'TaskFoce',

    component: TaskForce
  }, */
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
