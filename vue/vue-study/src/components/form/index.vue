<template>
  <div>
    <h3>Element表单</h3>
    <hr>
    <l-form :model="model" :rules="rules" ref="loginForm">
      <l-form-item label="用户名" prop="username">
        <l-input v-model="model.username" autocomplete="off" placeholder="请输入用户名"></l-input>
      </l-form-item>

      <l-form-item label="确认密码" prop="password">
        <!-- 
          子组件会继承父组件placeholder，会绑定到l-input组件的根元素上

         -->
        <l-input type="password" v-model="model.password" autocomplete="off" placeholder="请输入用密码"></l-input>
      </l-form-item>

      <l-form-item >
        <button @click="submitForm('loginForm')">提交</button>
      </l-form-item>
    </l-form>
    {{model}}
  </div>
</template>

<script>
import LForm from "./Form";
import LFormItem from "./FormItem";
import LInput from "./Input";
import create from "@/utils/create";
import Notice from "@/components/notice/LNotice.vue"

export default {
  data() {
    return {
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [{required: true, message: '请输入用户名'}],
        password: [{required: true, message: '请输入用密码'}],
      }
    }
  },
  components: {
    LForm,
    LFormItem,
    LInput
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        const notice = create(Notice, {
          title: '标题',
          message: valid ? '请求登录！' : '校验失败',
          duration: 1000
        })
        notice.show();
      })
    }
  }
}
</script>

<style scoped>

</style>