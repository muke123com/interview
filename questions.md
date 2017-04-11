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

### call()与apply()
* `call()`   调用一个对象的一个方法，以另一个对象替换当前对象。
* `apply()`   应用某一对象的一个方法，用另一个对象替换当前对象。

**继承**
```js
function Animal(){
	this.name = 'abc';
	this.age = 123;
}

function Cat(){
	this.color = "white";
	Animal.call(this)
}

var cat = new Cat();

cat.name;

```

#### sort排序
```js
var arr = [2,1,4,3];

function asc (a,b) {
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
