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
              data-sizes="auto"
              v-bind:data-srcset="imgSrcSet"
              alt="Bild läd.."
              class="lazyload place-self-center object-center "
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
import {useStore} from "vuex";
// import spiele from '../assets/spiele.json'

export default {
  props: {
    spielId: String,
  },
  setup(props) {

    let store = useStore();

    let spiele = []
    console.log(props.spielId)
    let spiel = computed(() => {
      let shortLink = props.spielId;

      if (store === undefined) return null
      let spiel1 = store.getters.spiel(shortLink);
      return spiel1

      // return spiele.asMap.get(id)

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
  },
  computed: {
    imgSrcSet() {
      const spiel = this.spiel
      const firstAttachment = spiel.attachments[0]
      const id = firstAttachment.id
      const name = firstAttachment.name
      console.log(firstAttachment)
      let srcs = []
      for (let p of firstAttachment.previews) {
        srcs.push("http://409b50da-f0a5-40b4-9076-6f3b88346cf3.pub.instances.scw.cloud:8082/" + id + "/" + p.w + "x" + p.h + "/" + p.id + "/" + name + " " + p.w + "w")
      }
      const srcSet = srcs.join(',');
      console.log(srcSet);
      return srcSet
    }
  }
}
</script>
