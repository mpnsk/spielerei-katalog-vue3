import {reactive} from "@vue/reactivity";

let asArray = reactive([]);
let asMap = reactive(new Map());
let store = {asArray, asMap}
fetch(new Request('http://192.168.178.147:8080/games'))
    .then(response => response.json())
    .then(json => json.forEach(x => {
        store.asArray.push(x)
        store.asMap.set(x.name, x)
    }));
export default store
