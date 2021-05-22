import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
// import tailwindbase from 'tailwindcss/dist/base.css'
// import tailwindcomponents from 'tailwindcss/dist/components.css'
// import tailwind from 'tailwindcss/dist/tailwind.css'
import tailwindutilities from 'tailwindcss/dist/utilities.css'
import 'lazysizes'
// import 'lazysizes/plugins/unveilhooks/ls.unveilhooks.min';

createApp(App)
    .use(router)
    .mount('#app')
