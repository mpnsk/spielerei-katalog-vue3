import {createApp} from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import tailwindbase from 'tailwindcss/dist/base.css'
import tailwindcomponents from 'tailwindcss/dist/components.css'
import tailwind from 'tailwindcss/dist/tailwind.css'
import tailwindutilities from 'tailwindcss/dist/utilities.css'
import 'lazysizes'
// import 'lazysizes/plugins/unveilhooks/ls.unveilhooks.min';

fetch(new Request('http://409b50da-f0a5-40b4-9076-6f3b88346cf3.pub.instances.scw.cloud:8080/list/games'))
    .then(response => response.json())
    .then(json => {
        store.commit('load', json)
    })

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
