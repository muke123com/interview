## vue

[TOC]

#### 技术
- vue-router：为单页面应用提供的路由系统，使用了 Lazy Loading Routes 技术来实现异步加载优化性能

- vuex：Vue 集中状态管理，在多个组件共享某些状态时非常便捷

- vue-lazyload：实现图片懒加载，节省用户流量，优化页面加载速度

- vue-axios：用来请求后端 API 

- better-scroll：解决移动端各种滚动场景需求的插件，使移动端滑动体验更加流畅

- NeteaseCloudMusicApi：网易云音乐 NodeJS 版 API，提供音乐数据其他工具

- vue-cli：Vue 脚手架工具，快速初始化项目代码

- eslint：代码风格检查工具，帮助我们规范代码书写（一定要养成良好的代码规范）

- fastclick ：消除 300ms 的延迟

  ```js
  Vue.config.silent   // 取消vue日志警告
  ```

#### 基础问题
- 开启eslint： `index.js -> useEslint: true`

- 修改反向代理 端口号：`index.js -> host, port`

- 路由children 需要` <router-view></router-view>`

- 事件修饰符 `.stop .prevent .capture .self .once`

- 事件传参 `@click="f($event)"`

- 修改css loader   `index.js-> exports.cssLoaders` 中修改

- js中使用静态文件`require("@/assets/logo.png")`

- 图片显示403：`<meta name="referrer" content="no-referrer"/>`

- Vue 不能检测以下变动的数组： 
  - ① 当你利用索引直接设置一个项时，vm.items[indexOfItem] = newValue
  - ② 当你修改数组的长度时，例如： vm.items.length = newLength

- ```js
  // 监听json内数据变化
  watch: {
      prop: {
          handle(oldValue,newValue){},
          deep: true
      }
  } 
  ```

+ 锚点跳转 `this.$el.querySelector(selector).scrollIntoView();`   


#### 生命周期
- Vue.use 使用vue插件
- beforecreate : 举个栗子：可以在这加个loading事件
- created ：在这结束loading，还做一些初始化，实现函数自执行
- mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情
- beforeDestroy： 你确认删除XX吗？ destroyed ：当前组件已被删除，清空相关内容

- vue DOM渲染完成后的操作代码放进Vue.nextTick()的回调函数中
```js
export default {
      name: 'lifecycle',
      data(){
        return {
          msg: 'life'
        }
      },
      beforeCreate(){
        console.log('beforeCreate=================>');
        console.log('%c%s', "color:red","el:"+this.$el);
        console.log('%c%s', "color:red","data:"+this.$data);
        console.log('%c%s', "color:red","msg:"+this.msg);

      },
      created(){
        console.log('created=================>');
        console.log('%c%s', "color:red","el:"+this.$el);
        console.log('%c%s', "color:red","data:"+this.$data);
        console.log('%c%s', "color:red","msg:"+this.msg);
      },
      beforeMount(){
        console.log('beforeMount=================>');
        console.log('%c%s', "color:red","el:"+this.$el);
        console.log('%c%s', "color:red","data:"+this.$data);
        console.log('%c%s', "color:red","msg:"+this.msg);
      },
      mounted(){
        console.log('mounted=================>');
        console.log('%c%s', "color:red","el:"+this.$el);
        console.log('%c%s', "color:red","data:"+this.$data);
        console.log('%c%s', "color:red","msg:"+this.msg);
      },
      beforeUpdate(){
        console.log('beforeUpdate=================>');
        console.log('%c%s', "color:red","el:"+this.$el);
        console.log('%c%s', "color:red","data:"+this.$data);
        console.log('%c%s', "color:red","msg:"+this.msg);
      },
      updated(){
        console.log('updated=================>');
        console.log('%c%s', "color:red","el:"+this.$el);
        console.log('%c%s', "color:red","data:"+this.$data);
        console.log('%c%s', "color:red","msg:"+this.msg);
      },
      beforeDestroy(){
        console.log('beforeDestroy=================>');
        console.log('%c%s', "color:red","el:"+this.$el);
        console.log('%c%s', "color:red","data:"+this.$data);
        console.log('%c%s', "color:red","msg:"+this.msg);
      },
      destroyed(){
        console.log('destroyed=================>');
        console.log('%c%s', "color:red","el:"+this.$el);
        console.log('%c%s', "color:red","data:"+this.$data);
        console.log('%c%s', "color:red","msg:"+this.msg);
      },
      methods: {
        change(){
          console.log(1, this.$el.textContent);
          this.msg = 256;
          console.log(2, this.$el.textContent);
          this.$nextTick(function () {
            console.log(3, this.$el.textContent);
          })
        },
        destroy(){
          this.$destroy();
        }
      }
    }
```

#### Vuex
![Image text](img/vuex.png)
> 管理全局共享数据
##### 核心概念
- `state` 单一状态树，作为唯一数据源存在 (不同组件使用统一的数据源)。
- `Getter` 获取数据
- `mutation` 修改store中状态的唯一方法
- `action` Action 类似于 mutation，不同在于：Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。
- `Module` 可以将将 store 分割成模块

- `mutation` 通过 `store.commit` 触发
- `action` 通过 `store.dispatch` 触发

`computed`=>`mapState`,`mapGetters`
`methods`=>`mapMutations`,`mapActions`

```js
...mapState({
    msg: state=>state.test.msg
}),
...mapGetters(['test_arr']),
...mapMutations(['test_mutations','change_title']),
...mapActions(['test_actions']),
```

##### 项目结构
- 应用层级的状态应该集中到单个 `store` 对象中。
- 提交 `mutation` 是更改状态的唯一方法，并且这个过程是同步的。
- 异步逻辑都应该封装到 `action` 里面。 


```
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
        
```



#### 组件传值



![Image text](img/parent-child.png)

#### axios

```js
// axios
axios.get(url,options).then()
axios.post(url,options).then()
///////////////////////////////////////////////
axios.all([fn1(), fn2()])
  .then(axios.spread(function (acct, perms) {
    // 所有请求完成后触发
  }));
///////////////////////////////////////////////
axios({
  method:'get',
  params: {},  //get为params, post为data
  url:'http://bit.ly/2mTM3nY',
  responseType:'stream'
})
  .then(function(response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});
```

#### vue-router

**router-view**

正常写法中，一层路径(`/xxx`)对应一个`router-view`。

比如url: /a/b/c (假设a、b、c都为正常路径，不会作为参数)

- 那`/a`对应的就是App.vue中的router-view，`/a`进入`a.vue`中
- 那`/a/b`对应的就是a.vue中的router-view， `/a/b`进入`b.vue`中

以此类推。

**router-link**

```vue
<router-link tag="li" v-for="(item, key) in list" :key="item['id']" :to="{path: ''+item['id'] }"></router-link>
```

#### vue transition

1. `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`: **2.1.8版及以上** 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
4. `v-leave`: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`: **2.1.8版及以上** 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

`v-` 是这些类名的默认前缀。如果你使用了 `<transition name="my-transition">`，那么 `v-enter` 会替换为 `my-transition-enter`。

