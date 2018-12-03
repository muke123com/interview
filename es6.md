## es6 

[import export](http://es6.ruanyifeng.com/#docs/module);

#### 解构
```js
var arr = ['a','x',2];
var [a,b,c] = arr;

var obj = {name: 'abc', age: 15};
var {name, age} = obj;

//变量互换
var x=1,y=2;
var [x,y] = [y,x];

```

#### 扩展运算符
```js
var arr = ['a','b','c'];
var f = function(a,b,c) {
    console.log(a,b,c)
}
f(...arr);

var obj = {name: 'aa'};
var obj2 = {age: 'aa', ...obj};

//数组深拷贝
var arr = [1,2,3];
var arr2 = arr;
var arr3 = [...arr];
console.log(arr===arr2); //true, 说明arr和arr2指向同一个数组
console.log(arr===arr3); //false, 说明arr3和arr指向不同数组

//数组合并
var arr4 = [...arr,...arr3, 6];
```

#### rest运算符
* 1.定义函数时用
* 2.rest运算符也是三个点号，不过其功能与扩展运算符恰好相反，把逗号隔开的值序列组合成一个数组
* 3.主要用于不定参数，所以ES6开始可以不再使用arguments对象

```js
var f = function(a,...arg) {
    console.log(a);
    arg.map(function (item) { 
        console.log(item)    
    })  
}
f(1,2,5,8)

var [a, ...rest] = [1,2,3,4];
```


#### promise
```js
    var p = new Promise(function (resolve, reject) {
        //resolve 成功回调
        //reject 失败回调
        setTimeout(() => {
            var name = 'aaa';
            resolve(name);
        }, 1000)
    })

    p.then((data) => {
        console.log(data);
    })
```
#### async await
```js
    //定义异步方法
    async function getData() {
        return '123456'
    }

    async function wait() {
        var d = await getData()
        console.log(d);
    }

    wait();
```
