<template>
  <article class="overflow-hidden rounded-lg shadow-lg w-full">

<!--      <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random">-->
      <img
          data-sizes="auto"
          v-bind:data-srcset="imgSrcSet"
          alt="Bild läd.."
          class="lazyload place-self-center object-center"
      />

    <header class="flex items-center justify-between leading-tight p-2 md:p-4">
      <h1 class="text-lg">
        <a class="no-underline hover:underline text-black" href="#">
<!--          Article Title-->
          {{spiel.name}}
        </a>
      </h1>
      <p class="text-grey-darker text-sm">
        14/4/19
      </p>
    </header>

    <footer class="flex items-center justify-between leading-none p-2 md:p-4">
      <a class="flex items-center no-underline hover:underline text-black" href="#">
        <img alt="Placeholder" class="block rounded-full" src="https://picsum.photos/32/32/?random">
        <p class="ml-2 text-sm">
          {{spiel.title}}
        </p>
      </a>
      <a class="no-underline text-grey-darker hover:text-red-dark" href="#">
        <span class="hidden">Like</span>
        <i class="fa fa-heart"></i>
      </a>
    </footer>

  </article>
  {{spiel}}







<!--  <div class="bg-white flex">-->
<!--    <div class="container flex-1">-->

<!--      <img-->
<!--          data-sizes="auto"-->
<!--          v-bind:data-srcset="imgSrcSet"-->
<!--          alt="Bild läd.."-->
<!--          class="lazyload place-self-center object-center "-->
<!--      />-->
<!--    </div>-->
<!--    <div class="p-5 flex-1">-->
<!--      <h4>{{ spiel.name }}</h4>-->
<!--      <div class="p-5">-->
<!--        <div>{{ format(spiel.players) }} Spieler</div>-->
<!--        <div>{{ format(spiel.duration) }} Minuten</div>-->
<!--        <div>Alter {{ format(spiel.age) }}</div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
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
    // imgSrcSet() {
    //   const spiel = this.spiel
      // const firstAttachment = spiel.attachments[0]
      // if (firstAttachment === undefined) {
      //   console.log("no attachment:")
      //   console.log(spiel)
      //   return ""
      // }
      // const id = firstAttachment.id
      // const name = firstAttachment.name
      // let srcs = []
      // for (let p of firstAttachment.previews) {
      //   srcs.push(process.env.VUE_APP_IMAGE_URL + "/" + id + "/" + p.w + "x" + p.h + "/" + p.id + "/" + name + " " + p.w + "w")
      // }
      // return srcs.join(', ')
    // }
  }
}
</script>

<style scoped>
img[data-sizes="auto"] { display: block; width: 100%; }

</style>
