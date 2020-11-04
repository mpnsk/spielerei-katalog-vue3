import {reactive} from "@vue/reactivity";

let store = reactive([]);
fetch(new Request('http://192.168.178.147:8080/games'))
    .then(response => response.json())
    .then(json => json.forEach(x => store.push(x)));
export default store
