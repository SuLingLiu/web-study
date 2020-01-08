<template>
  <div class="box">
    
  </div>
</template>

<script>
import create from "@/utils/create";
import Notice from "@/components/notice/LNotice.vue"
export default {
  props: {
    
  },
  data() {
    return {
      
    }
  },
  created() {
    const notice = create(Notice, {
      title: '你好',
      message: '你好',
      duration: 1000
    })
    notice.show();
  },
  methods: {
   
  }
}
</script>
  
<style scoped>


</style>