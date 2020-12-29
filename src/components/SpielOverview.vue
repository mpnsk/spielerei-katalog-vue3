<template>
  <div style="padding: 15px">
    <div id="filter" class="space-y-1">
      <div id="spielname" class="">
        <label>Titel
          <input type="text"
                 v-model="filter.name"/>
        </label>
      </div>
      <div id="spielerzahl">
        <label> Spielerzahl: {{ filter.spieler }}
          <button class="p-1 bg-gray-200" @click="filter.spieler--">-</button>
          <input
              type="range"
              :min="1"
              :max="12"
              v-model="filter.spieler"
          />
          <button class="p-1 bg-gray-200" @click="filter.spieler++">+</button>
        </label></div>
      <div id="spieldauer" class="space-x-1 space-y-1">
        <label>
          Spieldauer 🕘
        </label>
        <div v-for="(data, index) in dauer" :key="index" class="inline-block">
          <label
              v-bind:class="{
               tagBase: true,
               activeTag: data.active,
               inactiveTag: !data.active && !keineDauerGewaehlt,
             }"
          >
            <input type="checkbox" v-model="data.active">
            {{ data.text }}
          </label>
        </div>
      </div>
      <div id="kategorie" class="space-x-1 space-y-1">
        <div v-for="(data, index) in filterKategorien" :key="index" class="inline-block">
          <label
              v-bind:class="{
               tagBase: true,
               activeTag: selektierteKategorien[index],
               inactiveTag: !selektierteKategorien[index] && !keineKategorieGewaehlt,
             }"
          >
            <input type="checkbox" v-model="selektierteKategorien[index]">
            {{ index }} ({{ data }})
          </label>
        </div>
      </div>
      gefiltert auf {{ filterDauer.length }} Spiele<br>
      <!--      {{angezeigteSpieleAnzahl}}-->

      <div id="spiele" class="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">
        <Card :spiel="spiel" v-for="(spiel, index) in angezeigteSpiele" :key="spiel" :id="index" class="my-card"
              @click="navigate(spiel)">
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import {routeNames} from '@/router'
import {computed, reactive, ref} from "@vue/reactivity";
import Card from "@/components/Card";
import {onMounted, onUnmounted, watchEffect} from "@vue/runtime-core";
import {dauer, filter, filteredGames, renderedGames} from './SpielFilter'
import {useStore} from "vuex";
import {filterNachDauer, filterNachName, filterNachSpieler} from "@/components/FilterFunctions";
import {debounce} from "@/components/Util";

export default {
  setup() {


    let store = useStore();

    let zuBeginnAngezeigteSpiele = 24;
    let angezeigteSpieleAnzahl = reactive({zahl: zuBeginnAngezeigteSpiele});
    let resetAngezeigteSpiele = ()=> angezeigteSpieleAnzahl.zahl = zuBeginnAngezeigteSpiele

    let filterKategorien = computed(() => {
      if (store.state.spiele === null) {
        return {}
      }
      let spiele = store.state.spiele;
      let keys = Object.keys(spiele);
      let result = {}
      for(let key in spiele){
        result[key] = spiele[key].length
      }
      return result
    })

    watchEffect(() => {
      let importantTempVariablePromptingVueToActuallyDoAnything = filter.name;
      debounce(() => {
            filter.nameDebounced = importantTempVariablePromptingVueToActuallyDoAnything
            console.log("le debounce");
          }, 800
      )()
    });

    let selektierteKategorien = reactive({});
    let filterName = computed(() => {
      // let spiele = store === undefined ? [] : store.state.spiele
      if (store.state.spiele === null) {
        return []
      }
      let result = []
      let spiele = []
      let spiele1 = store.state.spiele;
      let kategorienToAdd = []
      for (let k in selektierteKategorien) {
        if (selektierteKategorien[k] === true) kategorienToAdd.push(k)
      }
      if (kategorienToAdd.length === 0) {
        for (let k in spiele1){
          spiele = spiele.concat(spiele1[k])
        }
      } else {
        for (let activeKategorie of kategorienToAdd) {
          spiele = spiele.concat(spiele1[activeKategorie])
        }
      }


      result = filterNachName(spiele, filter.nameDebounced);
      resetAngezeigteSpiele()
      return result
    })

    let filterSpieler = computed(() => {
      let result = filterNachSpieler(filterName.value, filter.spieler);
      resetAngezeigteSpiele()
      return result;
    })

    let filterDauer = computed(() => {
      let result = filterNachDauer(filterSpieler.value, dauer);
      resetAngezeigteSpiele()
      return result;
    })

    let scrolled = 0
    const handleScroll = () => {
      let condition = (window.innerHeight + window.scrollY + 50) >= document.body.offsetHeight;
      if (condition) {
        scrolled++
        angezeigteSpieleAnzahl.zahl = angezeigteSpieleAnzahl.zahl + 4
        // for (let i = 0; i < 3; i++) {
        //   let filteredGame = filteredGames.value[renderedGames.length + i];
        //   if (filteredGame !== undefined)
        //     renderedGames.push(filteredGame)
        // }
      }
    }
    let angezeigteSpiele = computed(() => filterDauer.value.slice(0, angezeigteSpieleAnzahl.zahl))
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    let keineDauerGewaehlt = computed(() => {
      for (let dauerElement of dauer) if (dauerElement.active) return false
      return true
    })
    let keineKategorieGewaehlt = computed(() => {
      for (let k in selektierteKategorien) {
        console.log("selektierteKategorien");
        let selektiert = selektierteKategorien[k];
        console.log(selektiert)
        if (selektiert) return false
      }
      return true
    })

    return {
      filter,
      dauer,
      filterDauer,
      filterKategorien,
      selektierteKategorien,
      angezeigteSpieleAnzahl,
      angezeigteSpiele,
      keineDauerGewaehlt,
      keineKategorieGewaehlt
    }
  },
  methods: {
    navigate(spiel) {
      this.$router.push({
        name: routeNames.dialog,
        params: {spielId: spiel.shortLink}
      })
    },
    neueDauer() {
    },
  },
  data: () => {
    return {
    }
  },
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
  border-color: lightgrey;
  background-color: #defcd8;

  user-select: none;
  -khtml-user-select: none;
  -o-user-select: none;
  -webkit-user-select: none;
}

.inactiveTag {
  border-color: lightgrey;
  background-color: snow;
}

.activeTag {
  border-color: green;
  background-color: #bffdb2;
}
</style>
