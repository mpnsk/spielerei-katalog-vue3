<template>
  <div>

    <router-link :to="{name: routeNames.dialog, params: { spielId: spielId - 1 }  }">←</router-link>
    <router-link :to="{name: routeNames.dialog, params: { spielId: Number(spielId) + 1 }  }">→</router-link>


    <div v-if="spiel != undefined"
         class="
          grid
<!--          grid-flow-row-->
          place-content-center
<!--          gap-1-->
          m-5
    ">
      <div class="col-span-5">{{ spiel.name }} {{ spiel.released ? '(' + spiel.released + ')' : '' }}</div>
      <div class="col-span-1 sm:row-start-2 sm:col-span-1">
        <img
            :src="spiel.coverUrl"
            alt="this is an image!"
        />
      </div>
      <div class="col-span-1 sm:row-start-3 sm:col-span-1">
        <ul>
          <li>{{ spiel.duration }} | {{ display(spiel.duration) }} Min</li>
          <li>{{ spiel.age }} | {{ display(spiel.age) }}</li>
          <li>{{ spiel.players }} | {{ display(spiel.players) }}</li>
        </ul>
      </div>
      <div class="col-span-2 sm:col-start-3 sm:row-start-2">
        <div class="sm:max-w-4xl">

          {{ spiel.description != undefined ? "Beschreibung kommt noch" : spiel.description }}
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import {routeNames} from './../router'
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
    return {spiel, routeNames}
  },
  data() {
    return {
      fullWidth: true,
      fullHeight: false,
      full: false,
    }
  },
  methods: {
    display(x) {
      if (x == undefined || x.min < 0 || x.max < 0)
        return '?'
      if (x.min === x.max)
        return x.min
      if (x.max === 99 | x.max === 999)
        return x.min + "+";
      else
        return x.min + " - " + x.max
    }
  }
}
</script>
