## 收集的题

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
