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
