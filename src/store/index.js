import {createStore} from 'vuex'

let store = createStore({
    state() {
        return {
            spiele: null
        }
    },
    mutations: {
        load: (state, neueSpiele) => state.spiele = neueSpiele
    },
    // getters: {
    //     spiele: (state) => state.spiele
    // },
    devtools: true
});
export default store
