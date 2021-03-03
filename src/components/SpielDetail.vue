<template>
    <!--    <router-link :to="{name: routeNames.dialog, params: { spielId: spielId - 1 }  }">←</router-link>-->
    <!--    <router-link :to="{name: routeNames.dialog, params: { spielId: Number(spielId) + 1 }  }">→</router-link>-->

    <div v-if="game !== undefined">
      <div>
        <h1>{{ game.title }} {{ game.releaseYear ? '(' + game.releaseYear + ')' : '' }}</h1>
      </div>
      <div
          class="grid place-content-center">
        <div class="
        col-span-1 col-start-1 row-start-1
        bg-red-500
        place-self-center"
             :class="{mdRowSpan2: game.description !== ''}"
        >
          img
          <!--          <img-->
          <!--              alt="Bild läd.."-->
          <!--              class="lazyload"-->
          <!--              v-bind:data-srcset="imgSrcSet"-->
          <!--          />-->

        </div>
        <div class="
        p-10
        col-start-1 row-start-2
        "
             :class="{secondColumnLayout: game.description !== ''}"
        >
          <ul>
            <li>{{ display({min: game.minutes, max: 90}) }} Min</li>
            <li>{{ display(game.age) }}</li>
<!--            <li>{{ display(game.players) }}</li>-->
            <li>{{display({min: game.playerMinimum, max: game.playerMaximum})}}</li>
          </ul>
          <div v-if="game.description !== ''"
               class="sm:max-w-3xl">
            Description
            {{ game.description }}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {routeNames} from './../router'
// eslint-disable-next-line no-unused-vars
import {computed} from "@vue/reactivity";
// eslint-disable-next-line no-unused-vars
import {useStore} from "vuex";

export default {
  props: {
    spielId: String,
  },
  setup(props) {

    let store = useStore();

    let spiele = []
    console.log(props.spielId)
    return {routeNames}
  },
  data() {
    return {
      fullWidth: true,
      fullHeight: false,
      full: false,
      game: undefined
    }
  },
  methods: {
    display(x) {
      if (x == undefined || x.min < 0 || x.max < 0)
        return ''
      if (x.min === x.max)
        return x.min
      if (x.max === 99 | x.max === 999)
        return x.min + "+";
      else
        return x.min + " - " + x.max
    }
  },
  computed: {
    // imgSrcSet() {
    //   const spiel = this.spiel
    //   const firstAttachment = spiel.attachments[0]
    //   const id = firstAttachment.id
    //   const name = firstAttachment.name
    //   let srcs = []
    //   for (let p of firstAttachment.previews) {
    //     srcs.push(process.env.VUE_APP_IMAGE_URL + "/" + id + "/" + p.w + "x" + p.h + "/" + p.id + "/" + name + " " + p.w + "w")
    //   }
    //   return srcs.join(',')
    // }
  },
  beforeMount() {
    console.log("onmounted")
    fetch(new Request(process.env.VUE_APP_GAME_URL + "/games/" + this.spielId))
        .then(response => response.json())
        .then(json => {
          console.log("json", json)
          this.game = json
        })
  }
}
</script>
<style scoped>
.secondColumnLayout {
  @apply md:col-start-2 md:row-start-1 md:self-center
}

.mdRowSpan2 {
  @apply md:row-span-2
}
</style>
