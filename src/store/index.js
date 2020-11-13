import {createStore} from 'vuex'

let store = createStore({
    state() {
        return {
            spiele: []
        }
    },
    mutations: {
        create: (state, neueSpiele) => {
            console.log("vuex is working")
            state.spiele = state.spiele.concat(neueSpiele)
        }
    },
    devtools: true
});
export default store