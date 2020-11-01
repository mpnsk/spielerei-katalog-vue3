<template>
  <div style="padding: 15px">
    <div id="filter" class="space-y-1">


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
        <label> Spielerzahl: {{filter.spielerzahl}}
          <button class="p-1 bg-gray-200" @click="filter.spielerzahl--">-</button>
          <input
              type="range"
              :min="1"
              :max="12"
              v-model="filter.spielerzahl"
          />
          <button class="p-1 bg-gray-200" @click="filter.spielerzahl++">+</button>
        </label></div>
      <div id="spiele">
        <div v-for="(spiel, index) in spiele" :key="index" :id="'spiel-' + index" class="my-card"
             @click="navigate(index)">
          <img
              :data-src="spiel.coverUrl"
              alt="this is an image!"
              class="lazyload"
              style="height: 150px"
          />
          <div class="absolute-bottom text-h6">
            {{ spiel.name }}
          </div>
          <div>
            Spieler: {{ spiel.spielerAnzahl }} Spieler <br>
            Dauer: {{ spiel.dauer }} <br>
            Alter: {{ spiel.mindestAlter }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../GameStore'
import {routeNames} from '@/router'
// eslint-disable-next-line no-unused-vars
import {computed, reactive, ref} from "@vue/reactivity";

export default {
  setup() {
    console.log("setup is called")
    let spiele = store
    let filter =  reactive({
      dauer: [
        {active: true, text: 'bis 30 Min'},
        {active: false, text: '60 Min'},
        {active: true, text: '90 Min'},
        {active: true, text: '120+ Min'},
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
    return {filter, spiele}
  },
  methods: {
    navigate(index) {
      this.$router.push({
        name: routeNames.dialog,
        params: {spielId: index}
      })
    },
  },
}
</script>
<style scoped>
.my-card {
  height: 100%;
  max-width: 500px;
  padding: 15px;
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
