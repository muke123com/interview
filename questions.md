## 基础

```js
['1', '2', '3'].map(parseInt);

等价于

['1', '2', '3'].map(function (num, index) {
    parseInt(num, index);
})
```

```js
0.1 + 0.2 === 0.3;
false

null instanceof Object;
false

'abc'+false ? 'Something' : 'Nothing'; Something
```

#### bind()
* 
```js
var write = document.write;
write.bind(document)('abc');
```

#### call()与apply()
* 调用一个对象的一个方法，以另一个对象替换当前对象。
* `call()` 的第二个参数可以是任意类型。
* `apply()` 的第二个参数必须是数组。

**继承**
```js
function Animal(){
	this.name = 'abc';
	this.age = 123;
	this.getName = function() {
		alert(this.name);
	}
}

function Cat(){
	Animal.call(this);   //使用 Animal对象代替this对象, 实现Cat继承Animal。 但call不能继承对象原型上的方法
	this.name = 'Cat';
	this.color = "white";
}

var cat = new Cat();

//原型继承
function Dog(){
	this.name = "dog";
};
Dog.prototype = new Animal();  //能继承对象原型上的方法
```

#### caller()与callee()
* `caller` 返回一个函数的引用，这个函数调用了当前的函数。
```js
function c1() {
	alert(c1.caller);
}
function c2() {
	c1();    
}
c2();
//因为c2调用了c1, 所以c1.caller的结果是c2。

c1();
//若c1是顶层函数, 则返回结果是null;
```
* `callee` 放回正在执行的函数本身的引用，它是arguments的一个属性。
```js
//用于递归
function factorial(num) {
  if(num < 1) {
    return 1;
  } else{
    return num * arguments.callee(num - 1);
  }
}
```


#### sort排序
```js
var arr = [2,1,4,3];

function asc (a, b) {
  return a - b;           //如果a<b不交换，否则交换，即升序排列
}

arr.sort (asc);
```

#### 打乱数组
```js
var arr = [1,2,3,4];
arr.sort (function (a, b) {
    return 0.5 - Math.random()
})
```
