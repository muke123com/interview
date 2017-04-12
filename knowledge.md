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

`some()`
> `some()` 方法用于检测数组中的元素是否满足指定条件（函数提供）
  如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
  如果没有满足条件的元素，则返回false。
```js
  var nums = [1,2,3,4,5];
  nums.some(function(num) {
    return num > 3;
  })
```
