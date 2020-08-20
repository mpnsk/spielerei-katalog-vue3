<template>
  <div style="padding: 15px">
    <div>
      <div style="">
        <div class="grid grid-cols-5">
          <span v-for="(data, index) in filter.dauer" :key="index">
            <span
             v-bind:class="{
               tagBase: true,
               activeTag: data.active,
               inactiveTag: !data.active,
             }"
             @click="data.active = !data.active">
              {{ data.text }}
            </span>
          </span>
        </div>
        🕘
        <toggle-div active-class="just a class">abc</toggle-div>
        <toggle-div active-class="another string"></toggle-div>
        <toggle-div></toggle-div>
      </div>
      <label>Titel
        <input type="text" v-model="filter.name"/>
      </label>
    </div>
    <div>
      <label>Dauer
        <input
            type="range"
        />
      </label>
    </div>
    <div>
      <label> Spieldauer min
        <input type="number"
        />
      </label>
    </div>
    <div>
      <label> Spieldauer max
        <input type="number"
        />
      </label>
    </div>
    <div>
      <label> Spielerzahl
        <input
            type="range"
            :min="1"
            :max="12"
        />
      </label>
    </div>
    <div>
      <label>Random radio
        <input type="radio" value="abc">
      </label>
    </div>
    <div v-for="(spiel, index) in spiele" :key="index" :id="'spiel-' + index" class="my-card" @click="navigate(index)">
      <img
          :src="'/cover/'+spiel.name"
          alt="this is an image!"
          loading="lazy"
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
</template>

<script>
import spiele from '../assets/spiele.json'
import {routeNames} from '@/router'
import ToggleDiv from "@/components/ToggleDiv";

export default {
  data() {
    return {
      routeNames: routeNames,
      spiele,
      filter: {
        dauer: [
          {active: false, text: 'bis 30 Min'},
          {active: false, text: '31 - 60 Min'},
          {active: false, text: '61 - 90 Min'},
          {active: false, text: '91 - 120 Min'},
          {active: false, text: '120+ Min'},
        ]
      }
    }
  },
  methods: {
    navigate(index) {
      this.$router.push({
        name: this.routeNames.dialog,
        params: {userId: index}
      })
    },
  },
  components: {
    ToggleDiv
  }
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
  background-color: #ffd790;
  border-color: orange;
}
</style>
