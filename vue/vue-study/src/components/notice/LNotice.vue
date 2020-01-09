<template>
  <div class="box" v-if="isShow">
    <h3>{{title}}</h3>
    <p class="box-content">{{message}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  data() {
    
    return {
      isShow: false
    }
  },
  methods: {
    show() {
      this.isShow = true;
      setTimeout(this.hide, this.duration)
    },
    hide() {
      this.isShow = false;
      this.remove();
    }
  }
}
</script>
  
<style scoped>
.box {
  position: fixed;
  width: 200px;
  top: 200px;
  left: 50%;
  margin-left: -100px;
  text-align: center;
  pointer-events: none;
  border: 1px solid #ddd;
  text-align: center;
}
.box-content {
  width: 200px;
  margin: 10px auto;
  font-size: 14px;
  border-radius: 3px;
  margin-bottom: 8px;
}

</style>