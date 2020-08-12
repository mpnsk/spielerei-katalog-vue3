<template>
  <div>
    <q-dialog v-model="fullWidth" full-width @hide="atHide" @before-show="atShow">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{spiel.name}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row" >
            <div class="col-xs-12 col-md-3 ">
              <q-img
                :src="'/cover/'+spiel.name"
                style="max-width: 350px"
              />
            </div>
            <div class="col-xs-12 col-md-6" style="padding: 15px">
              {{spiel.beschreibung}}
            </div>
            <div class="col-xs-12 col-md-3 ">
              <ul>
                <li>{{spiel.dauer}}</li>
                <li>{{spiel.mindestAlter}}</li>
                <li>{{spiel.spielerAnzahl}}</li>
              </ul>
            </div>
          </div>

        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import spiele from '../assets/out.json'
import { routeNames } from '../router'
export default {
  // name: 'ComponentName',
  data () {
    return {
      fullWidth: true,
      fullHeight: false,
      full: false,
      id: this.$route.params.userId,
      spiel: spiele[this.$route.params.userId]
    }
  },
  methods: {
    atShow (showObj) {
    },
    atHide (arg) {
      console.log('hiding' + arg)
      console.log(arg)
      this.$router.push({ name: routeNames.users })
    }
  },
  beforeRouteEnter (to, from, next) {
    next()
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>
