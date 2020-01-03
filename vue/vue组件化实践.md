## 组件化
组件化是vue的核心思想，主要目的是为了代码重用。
### 组件通信
#### 父组件=>子组件
* 属性props
``` js
//child
props: {msg: String}

//parent
<HelloWorld msg="Hello" />
```
* 引用refs
``` js
<HelloWorld ref="hw" />

this.$refs.hw.xx

```
#### 子组件=>父组件：自定义事件
``` js
//child
this.$emit('add', good)

//parent
<Cart @add="cartAdd($event)"></Cart>
```
#### 兄弟组件：通过共同祖辈组件
通过共同的祖辈组件搭桥，$parent或$root。
``` js
//brother1
this.$parent.$on('foo', handle)
//broter2
this.$parent.$emit('foo')
```
#### 祖先和后代之间
由于嵌套层数过多，传递props不切实际，vue提供了provide/inject API完成该任务
* provide/inject：能够实现祖先给后代传值
``` js
//ancestor
provide() {
    return {foo: 'foo'}
}

// descendant
inject: [foo]
```
> 注意：provide和inject 主要为高阶插件/组件库提供用例。并不推荐直接用于应用性程序代码中我们更多会在开源组件库中见到。
>
>另外，反过来想要后代给祖先传值这种方案就不行了
* dispatch：后代给祖先传值
``` js
//定义一个dispatch方法，指定要派发事件名称和数据
function dispatch(eventName,data) {
    let parent = this.$parent;
    //只要还存在父元素就继续往上查找
    while(parent) {
        if(parent) {
            //父元素用$emit触发
            parent.$emit(eventName,data);
            //递归查找父元素
            parent = parent.$parent;
        }else {
            break;
        }
    }
}

// 使用
<h1 @click="dispatch('hello')">{{msg}}</h1>

//app.vue
this.$on('hello',this.sayHello)

```
#### 任意两个组件之间：事件总线或vuex
* 事件总线：创建一个Bus类负责事件派发、监听和回调管理
``` js
// Bus:事件派发、监听和回调管理
class Bus {
    constructor() {
        this.callbacks = {}
    }

    $on(name, fn) {
        this.callbacks[name] = this.callbacks[name] || []
        this.callbacks[name].push(fn)
    }
    $emit(name, args) {
        if(this.callbacks[name]) {
            this.callbacks[name].forEach(cb => cb(args))
        }   
    }
}

//main.js
Vue.prototype.$bus = new Bus()

//child1
this.$bus.$on('foo', handle)

//child2
this.$bus.$emit('foo')
```
> 实践中可以用new Vue()替代new Bus(),因为它已经实现了相应功能

* vuex：创建唯一的全局数据管理者store，通过它管理数据并通知组件状态变更


## 插槽
插槽语法是Vue实现的内容分发API，用于复合组件开发。该技术在通用组件库开发中有大量应用。
### 匿名插槽
``` js
//child
<div>
    <slot></slot>
</div>

//parent
<Child>hello</Child>
```
### 具名插槽
将内容分发到子组件指定位置
``` js
//child
<div>
    <slot></slot>
    <slot name="content"></slot>
</div>

//parent
<Child>
    <!-- 默认插槽用default做参数 -->
    <template v-slot:default> 具名插槽</template>
    <!-- 具名插槽用插槽名做参数 -->
    <template v-slot:content> 内容</template>
</Child>
```

### 作用域插槽
分发内容要用到子组件中的数据
``` js
//child
<div>
    <slot :foo="foo"></slot>
</div>

//parent
<Child>
  <!-- 把v-slot的值指定为作用域上下文对象 -->
  <template v-slot:default="ctx"> 
    来自子组件数据：{{ctx.foo}}
  </template>
</Child>
```

## 递归组件
递归组件是可以在它们组件模板中调用自身的组件。不是很常用
``` js
//Node
<template>
  <div>
    <h3>{{data.title}}</h3>
    <!-- 必须要有结束条件,否则会死循环 -->
    <Node v-for="d in data.children" :key="d.id" :data="d"></node>
  </div>
</template>

<script>
export default {
  name: 'Node',//name对其它组件不是必须的，但是对递归组件是必要的
  props: {
    data: {
      type: Object,
      require: true
    }
  }
}
</script>

//使用
<Node :data="{id: '1', title:'递归组件', children:[{……}]}"></Node>
```

