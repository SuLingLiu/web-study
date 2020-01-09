<template>
  <!-- <div>detail {{$route.params.id}}</div> -->
  <!-- 如果路由设置了props: true 则可以直接用属性值来取动态路由 -->
  <div>detail {{id}}</div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>