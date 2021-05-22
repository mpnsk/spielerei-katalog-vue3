<template>
  <router-view :spiele="spiele" :kategorie="kategorie"/>
</template>
<script>
import {routeNames} from './router'

export default {
  data() {
    return {
      routeNames,
      spiele: null,
      kategorie: null
    }
  },
  mounted() {
    /*
    fetch(new Request(process.env.VUE_APP_GAME_URL + "/spiele/?size=9999"))
        .then(response => response.json())
        .then(json => json._embedded.spiele)
        .then(spiele => this.spiele = spiele)

     // */
    /*
    fetch(new Request(process.env.VUE_APP_GAME_URL + "/kategorien"))
        .then(response => response.json())
        .then(kategorien => this.kategorien = kategorien)
     // */
    // /*
    fetch(new Request(process.env.VUE_APP_GAME_URL + "/kategorie"))
        .then(response => response.json())
        .then(kategorie => this.kategorie = kategorie)
    // */
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
