# 2018

> flex布局，数组方法，vuex，vue-router


# 2017
## 基础

```js
['1', '2', '3'].map(parseInt);

等价于

['1', '2', '3'].map(function (num, index) {
    parseInt(num, index);
})
```

```js
0.1 + 0.2 === 0.3;
false

null instanceof Object;
false

'abc'+false ? 'Something' : 'Nothing'; Something
```

#### bind()
* 
```js
var write = document.write;
write.bind(document)('abc');
```

#### call()与apply()
* 调用一个对象的一个方法，以另一个对象替换当前对象。
* `call()` 的第二个参数可以是任意类型。
* `apply()` 的第二个参数必须是数组。

**继承**
```js
function Animal(){
  this.name = 'abc';
  this.age = 123;
  this.getName = function() {
    alert(this.name);
  }
}

function Cat(){
  Animal.call(this);   //使用 Animal对象代替this对象, 实现Cat继承Animal。 但call不能继承对象原型上的方法
  this.name = 'Cat';
  this.color = "white";
}

var cat = new Cat();

//原型继承
function Dog(){
  this.name = "dog";
};
Dog.prototype = new Animal();  //能继承对象原型上的方法
```

#### caller()与callee()
* `caller` 返回一个函数的引用，这个函数调用了当前的函数。
```js
function c1() {
  alert(c1.caller);
}
function c2() {
  c1();    
}
c2();
//因为c2调用了c1, 所以c1.caller的结果是c2。

c1();
//若c1是顶层函数, 则返回结果是null;
```
* `callee` 放回正在执行的函数本身的引用，它是arguments的一个属性。
```js
//用于递归
function factorial(num) {
  if(num < 1) {
    return 1;
  } else{
    return num * arguments.callee(num - 1);
  }
}
```


#### sort排序
```js
var arr = [2,1,4,3];

function asc (a, b) {
  return a - b;           //如果a<b不交换，否则交换，即升序排列
}

arr.sort (asc);
```

#### 打乱数组
```js
var arr = [1,2,3,4];
arr.sort (function (a, b) {
    return 0.5 - Math.random()
})
```

#### Doctype作用？标准模式与兼容模式各有什么区别?

* !DOCTYPE声明位于位于HTML文档中的第一行，处于html 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。
* 标准模式的排版 和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

#### 数组方法pop() push() unshift() shift()

* Push()尾部添加 pop()尾部删除
* Unshift()头部添加 shift()头部删除

#### 简单闭包
```js
function f1(){
	var aa = 122;
	function f2(){
		return aa;
	}
	return f2;
}
//aa占用内存不会自动释放

```

### 事件冒泡，事件委托

* target和currentTarget都是event上面的属性，target是真正发生事件的DOM元素，而currentTarget是当前事件发生在哪个DOM元素上。

* 对“事件处理程序过多”问题的解决方案就是事件委托。事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。例如，click事件会一直冒泡到document层次。也就是说，我们可以为整个页面指定一个onclick事件处理程序，而不必给每个可单击的元素分别添加事件处理程序。

* 事件委托还有一个好处就是添加进来的元素也能绑定事件
```js
//利于事件流绑定事件
(function(){
    var color_list = document.getElementById('color-list');
    color_list.addEventListener('click',showColor,false);
    function showColor(e){
        var x = e.target;
        if(x.nodeName.toLowerCase() === 'li'){
            alert('The color is ' + x.innerHTML);
        }
    }
})();
```

