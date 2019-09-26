[TOC]

## 张量

+ `TensorFlow.js`中数据的中心单位是张量：一组数值形成一个或多个维度的数组。 张量实例具有定义数组形状的形状属性。

```js
var t1 = tf.scalar(3.14)  //定义
t1.print(); //打印
tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], [2, 3])  //一维数组改为2行3列        

tf.tensor2d([[2, 3, 4], [3, 4, 5]])  //定义二维数组

tf.zeros([3, 3])  //全是0的数组

tf.ones([3, 3])   //全是1的数组
add // 加
sub // 减
mul // 乘
square // 平方
mean // 平均值
```



## 变量

+ `Variables`变量是通过张量进行初始化得到的。不像`Tensor`的值不可变，变量的值是可变的。你可以使用变量的`assign`方法分配一个新的`tensor`到这个变量上，这是变量就会改变：

```js
const initialValues = tf.zeros([5]);

const biases = tf.variable(initialValues);

biases.print();

const updateValues = tf.tensor1d([0, 1, 0, 1, 0]);

biases.assign(updateValues);

biases.print();
```

## 方法

### tf.randomUniform

```js
// tf.tidy执行一个函数并清除所有创建的中间张量，释放它们的GPU内存。 它不清除内部函数的返回值。
tf.tidy
// 随机3x3数组, 范围-10到10
const xs = tf.randomUniform([3, 3], -10, 10);
xs.print();
```

