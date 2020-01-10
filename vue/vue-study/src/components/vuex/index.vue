<template>
  <div>
    {{$store.state.count}}
    <p>{{$store.getters.score}}</p>

    <button @click="add">加1</button>
    <button @click="addAsync">再接再励</button>
  </div>
</template>

<script>
export default {
  methods: {
    add() {
      this.$store.commit("increment")
    },
    addAsync() {
      this.$store.dispatch("incrementAsync")
    }
  }
}
</script>

<style>

</style>