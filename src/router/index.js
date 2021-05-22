import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import SpielOverview from '../components/SpielOverview'
import SpielDetail from '../components/SpielDetail'
import About from '../components/About'
// eslint-disable-next-line no-unused-vars
import {reactive, ref} from "@vue/reactivity";

const names = {
    index: 'index',
    users: 'users',
    dialog: 'dialog',
    spiel: 'spiel',
    overview: 'overview',
    about: 'about'
}
const routes = [
    {
        name: names.index,
        path: '/home',
        component: Home
    },
    {
        name: names.overview,
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
        path: '/dialog/:spielId',
        component: SpielDetail,
        props: true
    },
    {
        name: names.spiel,
        path: '/spiel/:kategorie/:spielId',
        component: SpielDetail,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {left: 0, top: 0}
        }
    }

})

export default router
export const routeNames = reactive(names)
