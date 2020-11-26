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
    getters: {
        spiel: state => shortLink => {
            let result = null
            for (let k in state.spiele) {
                for (let s of state.spiele[k]) {
                    if (s.shortLink === shortLink) {
                        result = s
                    }
                }
            }
            debugger
            return result
        }
    },
    devtools: true
});
export default store
