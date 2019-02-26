##### [项目结构](https://docs.cocos.com/creator/manual/zh/getting-started/project-structure.html)

```js
ProjectName（项目文件夹）
├──assets
├──library
├──local
├──settings
├──temp
└──project.json
```

##### [生命周期](https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html)

**onLoad**

**start**

`start` 回调函数会在组件第一次激活前，也就是第一次执行 `update` 之前触发。`start` 通常用于初始化一些中间状态的数据，这些数据可能在 update 时会发生改变，并且被频繁的 enable 和 disable。

**update**

游戏开发的一个关键点是在每一帧渲染前更新物体的行为，状态和方位。这些更新操作通常都放在 `update`回调中。

**lateUpdate**

`update` 会在所有动画更新前执行，但如果我们要在动效（如动画、粒子、物理等）更新之后才进行一些额外操作，或者希望在所有组件的 `update` 都执行完之后才进行其它操作，那就需要用到 `lateUpdate` 回调。