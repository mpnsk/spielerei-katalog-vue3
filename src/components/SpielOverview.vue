<template>
  <div style="padding: 15px">
    <div>
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
  data() {
    return {
      routeNames: routeNames,
      spiele,
      filter: {}
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
