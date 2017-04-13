## 收集的题

#### 1. this
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

#### 2. var和函数的提前声明
```js
function fn(a) {
  console.log(a); 
  var a = 2;
  function a() {}
  console.log(a); 
}
 
fn(1);
```
> var和function是会提前声明的，而且function是优先于var声明的（如果同时存在的话），所以提前声明后输出的a是个function，然后代码往下执行a进行重新赋值了，故第二次输出是2。

```js
  if('a' in window) {
    var a = 10;
  }

  alert(a);
```
> 代码还没执行前，a变量已经被声明，于是 ‘a’ in window 返回true，a被赋值。

```js
console.log(typeof fn);
function fn() {};
var fn;
```
> 函数声明又会优于变量声明，这里的优于可以理解为晚于变量声明后。

```js
  var a = "aa";
  function fn(){
    alert(a);
    var a = "bb";
    alert(a);
  }
  //结果为undefined, bb
```
> 函数在定义它们的作用域里运行，而不是在执行它们的作用域里运行

#### 3. 
