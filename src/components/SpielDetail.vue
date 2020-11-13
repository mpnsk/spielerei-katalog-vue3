<template>
  <div>
    <router-link :to="{name: routeNames.dialog, params: { spielId: spielId - 1 }  }">←</router-link>
    <router-link :to="{name: routeNames.dialog, params: { spielId: Number(spielId) + 1 }  }">→</router-link>

    <div v-if="spiel !== undefined">

            <div>
              <h1>{{ spiel.name }} {{ spiel.released ? '(' + spiel.released + ')' : '' }}</h1>
            </div>
      <div
          class="
          grid
          place-content-center
          m-5
    ">
        <div class="col-span-1 sm:row-start-1 sm:col-span-1">
          <img
              :src="spiel.coverUrl"
              alt="this is an image!"
          />
        </div>
        <div class="col-span-1 sm:row-start-2 sm:col-span-1 place-self-center">
          <ul>
            <li>{{ display(spiel.duration) }} Min</li>
            <li>{{ display(spiel.age) }}</li>
            <li>{{ display(spiel.players) }}</li>
          </ul>
        </div>
        <div class="col-span-2 sm:col-start-3 sm:row-start-1 sm:row-span-2" v-if="spiel.description !== undefined">
          <div class="sm:max-w-3xl">

            {{ spiel.description }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {routeNames} from './../router'
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
    let spiele = []
    console.log(props.spielId)
    let spiel = computed(() => {
      let id = props.spielId;
      return spiele.asMap.get(id)

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
