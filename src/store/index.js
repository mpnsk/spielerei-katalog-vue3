import {createStore} from 'vuex'

let store = createStore({
    state() {
        return {
            spiele: []
        }
    },
    mutations: {
        load: (state, neueSpiele) => state.spiele = state.spiele.concat(neueSpiele)
    },
    // getters: {
    //     spiele: (state) => state.spiele
    // },
    devtools: true
});
export default store
