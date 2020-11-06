<template>
  <div style="padding: 15px">
    <div id="filter" class="space-y-1

">


      <div id="spielname" class="">
        <label>Titel
          <input type="text" v-model="filter.name"/>
        </label>
      </div>
      <div id="spieldauer" class="space-x-1 space-y-1">
        <label>
          Spieldauer 🕘
        </label>
        <div v-for="(data, index) in filter.dauer" :key="index" class="inline-block">
          <label
              v-bind:class="{
               tagBase: true,
               activeTag: data.active,
               inactiveTag: !data.active,
             }"
          >
            <nobr>
              <input type="checkbox" v-model="data.active">
              {{ data.text }}
            </nobr>
          </label>
        </div>
      </div>
      <div id="kategorie" class="space-x-1 space-y-1">
        <div v-for="(data, index) in filter.kategorie" :key="index" class="inline-block">
          <label
              v-bind:class="{
               tagBase: true,
               activeTag: data.active,
               inactiveTag: !data.active,
             }"
          >
            <nobr>
              <input type="checkbox" v-model="data.active">
              {{ data.text }}
            </nobr>
          </label>
        </div>
      </div>
      <div id="spielerzahl">
        <label> Spielerzahl: {{ filter.spielerzahl }}
          <button class="p-1 bg-gray-200" @click="filter.spielerzahl--">-</button>
          <input
              type="range"
              :min="1"
              :max="12"
              v-model="filter.spielerzahl"
          />
          <button class="p-1 bg-gray-200" @click="filter.spielerzahl++">+</button>
        </label></div>
      {{ filteredGames.length }} Spiele gefunden
      <div id="spiele" class="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 place-items-center">
        <Card :spiel="spiel" v-for="(spiel, index) in filteredGames" :key="index" :id="'spiel-' + index" class="my-card"
              @click="navigate(spiel)">
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../GameStore'
import {routeNames} from '@/router'
// eslint-disable-next-line no-unused-vars
import {computed, reactive} from "@vue/reactivity";
import Card from "@/components/Card";
import range from '../functions/rangeUtil'

export default {
  setup() {
    console.log("setup is called")
    debugger;
    let spiele = store.asArray
    let filter = reactive({
      dauer: [
        {active: false, text: 'bis 30 Min'},
        {active: false, text: '60 Min'},
        {active: false, text: '90 Min'},
        {active: false, text: '120+ Min'},
      ],
      kategorie: [
        {active: false, text: 'Strategie'},
        {active: false, text: 'Builder'},
        {active: false, text: 'Knobel'},
        {active: false, text: 'Quiz'},
        {active: false, text: 'Karten'},
        {active: false, text: 'Klassiker'},
        {active: false, text: 'Familienspiel'},
        {active: false, text: 'Partyspiel'},
        {active: false, text: 'Gamer\'s Games'},
        {active: false, text: 'Wirtschaftsspiel'},
        {active: false, text: 'Würfelspiel'},
      ]
    });

    const filteredGames = computed(() => {
      debugger;
      return spiele.filter(spiel => {
        let duration = spiel.duration;
        let anyFilterSelected = filter.dauer[0].active || filter.dauer[1].active || filter.dauer[2].active || filter.dauer[3].active;
        if (duration == undefined) {
          console.log("undefined duration " + spiel.name)
          return !anyFilterSelected
        }
        if (duration.min === undefined) {
          console.log("undefined duration.min " + spiel.name)
          console.log(spiel)
          return !anyFilterSelected
        } else {
          return !anyFilterSelected || (filter.dauer[0].active && range.rangeIntersect(duration, {min: 0, max: 30}))
        }
        // ||
        // (filter.dauer[1].active && spiel.dauer.min >= 30 && spiel) ||
        // (filter.dauer[2].active && spiel.dauer.max < 30)

        // return spiel.duration.max > 60
      });
    })

    return {filter, spiele, filteredGames}
  },
  methods: {
    navigate(spiel) {
      this.$router.push({
        name: routeNames.dialog,
        params: {spielId: spiel.name}
      })
    }
    ,
  }
  ,
  components: {
    Card
  }
}
</script>
<style scoped>
.my-card {
  /*height: 100%;*/
  /*max-width: 500px;*/
  /*padding: 15px;*/
}

.my-card:hover {
  box-shadow: 1px 8px 20px grey;
  -webkit-transition: box-shadow .6s ease-in-out;
}

.tagBase {
  border: 1px solid;
  border-radius: 5px;
  padding: 3px;

  user-select: none;
  -khtml-user-select: none;
  -o-user-select: none;
  -webkit-user-select: none;
}

.inactiveTag {
  border-color: lightgrey;
}

.activeTag {
  background-color: #c4ffb8;
  border-color: green;
}

.selectChecked {
  background-color: #c4ffb8;
  border-color: green;
}

.selectUnchecked {
  border-color: lightgrey;
}
</style>
