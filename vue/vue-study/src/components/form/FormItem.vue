<template>
    <div>
      <label v-if="label">{{label}}</label>
      <slot></slot>
      <p v-if="errorMassage">{{errorMassage}}</p>
    </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,

    }
  },
  data() {
    return {
      errorMassage: ''
    }
  },

  mounted() {
    // this.$on('validate', this.validate) 不直接这样写是因为 this.validate();返回的是Promise，如果有错误，会警告
    this.$on('validate', () => {
      this.validate();
    })
  },

  methods: {
    validate() {
      //做校验
      const vaule = this.form.model[this.prop]
      const rules = this.form.rules[this.prop]
      //依赖 npm i async-validator -s
      const desc = {[this.prop]: rules};
      const schema = new Schema(desc);
      // return 的是校验结果的Promise
      return schema.validate({[this.prop]: vaule}, errors => {
        if(errors) {
          this.errorMassage = errors[0].message;
        }else {
          this.errorMassage = ''
        }
      })
    }
  }
}
</script>

<style scoped>

</style>