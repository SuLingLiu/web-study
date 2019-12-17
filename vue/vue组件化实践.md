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

```
