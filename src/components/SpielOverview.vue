<template>
  <div style="padding: 15px">
    <div>
      <div style="padding: 15px;">
        <div>
          <span v-bind:class="{
          activeTag: filter.div1,
          inactiveTag: !filter.div1
         }"
                @click="filter.div1 = !filter.div1">
          unter 15 Min
        </span>
          <span v-bind:class="{ activeTag: filter.div2, inactiveTag: !filter.div2 }"
                @click="filter.div2 = !filter.div2">
          15-30 Min
        </span>
          <span v-bind:class="{ activeTag: filter.div3, inactiveTag: !filter.div3 }"
                @click="filter.div3 = !filter.div3">
          30-45 Min
        </span>
          <button style="">example btn</button>
        </div>
        <span class="activeTag" @click="filter.div1 = !filter.div1">div1</span>
        <span class="inactiveTag">div2</span>
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
import ToggleDiv from "@/components/ToggleDiv";

export default {
  data() {
    return {
      routeNames: routeNames,
      spiele,
      filter: {
        div1: true,
        div2: true,
        div3: true
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

.inactiveTag {
  color: orange;
  border: 1px solid;
  border-radius: 5px;
  padding: 2px;
}
.inactiveTag:hover {
  color: grey;
}

.activeTag {
  color: white;
  background-color: orange;
  border: 1px solid;
  border-radius: 5px;
  padding: 2px;
}
</style>
