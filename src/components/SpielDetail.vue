<template>
  <div>

    <div v-if="spiel != undefined">
      <div class="text-h6">{{ spiel.name }} {{ spiel.released }}</div>

      <div class="row">
        <div class="col-xs-12 col-md-3 ">
          <img
              :src="'/cover/'+spiel.name"
              style="max-width: 350px"
              alt="this is an image!"
          />
        </div>
        <div class="col-xs-12 col-md-6" style="padding: 15px">
          {{ spiel.description }}
        </div>
        <div class="col-xs-12 col-md-3 ">
          <ul>
            <li>{{ spiel.duration }}</li>
            <li>{{ spiel.age }}</li>
            <li>{{ spiel.players }}</li>
          </ul>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import store from '../GameStore'
// eslint-disable-next-line no-unused-vars
import {computed, ref} from "@vue/reactivity";
// eslint-disable-next-line no-unused-vars
import {watch} from "@vue/runtime-core";
// import spiele from '../assets/spiele.json'

export default {
  props: {
    spielId: String,
  },
  setup(props) {
    console.log(props.spielId)
    let spiel = computed(() => {
      let id = props.spielId;
      if (store.length >= id) {
        return store[id]
      } else {
        return null
      }
    })
    return {spiel}
  },
  data() {
    return {
      fullWidth: true,
      fullHeight: false,
      full: false,
    }
  }
}
</script>
