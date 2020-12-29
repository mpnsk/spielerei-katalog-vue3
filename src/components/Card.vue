<template>
  <div class="bg-white flex">
    <div class="container flex-1">

      <img
          data-sizes="auto"
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
      const id = firstAttachment.id
      const name = firstAttachment.name
      console.log(firstAttachment)
      let srcs = []
      for (let p of firstAttachment.previews) {
        srcs.push("http://409b50da-f0a5-40b4-9076-6f3b88346cf3.pub.instances.scw.cloud:8082/" + id + "/" + p.w + "x" + p.h + "/" + p.id + "/" + name + " " + p.w + "w")
      }
      const srcSet = srcs.join(',');
      console.log(srcSet);
      return srcSet
    }
  }
}
</script>

<style scoped>


</style>
