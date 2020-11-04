import { createApp } from 'vue'
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


createApp(App)
    .use(router)
    .mount('#app')
