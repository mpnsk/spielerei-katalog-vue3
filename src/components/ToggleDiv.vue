<template>
  <div>slot says:
    <slot>default</slot>
    , {{ activeClass }}
  </div>
</template>

<script>
export default {
  name: "ToggleDiv",
  data() {
    return {}
  },
  props: {
    activeClass: {
      type: String,
      default: 'default prop'
    }
  }
}
</script>

<style scoped>

</style>