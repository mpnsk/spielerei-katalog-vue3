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
          <option v-for="(data, index) in dauer" :key="index" :value="index"
                  v-bind:class="{
               // tagBase: true,
               backgroundColorDEFCD8: spieldauerselect.length === 0,
               activeTag: spieldauerselect.includes(index),
               inactiveTag: !spieldauerselect.includes(index) && spieldauerselect.length > 0,
          }">
            {{ data.text }}
          </option>
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
          <!--          -->
          <!--          <div v-for="(data, index) in categories" :key="index" class="inline-block">-->
          <!--            <label-->
          <!--                v-bind:class="{-->
          <!--               tagBase: true,-->
          <!--               activeTag: spieldauerselect.includes(index),-->
          <!--               inactiveTag: !spieldauerselect.includes(index) && !keineKategorieGewaehlt,-->
          <!--             }"-->
          <!--            >-->
          <!--              &lt;!&ndash;              <input type="checkbox" v-model="selektierteKategorien[index]">&ndash;&gt;-->
          <!--              {{ index }} ({{ data }})-->
          <!--            </label>-->
          <!--          </div>-->
        </div>
      </div>
    </form>


    <div id="filter" class="space-y-1">
      <!--      <div id="spielname" class="">-->
      <!--        <label>Titel-->
      <!--          <input type="text"-->
      <!--                 v-model="filter.name"/>-->
      <!--        </label>-->
      <!--      </div>-->
      <!--      {{angezeigteSpieleAnzahl}}-->
      <div id="spiele" v-if="true">
        <table class="border-collapse w-full" id="spiele-tabelle">
          <thead>
          <tr>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Titel
            </th>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Spieleranzahl
            </th>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Spieldauer in Minuten
            </th>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Altersempfehlung
            </th>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Leihpreis
            </th>
            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                v-if="team">
              Actions
            </th>
          </tr>
          </thead>
          <tbody>
          <!--          <template-->
          <!--              :spiel="spiel" v-for="(spiel, index) in spiele" :key="spiel" :id="index"-->
          <!--          >-->
          <template v-for="(spiel, i1) in spieleFlat" :key="i1">
            <!--              <router-link :to="{name:'spiel', params:{kategorie: spiel.kategorie}}"-->
              <tr
                  class="bg-white hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0
    even-blue
">
                <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span
                  class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Titel</span>
                  <router-link to="/">
                    {{ spiel.name }}
                  </router-link>
                </td>
                <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Spieleranzahl</span>
                  {{ formatSpieleranzahl(spiel) }}
                </td>
                <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Spieldauer in Minuten</span>
                  {{ formatSpieldauer(spiel) }}
                </td>
                <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Altersempfehlung</span>
                  {{ formatAltersempfehlung(spiel) }}
                </td>
                <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Leihpreis</span>
                  {{ formatLeihpreis(spiel) }}
                </td>
                <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                    v-if="team">
              <span
                  class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                  <a href="#" class="text-blue-400 hover:text-blue-600 underline">Edit</a>
                  <a href="#" class="text-blue-400 hover:text-blue-600 underline pl-6">Remove</a>
                </td>
              </tr>
          </template>
          <!--            <tr-->
          <!--                class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">-->
          <!--              <td colspan="5"-->
          <!---->
          <!--                  class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">-->
          <!--                {{ spiel.description }}-->
          <!--              </td>-->
          <!--            </tr>-->
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

export default {
  props: ['spiele', 'kategorie'],
  setup() {


    /*
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

     */

    return {
      filter,
      dauer,
      // filterDauer,
      // filterKategorien,
      // selektierteKategorien,
      // angezeigteSpieleAnzahl,
      // angezeigteSpiele,
      // keineDauerGewaehlt,
      // keineKategorieGewaehlt
    }
  },
  methods: {
    navigate(spiel) {
      this.$router.push({
        name: routeNames.dialog,
        params: {spielId: spiel + 1}
      })
    },
    formatSpieldauer(spiel) {
      if (spiel.spieldauerTyp === null)
        return ''
      if (spiel.spieldauerTyp === 'Einwert') {
        if (spiel.spieldauerMinutenMin === 0 && spiel.spieldauerMinutenMax === 0) {
          const thinkingEmoji = '🤔';
          return thinkingEmoji
        }
        return spiel.spieldauerMinutenMin
      }
      if (spiel.spieldauerTyp === 'MinMax')
        return spiel.spieldauerMinutenMin + ' bis ' + spiel.spieldauerMinutenMax
      if (spiel.spieldauerTyp === 'ProSpieler')
        if (spiel.spieldauerMinutenMax === 0)
          return spiel.spieldauerMinutenMin + ' pro Spieler'
        else
          return spiel.spieldauerMinutenMin + ' bis ' + spiel.spieldauerMinutenMax + ' pro Spiele'
    },
    formatAltersempfehlung(spiel) {
      if (spiel.altersempfehlung !== 0) return spiel.altersempfehlung
      if (spiel.altersempfehlungMax !== 0) return spiel.altersempfehlung - spiel.altersempfehlungMax
      return ''
    },
    formatSpieleranzahl(spiel) {
      if (spiel.spieleranzahlMin === 0 || spiel.spieleranzahlMax === 0)
        return ''
      if (spiel.spieleranzahlMax === 99)
        return spiel.spieleranzahlMin + '+'
      return spiel.spieleranzahlMin + ' - ' + spiel.spieleranzahlMax

    },
    formatLeihpreis(spiel) {
      if (spiel.leihpreis !== 0)
        return spiel.leihpreis + '€'
      return ''
    }

  },
  data: () => {
    return {
      games: [],
      categories: {"abc": 1, "def": 2},
      team: false,
      spieldauerselect: []
    }
  },
  computed: {
    bezifferteKategorien() {
      return this.kategorien
    },
    spieleFlat(){
      let spiele = []
      if (this.kategorie == null) return []
      // for(const [key,value]  in this.kategorien){
      //  console.log(key)
      //   console.log(value)
      // }

      const values = Object.values(this.kategorie);
      values.forEach(v => {
        v.forEach(s=>{
          spiele.push(s)
        })
      });
      //   // console.log(`${k}: ${kategorien[k]}`);
      //   for (const s in kategorien[k]) {
      //     console.log("k.s", kategorien[k[s]]);
      //   }
      // }

      return spiele
    }
  },
  components: {
    Card
  },
  created() {
    // console.log("created.spiele", this.spiele)
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

.backgroundColorDEFCD8 {
  background-color: #defcd8;
}

.even-blue:nth-child(even) {
  /*background-color: blue;*/
}
</style>
