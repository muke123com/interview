## 基础知识

#### 关键字
`in`
```js
  //循环
  for (x in arr) {}
  for(var v in obj) {}
  
  //判断是否存在
  1 in arr
  'name' in obj
```

#### this
```js
var length = 10;
function fn() {
  console.log(this.length);
}
 
var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};
 
obj.method(fn, 1);
```
> 第二次执行时相当于arguments调用方法，this指向arguments，而这里传了两个参数，故输出arguments长度为2

#### var和函数的提前声明
```js
function fn(a) {
  console.log(a); 
  var a = 2;
  function a() {}
  console.log(a); 
}
 
fn(1);
```

```js
console.log(typeof fn);
function fn() {};
var fn;
```
> var和function是会提前声明的，而且function是优先于var声明的（如果同时存在的话），所以提前声明后输出的a是个function，然后代码往下执行a进行重新赋值了，故第二次输出是2。

```js
  if('a' in window) {
    var a = 10;
  }

  alert(a);
  
  //等价于
  
  var a;
  if('a' in window) {
    a = 10;
  }

  alert(a);
```
> 代码还没执行前，a变量已经被声明，于是 ‘a’ in window 返回true，a被赋值。


```js
  var a = "aa";
  function fn(){
    alert(a);
    var a = "bb";
    alert(a);
  }
  fn();
  //结果为undefined, bb
  
  //等价于
  var a = "aa";
  function fn(){
    var a;
    alert(a);
    a = "bb";
    alert(a);
  }
  fn();
  
```
> 函数在定义它们的作用域里运行，而不是在执行它们的作用域里运行

#### Array
`reduce()`
> `reduce()` 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
> `array.reduce(function(total, currentValue, currentIndex, arr), initialValue);`
```js
  var nums = [1,2,3,4,5];
  nums.reduce(function(total, num) {
    return total + num;
  })
```

`shift(), pop()`
> `shift()` 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
> `array.shift()`
> `pop()` 方法用于删除数组的最后一个元素并返回删除的元素。
> `array.pop()`

`reverse()`
> `reverse()` 方法用于颠倒数组中元素的顺序。
> `array.reverse()`

`some(), every()` 
> `some()` 方法用于检测数组中的元素是否满足指定条件（函数提供）
  如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
  如果没有满足条件的元素，则返回false。
```js
  var nums = [1,2,3,4,5];
  nums.some(function(num) {
    return num > 3;
  })
```
`filter`
> filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。

> 注意： filter() 不会对空数组进行检测。

> 注意： filter() 不会改变原始数组。
```js
list.filter(function(item){ return item['privateEndDate'] == '2020-8-13' })
```

### Object

`Object.keys(obj)`  获取对象中所有key值，返回一个数组

 `Object.assign(obj1,obj2)`

针对深拷贝，需要使用其他方法，因为 `Object.assign()`拷贝的是属性值。**假如源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值**。

```js
//Object.assign复制一个对象到另一个对象中,相同属性会覆盖
var obj = { a: 1 };
var copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```

同步代码优先执行

`for`循环   `in => key, of => value`

