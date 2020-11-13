import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import 'lazysizes'
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks.min';

// eslint-disable-next-line no-unused-vars
import tailwindbase from 'tailwindcss/dist/base.css'
// eslint-disable-next-line no-unused-vars
import tailwindcomponents from 'tailwindcss/dist/components.css'
// eslint-disable-next-line no-unused-vars
import tailwind from 'tailwindcss/dist/tailwind.css'
// eslint-disable-next-line no-unused-vars
import tailwindutilities from 'tailwindcss/dist/utilities.css'
import {createStore} from "vuex";
import {reactive} from "@vue/reactivity";




let asArray = reactive([]);
let asMap = reactive(new Map());
let spiele = {asArray, asMap}
fetch(new Request('http://192.168.178.147:8090/games'))
    .then(response => response.json())
    .then(json => json.forEach(x => {
        spiele.asArray.push(x)
        spiele.asMap.set(x.name, x)
        store.commit('create', spiele)
    }));



createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
