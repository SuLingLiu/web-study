<template>
    <div>
      <!-- v-bind="$attrs"相当于把父组件传递过来的属性，展开赋值，包括type="text" -->
      <input :value="value" @input="onInput" v-bind="$attrs"/>
    </div>
</template>

<script>
export default {
  inheritAttrs: false,//这个设置会false，会阻止继承父类的属性
  props: {
    value: {
      type: String,
      default: ''
    },
    //还可以改变model的部分属性，这样就可以用checked来传值，也可以改变事件名
    //model: {
      //prop: 'checked',
      //event: 'change'
    //}
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
      this.$parent.$emit('validate')
    }
  }
}
</script>

<style scoped>

</style>