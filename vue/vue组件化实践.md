## 组件化
组件化是vue的核心思想，主要目的是为了代码重用。
### 组件通信
#### 父组件=>子组件
* 属性props
``` vue
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
``` vue
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
``` vue
//child
<div>
    <slot></slot>
</div>

//parent
<Child>hello</Child>
```
### 具名插槽
将内容分发到子组件指定位置
``` vue
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
``` vue
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
``` vue
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
## 组件双向数据绑定
1. v-model，用起来比.asyn好用，不过.asyn可以修改名字
``` vue
/ 父组件
<parent v-model="cart"></parent>

//子组件
props: {
	value: {
      type: String,
      default: ''
    },
    //还可以改变model的部分属性
	//model: {
		//prop: 'checked',
		//event: 'change'
	//}
},
methods:{
    add:function(){
        this.$emit('input', e.target.value)
    }
}

```
2. 组件中的.sync修饰符
``` vue
// 父组件
<parent :foo.sync="cart"></parent>

//子组件
props: ['foo'],

methods:{
    add:function(){
        this.$emit('update:foo', e.target.value);
    }
}
```

## 组件化实战
**实现Form、FormItem、Input**
**组件设置
> Form 理数据模型-model、校验规则-rules、全局校验方法-valiate
> > FormItem 显示标签-label、执行校验-prop和显示校验结果
> >
> > > Input 绑定数据模型-v-model、通知FormItem执行校验
>
> 注：需要考虑的几个问题？
> 
> 1. Input是自定义组件，它是怎么实现数据绑定的？
> 2. FormItem怎么知道何时执行校验，校验的数据和规则怎么得到？
> 3. Form怎么进行全局校验？它用什么办法把数据模型和校验规则传递给内部组件？

### 表单组件实现
* Input
	* 	双向绑定:@input、:value。v-model是语法糖，实现自定义组件双绑定需要指定:value和@input即可
	* 	派发校验事件
* 实现FormItem
	* 给Input预留插槽-slot
	* 能够展示label和校验信息
	* 能够进行校验
> 案例：'components/form/index.vue'
### 实现弹窗组件
弹窗这类组件的特点是它们在当前vue实例之外独立存在，通常挂载于body，它们是通过js动态创建的，不需要在任何组件中声明。常见使用姿势：
``` js
this.$create(Notice, {
	title: '标题',
	message: '提示信息',
	duration: 1000
}).show();
```
> 案例：'components/form/index.vue'
### 实现Tree组件
Tree 组件是典型的递归组件，其他的诸如菜单组件都是属于这一类

> 案例：'components/tree/index.vue'