> **关键字：**Tensorflow，JavaScript，AI，前端开发，人工智能，神经网络，遗传算法

<iframe frameborder="0" allowfullscreen="" src="https://www.zhihu.com/video/968804348780785664?autoplay=false&amp;useMSE=" style="display: block; width: 688px; height: 387px;"></iframe>



------

## **先上最终效果**

T-Rex Runner 是隐藏在 Chrome 中的彩蛋游戏，最近我用刚推出的 [TensorFlow.js](https://link.zhihu.com/?target=https%3A//js.tensorflow.org/) 开发了一个完全独立运行于浏览器环境下的 AI 程序，如下图所示 AI 可以轻松控制暴龙（T-Rex）避开障碍物。

![img](https://pic4.zhimg.com/v2-869a0200023c3f02656ea0bc3c3cbc27_b.jpg)

AI 在尝试 3 次后逐渐学会了如何控制暴龙避让障碍物



![img](https://pic4.zhimg.com/v2-350b940f47956ce138f18ca3c4a2e3cb_b.jpg)

引入遗传算法后，尝试 2 次后 AI 即可学会控制



**查看在线演示**

- **神经网络版** - 仅支持 Chrome 桌面版
- **遗传算法 + 神经网络** - 仅支持 Chrome 桌面版

**下载或收藏我在 Github 上的源代码**

- [MagicCube/t-rex-run](https://link.zhihu.com/?target=https%3A//github.com/MagicCube/t-rex-run)



------

## **概述**

## 关于 T-Rex Runner 彩蛋游戏

作为 Chrome 浏览器死忠，你或许早已发现隐藏在 Chrome 浏览器“无法连接到互联网”报错页面中的彩蛋“T-Rex Runner”游戏。

![img](https://pic2.zhimg.com/80/v2-f5f7084bf36a80fee22de6c37d4cb8f1_720w.jpg)

如果你还没有玩儿过 T-Rex Runner，可以按照下面几个步骤开启彩蛋：

1. 打开 Chrome 浏览器，在地址栏输入 chrome://dino，然后回车；
2. 你将会看到上面的报错界面，但是还处于静止状态，不要怕这就是彩蛋的入口；
3. 敲击空格键，开始游戏吧！

你的任务就是在不碰到仙人掌和空中的翼龙的情况下保持前行，坚持的时间越久则分数越高，难度也随之越来越大。



## 关于 TensorFlow.js

![img](https://pic3.zhimg.com/80/v2-2dfbfbd77599cf0b7aca8ccf9dabeb36_720w.jpg)

作为深度学习界的当红炸子鸡——TensorFlow 开源组织终于在 2018 年 3 月推出了首个 [JavaScript 版本](https://link.zhihu.com/?target=https%3A//github.com/tensorflow/tfjs)。TensorFlow.js 可以在浏览器端完成模型训练、执行和再训练等基本任务，并且借助 WebGL 技术，可以和 Python、C++ 版本一样能够通过 GPU 硬件加速完成计算过程。

目前网上关于 TensorFlow.js 的教程寥寥无几，基本上就是官方示例的解析，本文希望能从实例出发，给大家补充一些学习的动力！



## 关于本文

本文的目标是基于 TensorFlow.js 在浏览器端构建人工神经网络，通过反复训练让 AI 学会如何控制暴龙成功避开障碍物。本文的结构如下：

1. **改造游戏程序**：介绍游戏核心代码逻辑，用 ES6 等技术栈重构游戏代码，并引入全新的游戏生命周期事件。
2. **实现算法模型**：重点介绍如何实现基于人工神经网络的 AI 算法模型。
3. **集成算法模型**：将算法模型与游戏进行集成。
4. **优化算法模型**：通过增加 AI 玩家和暴龙的个数，我们无需改动算法模型，即可轻松提升机器学习效率。
5. **总结**



------

## **1. 改造游戏程序**

## 1.1 用现代化前端技术栈重构

T-Rex Runner 的源代码可以在 [Chromium 的代码仓库](https://link.zhihu.com/?target=https%3A//cs.chromium.org/chromium/src/components/neterror/resources/offline.js%3Fq%3Dt-rex%2Bpackage%3A%255Echromium%2524%26dr%3DC%26l%3D7)中找到，但是这个小游戏是在 2014 年编写的，使用的都是 ES5 时代的技术，更糟糕的是由于缺少模块化，整个游戏的源代码都放在[同一个文件中](https://link.zhihu.com/?target=https%3A//cs.chromium.org/chromium/src/components/neterror/resources/offline.js%3Fq%3Dt-rex%2Bpackage%3A%255Echromium%2524%26dr%3DC%26l%3D7)，这很大程度上增加了理解和修改源代码的难度。

因此，我先花了一个下午的时间，用 ES6/ES7 + LESS + Webpack 等现代化前端技术栈重写了 t-rex-runner 项目，并且引入 ESLint 来保障代码质量。

除此外，我还移除了声效、鼠标控制、移动端支持和 GameOver 画面等相关代码，并且为了后面运用遗传算法，我还为游戏加入了多人模式（Multiplayer Mode，即游戏中同一局，有多只暴龙同时出现）。

有关代码已上传至 [Github](https://link.zhihu.com/?target=https%3A//github.com/MagicCube/t-rex-run)，详细请见 [src/game](https://link.zhihu.com/?target=https%3A//github.com/MagicCube/t-rex-run/tree/master/src/game) 目录中。



## 1.2 游戏核心代码

t-rex-runner 是一个非常标准的面向对象编程游戏程序，事实上你也可以将它作为 HTML5 游戏开发入门的经典示例。重构后的 t-rex-runner 项目，主要包含以下类型：

![img](https://pic1.zhimg.com/80/v2-3152173848db1408d94e2a1d1ae59e80_720w.jpg)

- **Runner 类**：这是游戏的核心，掌管整个游戏的生命周期，主要类成员包括：

- - **currentSpeed 属性**：表示当前游戏速度，玩家坚持的时间越长速度就越快，速度越快难度越高。
  - **init() 方法**：负责根据 config 参数初始化 `Canvas`、`Horizon`、`DistanceMeter`、`TRexGroup` 等类的实例，并且首次触发 `restart()` 和 `update()` 。
  - **restart() 方法**：重置所有运行时参数，重新启动全新一局游戏。
  - **update() 方法**：刷新并重绘当前帧，通过 `requestAnimationFrame()` 调用，大约为 60 帧每秒（由 [Runtime.getFPS()](https://link.zhihu.com/?target=https%3A//github.com/MagicCube/t-rex-run/blob/master/src/game/RuntimeConfig.js) 方法决定）。



- **Trex 类**：代表一只 T-Rex，即暴龙，主要类成员包括：

- - **jumping 属性**：表示当前暴龙是否已经处于跳跃状态（跳起、跳跃中或落地中等均为 `true`）。
  - **reset() 方法**：重置暴龙的所有参数，由 `Runner.restart()` 在游戏重启前调用
  - **startJump() 方法**：控制暴龙起跳，用于躲避仙人掌。
  - **setDuck() 方法**：控制暴龙匍匐前进，用于躲避低空飞行的翼龙。



- **TrexGroup 类**：代表包含 n 个暴龙的种群，这在原先代码中是没有的，之所以要有种群的概念是为了支持多玩家模式，即同时有 n 只暴龙以各自独立的方式玩同一局游戏。除拥支持 Trex 类大多数方法外，还包括：

- - **lives() 方法**：获取当前种群中活着的暴龙数量。



- **Obstacle 类**：代表障碍物，例如各种高度、宽度的仙人掌和空中的翼龙等，主要类成员包括：

- - type 属性：表示当前障碍物类型，包括仙人掌（CACTUS_SMALL / CACTUS_LARGE）和翼龙（PTERODACTYL）等。
  - width 和 height 属性：表示障碍物的大小。
  - xPos 和 yPos 属性：表示障碍物的位置。



除以上核心类型外，其他还包括：

- **Horizon 类**：代表整个游戏舞台背景或称场景，熟悉游戏开发的同学一定知道它类似于很多框架中 stage / scene / background 概念，在本游戏中包含云、星星、月亮和最重要的障碍物 Obstacles。
- **HorizonLine 类**：代表地平线，坑洼不平的路面有助于人推到出当前“速度”。
- **CollisionBox 类**：代表一个矩形，通常一个 Trex 或 Obstacle 可以用若干个矩形组成一个近似多边形，用于计算多边形碰撞。
- **Cloud 类**：代表云朵，这是为了将来做计算机图像识别时，做干扰项用。
- **DistanceMeter 类：**代表右上角的距离仪表。
- **ImageSprite 模块**：经典的 Sprite 贴图。
- **constants 模块**：用于存储游戏的默认配置参数。
- **utils 模块**：包含了常用的工具方法。



## 1.3 提供生命周期事件

为了让 AI 替代人类参与到游戏中，我们除了需要有 Trex.startJump() 这样的输出类方法外，还需在 Runner 类中提供必要的事件作为输入：

![img](https://pic2.zhimg.com/80/v2-ac5577f84eabd7c0912c92ebaddc0095_720w.jpg)

- **onReset() 事件**：当游戏重启时将触发该事件，通常 AI 模型的训练的过程将在此事件中完成。
- **onRunning() 事件**：每只没有“crash”的暴龙会在每一次 `update()` 后触发该事件，事件的返回值将被作为 `action`，当 `action` 为 `1` 时表示将执行跳跃，`0` 则表示保持不变。 可以利用该事件实现对游戏状态的监控，同时命令暴龙在特定的时机改变跳跃状态。
- **onCrash() 事件**：当暴龙撞到仙人掌或者翼龙的时候，将触发该事件，可以通过该事件评价 AI 模型执行的效果，例如在遗传算法中，可以用它来计算种群中某一暴龙模型的排名。

下面是一个示例程序，基于以上生命周期事件：

```js
let runner = null;

// 排名
let rankList = [];

// 初始化游戏。
function setup() {
  // 创建游戏运行时
  runner = new Runner(
    '.game',            // HTML 中对应的游戏 DIV 容器
    {
      T_REX_COUNT: 10,  // 每一局同时有 10 只暴龙
      onReset: handleReset,
      onRunning: handleRunning,
      onCrash: handleCrash
    }
  );
  // 初始化
  runner.init();
}

let firstTime = true;
// 每次游戏重新开始前会调用此方法。
// tRexes 参数表示当前的暴龙种群。
function handleReset({ tRexes }) {
  if (firstTime) {
    firstTime = false;
    tRexes.forEach((tRex) => {
      // 随机初始化每一只暴龙的模型
      // minDistance 在本例中代表可容忍的障碍物最小间距
      tRex.model = { minDistance: Math.random() * 50 };
    });
  } else {
    // 打印排名
    rankList.forEach(
      (tRex, i) => console.info(i + 1, tRex.model.minDistance)
    );
    // 清空排名
    rankList.splice(0);
  }
}

// 在游戏运行中，活着的暴龙会持续调用此方法来询问是否要跳跃。
// tRex 参数表示当前上下文中的暴龙。
// state 参数中，obstacleX 表示距离最近的障碍物的横坐标，obstacleWidth
// 表示障碍物宽度，speed 表示当前游戏全局速度。
// 方法返回 1 表示跳跃，2 则表示不变。
function handleRunning({ tRex, state }) {
  if (state.obstacleX <= tRex.model.minDistance &&
      !tRex.jumping) {
    // 这里我们直接用一个“人工【的】智能”，即：
    // 当前障碍物距离到达阈值，则命令暴龙跳跃
    return 1;
  }
  return 0;
}

const deadTrexes = [];
// 当暴龙“crash”时，会调用此方法来通知。
function handleCrash({ tRex }) {
  // 记录排名，最后 crashed 暴龙排在最前面
  rankList.unshift(tRex);
}

// 订购 DOMContentLoaded 事件以触发 setup() 方法
document.addEventListener('DOMContentLoaded', setup);
```



------

## **2. 实现算法模型**

## 2.1 初中生都能懂的算法模型

“算法模型”一词对于刚接触 AI 的前端同学来说，可能听上去有些高不可测，其实不然，让我们先合上教科书，来一起看看下面这个初中就学过的简单公式：

![img](https://pic3.zhimg.com/80/v2-4e58aeea05b4173ad283b3ab22c544da_720w.jpg)据统计每多一个公式，就会少 n 个读者，这是本文的倒数第 3 个公式

公式中，`x` 是一**输入项（inputs）** ，y 是**输出项（outputs）**，而 `f(x)` 就是**模型 （model）**的核心函数**。例如：**

- 当 ![[公式]](https://www.zhihu.com/equation?tex=y+%3D+weight+%5Ccdot+x+%2B+bias) 时，因为是**线性函数（Linear Function，也称一次方程）**，所以被称为**线性模型（Linear Model）**，该模型除了函数公式外，还包含了 `weight`、`bias` 等参数，举一个例子，据说知乎文章中美多一个公式，就会少 n 个读者，这就是一个典型的线性模型**；**



事实上 AI 决定当前是否需要跳跃也是一个线性模型，用一个线性函数表示就是：

![[公式]](https://www.zhihu.com/equation?tex=y+%3D+w1+%2A+obstacleX+%2B+w2+%2A+obstacleWidth+%2B+b)

> `obstacleX` 和 `obstacleWidth` 是输入项，它们来自于 `handleRunning()` 方法的 `state` 参数，该参数中：
> \- `obstacleX` 表示距离最近的障碍物的横坐标
> \- `obstacleWidth` 表示障碍物宽度
> \- `speed` 表示当前游戏全局速度。
>
> 当 `y` 输出的值小于 `0` 时，则表示需要“跳跃”。



其中 `w1`、`w2` 分别表示 `obstacleX` 和 `obstacleWidth` 的**权重（weight）**， `b` 是**偏移量（bias）**，它们都是该线性模型的参数。

与初中数学有所不同的是，这里的输入和输出通常都是**向量（vector）**，而不像前面的例子中都是标量**，**并且多为线性运算。千万不要被线性数学和公式吓跑，“算法”不完全是“数学”，更不是“算数”，请接着往下看。



## 2.2 预测，训练和评价

**预测 Prediction**

在机器学习中，已知输入项 `x` 和模型求 `y` 时，被称为**预测（predict）**过程。



**训练 Training**

通过已知输入项 `x` 和输出项 `y` 来调节模型中 `w1`、`w2` 和 `b` 参数直到“最佳效果”的过程，被称为**训练（train）**过程，而 `y` 因为是已知的输出项，又被称为**标签（label）**，多组`x` 和 `y`在一起被称为**训练数据集（training data set）。**训练通常需要反复执行很多次，才能达到“最佳效果”。



**评价 Evaluation**

在训练过程中，将训练数据集中的 `x` 作为输入项，执行预测过程，将预测结果与标签 `y` 的实际结果进行对比，并通过一个函数得到一个分值用以表示当前模型的拟合能力，被称为**评价（evaluatie）**过程,这个函数被称为评价函数或**损失函数（loss function）**。



**机器学习就是一个不断训练、评价迭代的模型训练过程，训练得越好，则未来预测得越准确。**



> 2.1 和 2.2 这两节中的内容均为笔者自己多年工作实践的总结，与教科书难免有差异还请谅解，有关术语定义请以教科书为准。



## 2.3 定义算法模型抽象类

在正式进入到 AI 算法实现环节之前，我们还需要定义一个通用的面向对象 AI 模型—— [Model 抽象类](https://link.zhihu.com/?target=https%3A//github.com/MagicCube/t-rex-run/blob/master/src/ai/models/Model.js)，其成员主要包括：

- **predict(inputX) 方法**：根据给出的 `inputX` 预测出 `y` 值并将其返回。
- **train(inputs, labels) 方法**：根据输入和标签纸优化模型参数。
- **fit(inputs, labels) 方法**：反复执行 `train()` 方法，停止的条件可以是执行到一定的次数，也可以是当 `loss()` 方法返回的均方差小于一个阀值。
- **loss(predictedYs, labels) 方法**：根据预测值和实际标签值，计算出一个评价值，值越小说明当前模型拟合得越好，默认提供的是[均方误差（mean squared error）](https://link.zhihu.com/?target=https%3A//baike.baidu.com/item/%25E5%259D%2587%25E6%2596%25B9%25E8%25AF%25AF%25E5%25B7%25AE)，其实就是将每一个预测值减去标签值然后进行平方，求这个平方的平均值。

上述`inputX`、`inputs` 和 `labels` 等都是用**向量（vector）**来表示的，可以用数组来表示，在 TensorFlow.js 中则用 [tf.Tensor](https://link.zhihu.com/?target=https%3A//js.tensorflow.org/api/0.6.1/%23class%3ATensor) 表示。



在本项目中，`Model` 抽象类是所有算法模型的基类，让我们来看一个最简单的模型——随机模型的源代码：

```js
import Model from '../Model';

// 随机模型继承自 Model
export default class RandomModel extends Model {
  // weights 和 biases 是 RandomModel 的模型参数
  weights = [];
  biases = [];

  init() {
    // 初始化就是随机的过程
    this.randomize();
  }

  predict(inputXs) {
    // 最简单的线性模型
    const inputX = inputXs[0];
    const y =
      this.weights[0] * inputX[0] +
      this.weights[1] * inputX[1]+
      this.weights[2] * inputX[2] +
      this.biases[0];
    return y < 0 ? 1 : 0;
  }

  train(inputs, labels) {
    // 随机模型还要啥训练，直接随机！
    this.randomize();
  }

  randomize() {
    // 随机生成所有模型参数
    this.weights[0] = random();
    this.weights[1] = random();
    this.weights[2] = random();
    this.biases[0] = random();
  }
}

function random() {
  return (Math.random() - 0.5) * 2;
}
```

> **作者注**：千万不要小看这个模型，通过遗传算法，随机模型也能控制暴龙避开障碍物，只是学习效率略低，[请在桌面版 Chrome 上观看 Demo](https://link.zhihu.com/?target=https%3A//magiccube.github.io/tensorflow-rex-run/genetic.html)。



## 2.4 定义算法模型的输入与输出

**输入项**

简单来说，我们首先将 1.3 节中 `handleRunning()` 方法得到的 `state` JSON 参数转换成一个 3 维向量，即一个 3 维数组，并进行归一化处理，所谓**归一化（Normalize）**可以理解成将一个标量变成 0 - 1 之间的值的函数。相关代码如下：

```js
function handleRunning({ state }) {
  const inputs = convertStateToVector(state);
  ...
}

function convertStateToVector(state) {
  if (state) {
    // 生成一个包含 3 个数字的数组，即向量
    // 数字被归一后，值域为 0 到 1
    // 如 [0.1428, 0.02012, 0.00549]
    return [
      state.obstacleX / CANVAS_WIDTH,      // 障碍物离暴龙的距离
      state.obstacleWidth / CANVAS_WIDTH,  // 障碍物宽度
      state.speed / 100                    // 当前游戏全局速度
    ];
  }
  return [0, 0, 0];
}
```



**输出项**

接下来我们来定义输出项，最简单的方法是一个 2 维向量，其中第一维代表暴龙保持状态不变的可能性，而第二维度代表跳跃的可能性。例如：

- `[0, 1]` 表示`跳跃`；
- `[0.2158, 0.8212]` 表示`跳跃`；
- `[0.998, 0.997]` 则表示`保持不变`，继续前行；
- `f([0.1428, 0.02012, 0.00549]) = [0.2158, 0.8212]` 表示预测结果为`跳跃`；
- 如果 `state` 为 `{ obstacleX: 0.1428, obstacleWidth: 0.02012, speed: 0.00549 }`，暴龙跳跃后 crash 了，则可以在训练过程中通过将 `[0.1428, 0.02012, 0.00549]` 对应于 `[1, 0]` 标签，来告诉 AI 下一次碰到这种情况不要再`跳跃`了，而应该 `保持不变`。



## 2.5 人工神经网络模型

受限于篇幅，实在无法将神经网络的原理在此复述。以下内容摘自 [Wikipedia](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%25E4%25BA%25BA%25E5%25B7%25A5%25E7%25A5%259E%25E7%25BB%258F%25E7%25BD%2591%25E7%25BB%259C)：

> **人工神经网络**（英语：artificial neural network，缩写ANN），简称**神经网络**（neural network，缩写NN）或**类神经网络**，在[机器学习](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%25E6%259C%25BA%25E5%2599%25A8%25E5%25AD%25A6%25E4%25B9%25A0)和[认知科学](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%25E8%25AE%25A4%25E7%259F%25A5%25E7%25A7%2591%25E5%25AD%25A6)领域，是一种模仿[生物神经网络](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%25E7%2594%259F%25E7%2589%25A9%25E7%25A5%259E%25E7%25BB%258F%25E7%25BD%2591%25E7%25BB%259C)（动物的[中枢神经系统](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%25E4%25B8%25AD%25E6%25A8%259E%25E7%25A5%259E%25E7%25B6%2593%25E7%25B3%25BB%25E7%25B5%25B1)，特别是[大脑](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%25E5%25A4%25A7%25E8%2584%2591)）的结构和功能的[数学模型](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%25E6%2595%25B0%25E5%25AD%25A6%25E6%25A8%25A1%25E5%259E%258B)或[计算模型](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%25E8%25AE%25A1%25E7%25AE%2597%25E6%25A8%25A1%25E5%259E%258B)，用于对[函数](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%25E5%2587%25BD%25E6%2595%25B0)进行估计或近似。神经网络由大量的人工神经元联结进行计算。大多数情况下人工神经网络能在外界信息的基础上改变内部结构，是一种[自适应系统](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/w/index.php%3Ftitle%3D%25E8%2587%25AA%25E9%2580%2582%25E5%25BA%2594%25E7%25B3%25BB%25E7%25BB%259F%26action%3Dedit%26redlink%3D1)。[[来源请求\]](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/Wikipedia%3A%25E5%2588%2597%25E6%2598%258E%25E6%259D%25A5%25E6%25BA%2590)现代神经网络是一种[非线性](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%25E9%259D%259E%25E7%25BA%25BF%25E6%2580%25A7)[统计性数据建模](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/w/index.php%3Ftitle%3D%25E7%25BB%259F%25E8%25AE%25A1%25E6%2580%25A7%25E6%2595%25B0%25E6%258D%25AE%25E5%25BB%25BA%25E6%25A8%25A1%26action%3Dedit%26redlink%3D1)工具。典型的神经网络具有以下三个部分：
>
> **结构**（**Architecture**）结构指定了网络中的变量和它们的拓扑关系。例如，神经网络中的变量可以是神经元连接的[权重](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%25E6%259D%2583%25E9%2587%258D)（weights）和神经元的激励值（activities of the neurons）。
>
> **激励函数（Activity Rule）**大部分神经网络模型具有一个短时间尺度的动力学规则，来定义神经元如何根据其他神经元的活动来改变自己的激励值。一般激励函数依赖于网络中的权重（即该网络的参数）。
>
> **学习规则（Learning Rule）**学习规则指定了网络中的权重如何随着时间推进而调整。这一般被看做是一种长时间尺度的动力学规则。一般情况下，学习规则依赖于神经元的激励值。它也可能依赖于监督者提供的目标值和当前权重的值。例如，用于[手写识别](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%25E6%2589%258B%25E5%2586%2599%25E8%25AF%2586%25E5%2588%25AB)的一个神经网络，有一组输入神经元。输入神经元会被输入图像的数据所激发。在激励值被加权并通过一个[函数](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%25E5%2587%25BD%25E6%2595%25B0)（由网络的设计者确定）后，这些神经元的激励值被传递到其他神经元。这个过程不断重复，直到输出神经元被激发。最后，输出神经元的激励值决定了识别出来的是哪个字母。



> 常见的多层结构的神经网络由三部分组成：
>
> **输入层（Input layer）**，众多神经元（Neuron）接受大量非线形输入消息。输入的消息称为输入向量。
>
> **输出层（Output layer）**，消息在神经元链接中传输、分析、权衡，形成输出结果。输出的消息称为输出向量。
>
> **隐藏层（Hidden layer）**，简称“隐层”，是输入层和输出层之间众多神经元和链接组成的各个层面。隐层可以有多层，习惯上会用一层。隐层的节点（神经元）数目不定，但数目越多神经网络的非线性越显著，从而神经网络的[强健性（robustness）](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%25E5%25BC%25B7%25E5%2581%25A5%25E6%2580%25A7_%28%25E9%259B%25BB%25E8%2585%25A6%25E7%25A7%2591%25E5%25AD%25B8%29)（控制系统在一定结构、大小等的参数摄动下，维持某些性能的特性。）更显著。习惯上会选输入节点1.2至1.5倍的节点。



## 2.6 搭建人工神经网络

![img](https://pic3.zhimg.com/80/v2-e7dc553bdba0ded5252730f9beb7af4e_720w.jpg)

如上图所示，在本节中我们将搭建一个两层神经网络（Neural Network，简称 NN），输入项为一个三维向量组成的矩阵，输出则为一个二维向量组成的矩阵，隐含层中包含 6 个神经元，激励函数为 `sigmoid`。

下面为 NNModel 的源代码：

```js
import * as tf from '@tensorflow/tfjs';

import { tensor } from '../../utils';
import Model from '../Model';

/**
 * 神经网络模型
 */
export default class NNModel extends Model {
  weights = [];
  biases = [];

  constructor({
    inputSize = 3,
    hiddenLayerSize = inputSize * 2,
    outputSize = 2,
    learningRate = 0.1
  } = {}) {
    super();
    this.hiddenLayerSize = hiddenLayerSize;
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    // 我们使用 ADAM 作为优化器
    this.optimizer = tf.train.adam(learningRate);
  }

  init() {
    // 隐藏层
    this.weights[0] = tf.variable(
      tf.randomNormal([this.inputSize, this.hiddenLayerSize])
    );
    this.biases[0] = tf.variable(tf.scalar(Math.random()));
    // 输出层tput layer
    this.weights[1] = tf.variable(
      tf.randomNormal([this.hiddenLayerSize, this.outputSize])
    );
    this.biases[1] = tf.variable(tf.scalar(Math.random()));
  }

  predict(inputXs) {
    const x = tensor(inputXs);
    // 预测的是指
    const prediction = tf.tidy(() => {
      const hiddenLayer = tf.sigmoid(x.matMul(this.weights[0]).add(this.biases[0]));
      const outputLayer = tf.sigmoid(hiddenLayer.matMul(this.weights[1]).add(this.biases[1]));
      return outputLayer;
    });
    return prediction;
  }

  train(inputXs, inputYs) {
    // 训练的过程其实就是将带标签的数据交给内置的 optimizer 进行优化
    this.optimizer.minimize(() => {
      const predictedYs = this.predict(inputXs);
      // 计算损失值，优化器的目标就是最小化该值
      return this.loss(predictedYs, inputYs);
    });
  }
}
```

如果你此前使用过 Python 版的 TensorFlow，不难发现上面的代码就是将线性数学公式或者 Python 翻译成了 JavaScript 代码。与 Python 版本不同的是，由于 JavaScript 缺少 Python 符号重载（operation overloading）的语言特性，因此在公式表达方面比较繁琐，例如数学公式：

![[公式]](https://www.zhihu.com/equation?tex=y+%3D+sigmoid%28x+%5Ccdot+weights+%2B+biases%29)

用 Python 表示可直接表示为：

```python3
y = tf.sigmoid(tf.matmul(x, Weights) + biases)
```

而 JavaScript 由于缺少加号符号重载，因此要写成：

```abap
y = tf.sigmoid(tf.matMul(x, weights).add(biases));
```



------

## **3. 集成算法模型**

在第 2 章中我们重构了 T-Rex Runner 的代码结构，并暴露出生命周期事件以便 AI 截获并控制暴龙的行为，在第 3 章结尾，基于 TensorFlow.js 我们用 50 行代码就构建了一个神经网络，现在我们只需要将两者进行有机的结合，就能实现 AI 玩游戏，具体步骤如下：

1. 在 `handleRunning()` 事件处理中，调用模型的 `predict()` 方法，根据当前 `state` 决定是否需要跳跃；
2. 在 `handleCrash()` 事件处理中，如果暴龙是因为“跳跃”而 crash 的，就在训练数据集中记录标签为“保持不变”，反之则记录为“跳跃”，这就是我们在教育中所谓“吸取教训”、“矫枉过正”的过程；
3. 在 `handleReset()` 事件处理中，执行模型的 `fit()` 方法，根据最新训练数据集进行反复训练。

具体代码片段如下：

```js
let firstTime = true;
function handleReset({ tRexes }) {
  // 由于当前模型中我们只有一只暴龙，因此只需要第一只就够了
  const tRex = tRexes[0];
  if (firstTime) {
    // 首次初始化模型
    firstTime = false;
    tRex.model = new NNModel();
    tRex.model.init();
    tRex.training = {
      inputs: [],
      labels: []
    };
  } else {
    // 根据最新收集的训练数据重新训练
    tRex.model.fit(tRex.training.inputs, tRex.training.labels);
  }
}

function handleRunning({ tRex, state }) {
  return new Promise((resolve) => {
    if (!tRex.jumping) {
      let action = 0;
      const prediction = tRex.model.predictSingle(convertStateToVector(state));
      // tensor.data() 方法是对 tensor 异步求值的过程，返回一个 Promise 对象：
      prediction.data().then((result) => {
        if (result[1] > result[0]) {
          // 应该跳跃
          action = 1;
          // 记录最后“跳跃”时的状态，以备 handleCrash() 复盘时使用
          tRex.lastJumpingState = state;
        } else {
          // 保持不变，并记录最后“保持不变”的状态值，以备 handleCrash() 复盘时使用
          tRex.lastRunningState = state;
        }
        resolve(action);
      });
    } else {
      resolve(0);
    }
  });
}

function handleCrash({ tRex }) {
  let input = null;
  let label = null;
  if (tRex.jumping) {
    // 跳错了，应该保持不变！下次记住了！
    input = convertStateToVector(tRex.lastJumpingState);
    label = [1, 0];
  } else {
    // 不应该保守的，应该跳跃才对！下次记住了！
    input = convertStateToVector(tRex.lastRunningState);
    label = [0, 1];
  }
  tRex.training.inputs.push(input);
  tRex.training.labels.push(label);
}
```

基于人工神经网络的 AI 模型运行效果请[在桌面版 Chrome 上观看 Demo](https://link.zhihu.com/?target=https%3A//magiccube.github.io/tensorflow-rex-run/neural-network.html)。



------



## **4. 优化算法模型**

如果你观察过这个[线上 Demo](https://link.zhihu.com/?target=https%3A//magiccube.github.io/t-rex-run/neural-network.html)不难发现，通常在 4-5 次 crash 后，AI 逐渐学会了跳跃障碍的时间和技巧，但是有的时候“运气不好”的话可能需要 10 次以上，那么有没有什么办法可以优化算法呢？答案是肯定的：

- 一种方法是通过多玩家模式（Multiplayer Mode），即 3 只暴龙同时出现在同一局中，对应背后的 3 个共享失败教训的人工神经网络模型 AI，由于“见多识广” ，这种优化导致成功率极高、大大缩短了训练时间，但是仍然具有一定的随机性。[请在桌面版 Chrome 上观看 Demo](https://link.zhihu.com/?target=https%3A//magiccube.github.io/t-rex-run/neural-network-multiplayer.html)
- 另一种方法仍然是多玩家模式，一局共有 10 只暴龙，不同的是我们引入了达尔文的“优胜劣汰”机制，即每一局结束后，坚持时间最长的两只暴龙进行“**交配（crossover）**”，生出**幼崽（offspring）**，幼崽的“**染色体（chromosome）**”遗传自于父母，同时为了保证生物多样性，还会随机**变化（mutate）**一部分**基因（gene）**，这被称为“**遗传算法（Genetic Algorithm）**”。结合遗传算法后，几乎可以保证在 4 代以内获得最优化的神经网络模型参数。[请在桌面版 Chrome 上观看 Demo](https://link.zhihu.com/?target=https%3A//magiccube.github.io/tensorflow-rex-run/genetic-neural-network.html)。



------



## **5. 总结**

本文通过 AI 玩转 T-Rex Runner 的实例，介绍了如何重构游戏代码、利用 TensorFlow.js 快速搭建人工神经网络的过程。

关于未来，本项目计划通过 CNN 卷积神经网络来直接通过捕获 HTML Canvas 中的图像信息，分析 `handleRunning()` 中的 `state` 状态。如果你对本项目有兴趣，[请在 Github 上关注本项目](https://link.zhihu.com/?target=https%3A//github.com/MagicCube/t-rex-run)，我还会继续持续更新。

或许你已经发现，这个项目采用了类似**测试台（Test Bench）**的运行模式，没错，你也可以自己设计新的算法模型并进行测试。

**欢迎在下方的留言区中与我交流。**