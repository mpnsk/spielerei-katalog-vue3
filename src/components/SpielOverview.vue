<template>
  <div style="padding: 15px">

    <form class="form-example">
      <div class="form-example">
        <label for="spielerzahl"> Spielerzahl:</label>
<!--        <div id="spielerzahl">-->

<!--          <button class="p-1 " @click="filter.spieler&#45;&#45;">-</button>-->
          <input
              id="spielerzahl"
              type="number"
              :min="1"
              :max="12"
              v-model="filter.spieler"
          />
<!--          <button class="" @click="filter.spieler++">+</button>-->
<!--        </div>-->
      </div>
      <div class="form-example">
        <label for="spieldauer">Spieldauer 🕘</label>
<!--        <label for="email">Enter your emaill:</label>-->
<!--        <input type="email" name="email" id="email">-->
        <select name="spieldauer" id="spieldauer" multiple class="md:hidden" v-model="spieldauerselect">
          <option v-for="(data, index) in dauer" :key="index" :value="index">{{data.text}}</option>
        </select>
        <div class="space-x-1 space-y-1 md:visible invisible">
          <div v-for="(data, index) in dauer" :key="index" class="inline-block">
            <label
                v-bind:class="{
               tagBase: true,
               activeTag: spieldauerselect.includes(index),
               inactiveTag: !spieldauerselect.includes(index) && spieldauerselect.length > 0,
             }"
            >
              <input type="checkbox" :id="index + data.text" :value="index" v-model="spieldauerselect">
              {{ data.text }}
            </label>
          </div>
        </div>
      </div>
      <div class="form-example">
        <label for="spiel-kategorie">Spielkategorie</label>
        <div id="spiel-kategorie" class="space-x-1 space-y-1">
          <div v-for="(data, index) in categories" :key="index" class="inline-block">
            <label
                v-bind:class="{
               tagBase: true,
               activeTag: spieldauerselect.includes(index),
               inactiveTag: !spieldauerselect.includes(index) && !keineKategorieGewaehlt,
             }"
            >
              <input type="checkbox" v-model="selektierteKategorien[index]">
              {{ index }} ({{ data }})
            </label>
          </div>
        </div>
      </div>
    </form>


    <div v-if="games.length !== 0">
<!--      <div v-for="(data,index) in games" :key="index">#{{ index }}: {{ data }}</div>-->
    </div>
    <div id="filter" class="space-y-1">
<!--      <div id="spielname" class="">-->
<!--        <label>Titel-->
<!--          <input type="text"-->
<!--                 v-model="filter.name"/>-->
<!--        </label>-->
<!--      </div>-->
      <!--      {{angezeigteSpieleAnzahl}}-->

      <div id="spiele" v-if="games.length !== 0">
        <!--        <TableRow :spiel="spiel" v-for="(spiel, index) in theData._embedded.games" :key="spiel" :id="index" class="my-card"-->
        <!--              @click="navigate(index)">-->
        <!--        </TableRow>-->
        <table class="border-collapse w-full">
          <thead>
          <tr>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Titel
            </th>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Spieleranzahl
            </th>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Spieldauer
            </th>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                v-if="team">Actions
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              :spiel="spiel" v-for="(spiel, index) in games" :key="spiel" :id="index"

              class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span
                  class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Titel</span>
              {{ spiel.title }}
            </td>
            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
              <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Beschreibung</span>
              {{ spiel.description }}
            </td>
            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
              <span
                  class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Status</span>
              <span class="rounded bg-yellow-400 py-1 px-3 text-xs font-bold">inactive</span>
            </td>
            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                v-if="team">
              <span
                  class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
              <a href="#" class="text-blue-400 hover:text-blue-600 underline">Edit</a>
              <a href="#" class="text-blue-400 hover:text-blue-600 underline pl-6">Remove</a>
            </td>
          </tr>
          </tbody>
        </table>
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
import store from "@/store";
import TableRow from "@/components/TableRow";

export default {
  setup() {


    let store = useStore();

    let zuBeginnAngezeigteSpiele = 24;
    let angezeigteSpieleAnzahl = reactive({zahl: zuBeginnAngezeigteSpiele});
    let resetAngezeigteSpiele = () => angezeigteSpieleAnzahl.zahl = zuBeginnAngezeigteSpiele

    let filterKategorien = computed(() => {
      if (store.state.spiele === null) {
        return {}
      }
      let spiele = store.state.spiele;
      let keys = Object.keys(spiele);
      let result = {}
      for (let key in spiele) {
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
        for (let k in spiele1) {
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
        params: {spielId: spiel + 1}
      })
    },
    neueDauer() {
    },
  },
  data: () => {
    return {
      games: [],
      categories: {"abc": 1, "def":2},
      team: false,
      spieldauerselect: []
    }
  },
  components: {
    TableRow,
    Card
  },
  created() {
    fetch(new Request(process.env.VUE_APP_GAME_URL + "/games"))
        .then(response => response.json())
        .then(json => {
          this.games = json._embedded.games
        })
    // this.categories.push("abc", "def", "ghi")
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


form.form-example {
  display: table;
}
div.form-example {
  display: table-row;
}
label, input {
  display: table-cell;
  margin-bottom: 10px;
}
label {
  padding-right: 10px;
}

</style>
