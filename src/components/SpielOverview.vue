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
               inactiveTag: !data.active,
             }"
          >
            <input type="checkbox" v-model="data.active">
            {{ data.text }}
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
            <input type="checkbox" v-model="data.active">
            {{ data.text }}
          </label>
        </div>
      </div>
      {{ filterDauer.length }}<br>

      <div id="spiele" class="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">
        <Card :spiel="spiel" v-for="(spiel, index) in filterDauer" :key="spiel" :id="index" class="my-card"
              @click="navigate(spiel)">
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import {routeNames} from '@/router'
import {computed, reactive} from "@vue/reactivity";
import Card from "@/components/Card";
import {onMounted, onUnmounted, watchEffect} from "@vue/runtime-core";
import {dauer, filter, filteredGames, renderedGames} from './SpielFilter'
import {useStore} from "vuex";
import {filterNachDauer, filterNachName, filterNachSpieler} from "@/components/FilterFunctions";
import useDebounce from "@/components/useDebounce";
import {debounce} from "@/components/Util";

export default {
  setup() {
    let store = useStore();


    let unoCount = arr => {
      let unos = arr.filter(({name}) => name.toLowerCase().includes("uno"));
      let length = unos.length;
      console.log("uno count " + length);
      return length
    }

    watchEffect(() => {
      console.log("fitler.name " + filter.name);
      console.log("filter.nameDebounced" + filter.nameDebounced);
      debounce(() => {
            filter.nameDebounced = filter.name
          }, 800
      )()
    });

    let filterName = computed(() => {
      let spiele = store === undefined ? [] : store.state.spiele
      let result = filterNachName(spiele, filter.nameDebounced);
      unoCount(result)
      return result
    })

    let filterSpieler = computed(() => {
      let result = filterNachSpieler(filterName.value, filter.spieler);
      unoCount(result)
      return result;
    })

    let filterDauer = computed(() => {
      let result = filterNachDauer(filterSpieler.value, dauer);
      unoCount(result)
      return result;
    })

    let scrolled = 0
    const handleScroll = () => {
      let condition = (window.innerHeight + window.scrollY + 50) >= document.body.offsetHeight;
      if (condition) {
        scrolled++
        for (let i = 0; i < 3; i++) {
          let filteredGame = filteredGames.value[renderedGames.length + i];
          if (filteredGame !== undefined)
            renderedGames.push(filteredGame)
        }
      }
    }
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
    return {
      filter,
      dauer,
      filterDauer,
    }
  },
  methods: {
    navigate(spiel) {
      this.$router.push({
        name: routeNames.dialog,
        params: {spielId: spiel.name}
      })
    },
    neueDauer() {
    },
  },
  data: () => {
    return {
      angezeigteSpiele: []
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
