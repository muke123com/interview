## 基础知识

#### Array
  **reduce()**
> `reduce()` 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
> `array.reduce(function(total, currentValue, currentIndex, arr), initialValue);`
```js
  var nums = [1,2,3,4,5];
  nums.reduce(function(total, num) {
    return total + num;
  })
```
