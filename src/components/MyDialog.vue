<template>
  <div>
          <div class="text-h6">{{spiel.name}}</div>

          <div class="row" >
            <div class="col-xs-12 col-md-3 ">
              <img
                :src="'/cover/'+spiel.name"
                style="max-width: 350px"
                alt="this is an image!"
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
      console.log('showObj: ' + showObj)
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
