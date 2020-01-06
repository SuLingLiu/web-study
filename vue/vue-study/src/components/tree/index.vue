<template>
  <div>
    <ul>
      <LTreeItem class="item" :model="treeData"></LTreeItem>
    </ul>
  </div>
</template>

<script>
import LTreeItem from "./LTreeItem";
export default {
  components: {
    LTreeItem
  },
  data() {
    return {
      treeData: {
        title: 'WEB全栈架构师',
        children: [
          {
            title: "Java架构师"
          },
          {
            title: "JS高级",
            children: [
              {
                title: "ES6",
              },
              {
                title: '动效'
              }
            ]
          }

        ]
      }
    }
  }
}
</script>

<style scoped>

</style>