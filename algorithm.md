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
