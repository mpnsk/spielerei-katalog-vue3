<template>
  <div class="bg-white flex">
    <div class="container flex-1">

      <img
          v-bind:data-srcset="imgSrcSet"
          alt="Bild läd.."
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
  },
  computed: {
    imgSrcSet() {
      const spiel = this.spiel
      const firstAttachment = spiel.attachments[0]
      if (firstAttachment === undefined) {
        console.log("no attachment:")
        console.log(spiel)
        return ""
      }
      const id = firstAttachment.id
      const name = firstAttachment.name
      let srcs = []
      for (let p of firstAttachment.previews) {
        srcs.push(process.env.VUE_APP_IMAGE_URL + "/" + id + "/" + p.w + "x" + p.h + "/" + p.id + "/" + name + " " + p.w + "w")
      }
      return srcs.join(', ')
    }
  }
}
</script>

<style scoped>


</style>
