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
    {name: names.index, path: '/home', component: Home},
    {
        name: names.users,
        path: '/',
        component: RootView
    },
    {
        name: names.user.child,
        path: '/child-one',
        component: ChildOneView
    },
    {
        name: names.user.dialog,
        path: '/dialog/:userId',
        component: MyDialog
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }

})

export default router
export const routeNames = names
