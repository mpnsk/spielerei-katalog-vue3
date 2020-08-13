<template>
  <div style="padding: 15px">
    <label>Spielname
      <input type="text" v-model="filter.name"/>
    </label>
    <label>Spieldauer
      <input
          type="range"
          id="spieldauer-range"
          v-model="filter.dauer.slider"
          :min="filter.dauer.min"
          :max="filter.dauer.max"
          :step="filter.dauer.step"
          :left-label-value="filter.dauer.slider.min + ' Min'"
          :right-label-value="filter.dauer.slider.max + ' Min'"
          style="size: 90vh"
      />
    </label>
    <label> Spieldauer min
      <input type="number" :max="filter.dauer.slider.max" :min="filter.dauer.min" step="15"
             v-model="filter.dauer.slider.min"/>
    </label>
    <label> Spieldauer max
      <input type="number" :min="filter.dauer.slider.min" :max="filter.dauer.max" step="15"
             v-model="filter.dauer.slider.max"/>
    </label>
    <label> Spielerzahl
      <input
          type="range"
          v-model="filter.spieler"
          :min="1"
          :max="12"
          :right-label-value="filter.spieler.max < 12 ? filter.spieler.max : filter.spieler.max + '+' "

          style="size: 90vh"
      />
    </label>
    <label>Random radio
      <input type="radio" value="abc">
    </label>
    <div v-for="(spiel, index) in spiele" :key="index" :id="index" class="my-card" @click="navigate(index)">
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

export default {
  // name: 'ComponentName',
  data() {
    return {
      routeNames: routeNames,
      deferList: false,
      spiele,
      filter: {
        spieler: {
          min: 1,
          max: 12,
          lower: 2,
          upper: 4
        },
        dauer: {
          slider: {
            min: 15,
            max: 120
          },
          min: 15,
          max: 120,
          step: 15
        }
      }
    }
  },
  methods: {
    navigate(index) {
      this.$router.push({
        name: this.routeNames.dialog,
        params: {userId: index}
      })
    }
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
</style>
