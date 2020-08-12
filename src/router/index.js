import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import RootView from '../components/RootView'
import ChildOneView from '../components/ChildOneView'
import MyDialog from '../components/MyDialog'

const names = {
  index: 'index',
  users: 'users',
  user: {
    child: 'user.child-one',
    dialog: 'user.dialog'
  }
}
const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {name: names.index, path: 'index', component: Home},
      {
        name: names.users,
        path: '',
        component: RootView,
        children: [
          {
            name: names.user.child,
            path: 'child-one',
            component: ChildOneView
          },
          {
            name: names.user.dialog,
            path: 'dialog/:userId',
            component: MyDialog
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
export const routeNames = names
