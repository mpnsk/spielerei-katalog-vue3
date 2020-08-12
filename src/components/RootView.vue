<template>
  <div style="padding: 15px">
      <div class="row">
        <div class="col">
          <q-input v-model="filter.name" label="Spielname" />
        </div>
      </div>
    <div class="row">
        <div class="col">
<!--          <div class="desktop-only">-->
          <div>
            <label for="spieldauer-range">Spieldauer</label>
<!--            @change="val => { filter.dauer.slider = val }"-->
            <q-range
                     id="spieldauer-range"
                     v-model="filter.dauer.slider"
                     :min="filter.dauer.min"
                     :max="filter.dauer.max"
                     :step="filter.dauer.step"
                     lazy
                     label-always
                     markers
                     :left-label-value="filter.dauer.slider.min + ' Min'"
                     :right-label-value="filter.dauer.slider.max + ' Min'"
                     style="size: 90vh"
            />
          </div>
<!--          <div class="desktop-hide">-->
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <q-input type="number" :max="filter.dauer.slider.max" :min="filter.dauer.min" step="15" v-model="filter.dauer.slider.min" label="min"/>
            </div>
            <div class="col-sm-12 col-md-6">
              <q-input type="number" :min="filter.dauer.slider.min" :max="filter.dauer.max" step="15" v-model="filter.dauer.slider.max" label="max"/>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-range
            v-model="filter.spieler"
            :min="1"
            :max="12"
            label
            markers
            :right-label-value="filter.spieler.max < 12 ? filter.spieler.max : filter.spieler.max + '+' "

            style="size: 90vh"
          />
        </div>
    </div>
    <input type="radio" value="abc"> abc <br>
  <input type="checkbox">checky <br>
  <input type="text">
    <div class="row q-col-gutter-md">
      <div class="col-md-3" v-for="(spiel, index) in spiele" :key="index" :id="index">
        <q-card class="my-card" @click="navigate(index)">
          <img
            :src="'/cover/'+spiel.name"
            alt="this is an image!"
            loading="lazy"
            style="height: 150px"
          />
            <div class="absolute-bottom text-h6">
              {{spiel.name}}
            </div>
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-negative text-white">
                Cannot load image
              </div>
            </template>
          <q-card-section>
            Spieler: {{ spiel.spielerAnzahl }} Spieler <br>
            Dauer: {{spiel.dauer}} <br>
            Alter: {{spiel.mindestAlter}}
          </q-card-section>
        </q-card>

      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import spiele from '../assets/out.json'
import { routeNames } from '../router'

export default {
  // name: 'ComponentName',
  data () {
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
    logSomething () {
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    },
    navigate (index) {
      console.log(routeNames.user)
      this.$router.push({
        name: this.routeNames.user.dialog,
        params: { userId: index }
      })
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   if (to.name === routeNames.user.dialog && from.name === null) {
  //     console.log('let\'s not render this.')
  //     next(vm => (vm.deferList = true))
  //   }
  //   next()
  // },
  // beforeRouteUpdate (to, from, next) {
  //   if (
  //     to.name === routeNames.users &&
  //       from.name === routeNames.user.dialog &&
  //       this.deferList === true
  //   ) {
  //     console.log('now is the time to render')
  //     this.deferList = false
  //   }
  //
  //   next()
  // },
  // beforeRouteLeave (to, from, next) {
  //   next()
  // }
}
</script>
<style scoped>
  .my-card {
      height: 100%;
      max-width: 500px;
  }

    .my-card:hover {
        box-shadow: 1px 8px 20px grey;
        -webkit-transition: box-shadow .6s ease-in-out;
    }
</style>
