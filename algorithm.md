## 基本算法

[TOC]

#### 快速排序

```js
    var quickSort = function(arr) {
      if(arr.length <= 1) {
        return arr;
      }
      var pivot = 0;
      var pivotIndex = 0;
      pivotIndex = Math.round(arr.length/2);
      pivot = arr.splice(pivotIndex, 1)[0];
      var left = [];
      var right = [];
      for (var i = 0; i < arr.length; i++) {
        if(arr[i] < pivot){
          left.push(arr[i]);
        }else{
          right.push(arr[i]);
        }
      }
      return quickSort(left).concat([pivot], quickSort(right));
    }
    var arr = [5,1,2,6,5,8,5,2,5,5,8,5];
    quickSort(arr);
```

#### 二分法求平方根
```js
  function squareRootBi(x, epsilon) {
    var low = 0;
    var high = Math.max(x, 1);
    var guess = (low + high)/2.0;
    var count = 0;
    while (Math.abs(Math.pow(guess, 2) - x) > epsilon && count <= 100) {
      if(Math.pow(guess, 2) < x) {
        low = guess;
      }else {
        high = guess;
      }
      guess = (low + high)/2.0;
      count++;
    }
    console.log("运算次数: " + count);
    return guess;
  }
  squareRootBi(10, 0.0001);
  //时间复杂度  O(logn)
```

#### 排列组合
```js  
function show(arr) {  
    console.log(arr);  
}  
function perm(arr) {  
    (function fn(source, result) {  
        if (source.length == 0)  
            show(result);  
        else 
            for (var i = 0; i < source.length; i++)  
                fn(source.slice(0, i).concat(source.slice(i + 1)), result.concat(source[i]));  
    })(arr, []);  
}  
perm(['A', 'B', 'C', 'D']);  
```

#### 杨辉三角
```js
function Pascal(m,n){
    var str;
	for(var i=0;i<m;i++){
        str = "";
        for(var j=0;j<n;j++){
            str += combination(i,j) + ","
        }
        console.log(str);
        console.log('\n');
    }
}
function combination(m, n){
    if(m == 0 || n == 0){
        return 1;
    }
    return combination(m-1,n)+combination(m,n-1);
}
```

#### 二叉树
- 树是计算机科学中经常用到的一种数据结构。树是一种非线性的数据结构，以分层的方式存储数据。
- 二叉树每个节点的子节点不允许超过两个。一个父节点的两个子节点分别称为左节点和右节点，通过将子节点的个数限定为2，可以写出高效的程序在树中插入、查找和删除数据。
- 二叉查找树（BST）是一种特殊的二叉树，相对较小的值保存在左节点中，较大的值保存在右节点中。这一特性使得查找的效率很高，对于数值型和非数值型的数据，比如单词和字符串，都是如此。
```js

```