### 记录

```
['1', '2', '3'].map(parseInt);

等价于

['1', '2', '3'].map(function(num, index){
    parseInt(num, index);
})
```

```
0.1 + 0.2 === 0.3;
false

null instanceof Object;
false

'abc'+false ? 'Something' : 'Nothing'; Something
```

```
sort排序
var arr = [2,1,4,3];

function asc(a,b) {
  return a - b;//如果值为-1不交换，否则交换，即升序排列
}

arr.sort(asc);
```
