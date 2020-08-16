import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import tailwindbase from 'tailwindcss/dist/base.css'
import tailwindcomponents from 'tailwindcss/dist/components.css'
import tailwind from 'tailwindcss/dist/tailwind.css'
import tailwindutilities from 'tailwindcss/dist/utilities.css'

createApp(App)
    .use(router)
    .use(tailwindbase)
    .use(tailwindcomponents)
    .use(tailwind)
    .use(tailwindutilities)
    .mount('#app')
