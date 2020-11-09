<template>
  <div class="bg-white flex">
    <div class="container flex-1">

      <img
          v-bind:data-src="spiel.coverUrl"
          alt="this is an image!"
          class="lazyload place-self-center object-center "
      />
    </div>
    <div class="p-5 flex-1">
      <h4>{{ spiel.name }}</h4>
      <div class="p-5">
        <div>{{ format(spiel.players) }} Spieler</div>
        <div>{{ format(spiel.duration) }} Minuten</div>
        <div>Alter {{ format(spiel.age) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import SpielFormat from "@/components/SpielFormat";

export default {
  name: "Card",
  props: ['spiel'],
  methods: {
    format: x => SpielFormat.display(x)
  }
}
</script>

<style scoped>


</style>
