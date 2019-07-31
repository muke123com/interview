## es6 

[TOC]

#### 基础

[import export](http://es6.ruanyifeng.com/#docs/module);

#### 解构
```js
var arr = ['a','x',2];
var [a,b,c] = arr;

var obj = {name: 'abc', age: 15};
var {name, age} = obj;

//变量互换
var x=1,y=2;
var [x,y] = [y,x];

```

#### 数组

```js
// 类数组转换为数组
Array.from
// 判断是否为数组
Array.isArray

let str = '11'
Array.of(str)   // ['11']
// 类似于
new Array('11')  // ['11]
```



#### 扩展运算符

```js
var arr = ['a','b','c'];
var f = function(a,b,c) {
    console.log(a,b,c)
}
f(...arr);

var obj = {name: 'aa'};
var obj2 = {age: 'aa', ...obj};

//数组深拷贝
var arr = [1,2,3];
var arr2 = arr;
var arr3 = [...arr];
console.log(arr===arr2); //true, 说明arr和arr2指向同一个数组
console.log(arr===arr3); //false, 说明arr3和arr指向不同数组

//数组合并
var arr4 = [...arr,...arr3, 6];
```

#### rest运算符
* 1.定义函数时用
* 2.rest运算符也是三个点号，不过其功能与扩展运算符恰好相反，把逗号隔开的值序列组合成一个数组
* 3.主要用于不定参数，所以ES6开始可以不再使用arguments对象

```js
var f = function(a,...arg) {
    console.log(a);
    arg.map(function (item) { 
        console.log(item)    
    })  
}
f(1,2,5,8)

var [a, ...rest] = [1,2,3,4];
```


#### promise
```js
    var p = new Promise(function (resolve, reject) {
        //resolve 成功回调
        //reject 失败回调
        setTimeout(() => {
            var name = 'aaa';
            resolve(name);
        }, 1000)
    })

    p.then((data) => {
        console.log(data);
    })
```
- Promise.all接收一个Promise对象组成的数组作为参数，当这个数组所有的Promise对象状态都变成resolved或者rejected的时候，它才会去调用then方法。

- 与Promise.all相似的是，Promise.race都是以一个Promise对象组成的数组作为参数，不同的是，只要当数组中的其中一个Promsie状态变成resolved或者rejected时，就可以调用.then方法了。

#### async await

```js
//定义异步方法
async function getData() {
    return '123456'
}

async function wait() {
    var d = await getData()
    console.log(d);
}

wait();

// map中使用await
arr.map(() => {
    (async () => {
        const deepData = await getTrainData(xs, predsYs);
        drawDeepData(deepData)
    })()
})
    
```

#### 箭头函数
箭头函数有几个使用注意点。
1. 函数体内的this对象，就是**定义时所在的对象，而不是使用时所在的对象**。
2. 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
3. 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
4. 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

```js
var f = a => a;
//等同于
var f = function(a) {
    return a;
}
//使用
var f = () => 5
[1,2,3].map(x => x*x);

//this
function f() {
    setTimeout(function() {
        console.log('id:', this.id)  
    },100)
    setTimeout(()=>{
        console.log('id=>', this.id)
    },100)
}

var id = 21;
f.call({id: 12});
```

#### 迭代器(Iterator)和生成器(Generator)

#### Object对象新增方法

`Object.is()`类似`===`。区别：后者的`NaN`不等于自身，以及`+0`等于`-0`

`Object.assign`方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

**（1）浅拷贝**

`Object.assign`方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

```javascript
const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b // 2
```

**（2）同名属性的替换**

对于这种嵌套的对象，一旦遇到同名属性，`Object.assign`的处理方法是替换，而不是添加。

```javascript
const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }
```

**（3）数组的处理**

`Object.assign`可以用来处理数组，但是会把数组视为对象。

```javascript
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
```

**（4）取值函数的处理**

`Object.assign`只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

```javascript
const source = {
  get foo() { return 1 }
};
const target = {};

Object.assign(target, source)
// { foo: 1 }
```