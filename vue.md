[vue-cli](<a href='#vue-cli'></a>)

#### vue-cli
- 开启eslint： index.js -> useEslint: true
- 修改反向代理 端口号：index.js -> host, port


#### 生命周期
- Vue.use 使用vue插件
- beforecreate : 举个栗子：可以在这加个loading事件
- created ：在这结束loading，还做一些初始化，实现函数自执行
- mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情
- beforeDestroy： 你确认删除XX吗？ destroyed ：当前组件已被删除，清空相关内容

- DOM操作的js代码放进Vue.nextTick()的回调函数中
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
###### 核心概念
- `state` 单一状态树，作为唯一数据源存在 (不同组件使用统一的数据源)。可用函数：`mapState`
- `Getter` 感觉类似computed, 但是不同组件可以同时使用
- `mutation` 类似事件，修改store中状态的唯一方法
- `action` Action 类似于 mutation，不同在于：Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。
- `Module` 可以将将 store 分割成模块

###### 项目结构
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
