import {createApp} from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import tailwindbase from 'tailwindcss/dist/base.css'
import tailwindcomponents from 'tailwindcss/dist/components.css'
import tailwind from 'tailwindcss/dist/tailwind.css'
import tailwindutilities from 'tailwindcss/dist/utilities.css'
import 'lazysizes'
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks.min';

fetch(new Request('http://192.168.178.147:8090/games'))
    .then(response => response.json())
    .then(json => {
        store.commit('load', json)
    })

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
