import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import SpielOverview from '../components/SpielOverview'
import SpielDetail from '../components/SpielDetail'
import About from '../components/About'

const names = {
    index: 'index',
    users: 'users',
    dialog: 'dialog',
    about: 'about'
}
const routes = [
    {
        name: names.index,
        path: '/home',
        component: Home
    },
    {
        name: names.users,
        path: '/',
        component: SpielOverview
    },
    {
        name: names.about,
        path: '/about',
        component: About
    },
    {
        name: names.dialog,
        path: '/dialog/:userId',
        component: SpielDetail
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
