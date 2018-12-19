## 记录js有用的方法

```js
//判断
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}
Object.create(null);  //不继承任何原型方法，也就是说它的原型链没有上一层。
//可以判断数组类型
var _toString = Object.prototype.toString;
function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}
//转为字符串
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}
//转为数字
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}
//删除数组元素
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
//判断是否map是否存在key
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

//操作cookie
function setCookie(cname, cvalue, exdays) {   
		var d = new Date();   
		d.setTime(d.getTime() + (exdays*24*60*60*1000));   
		var expires = "expires="+d.toUTCString(); 
		var cookie_domain = "domain=" + domain; 
		document.cookie = cname + "=" + cvalue + "; " + expires + "; " + cookie_domain;
}
function getCookie(key){
		var getCookie = document.cookie.replace(/[ ]/g,"");
		var arrCookie = getCookie.split(";")
		var tips;
		for(var i=0;i<arrCookie.length;i++){
				var arr=arrCookie[i].split("=");
				if(key==arr[0]){
						tips=arr[1];
						break;
				}
		}
		return tips;
};
function clearCookie(name) {
		setCookie(name, "", -1);
}
//滚动
var Index = {
    scrollTop: top,
    leftNavScroll: function (top) {
        this.scrollTop = top;
        if(top > 600){
            $(".public-fixleftbar").show()
        }else{
            $(".public-fixleftbar").hide()
        }
        var ids = ['section-hotservice', 'section-tools', 'section-pingtai', 'section-news'];
        for (var i=0;i<ids.length;i++){
            this.leftNavSelect(ids[i]);
        }
    },
    leftNavSelect: function (id) {
        var top = this.scrollTop;
        var id_top = $("#"+id).offset().top;
        if(top > id_top - 200 && top < id_top){
            $(".public-fixleftbar a").removeClass("active");
            $("." + id + '-a').addClass('active');
        }
    },
    leftNavClick: function (id) {
        var id_top = $("#"+id).offset().top;
        $('html,body').animate({'scrollTop': id_top - 60});
    }
}
```

```js
//数组分块
function chunk(array,process,context){
    setTimeout(function(){
        //取出下一个条目并处理
        var item = array.shift();
        process.call(context,item);
        //若还有条目，再设置另一个定时器
        if(array.length > 0){
            setTimeout(arguments.callee,100);
        }
    },100);    
}

var data = [1,2,3,4,5,6,7,8,9,0];
function printValue(item){
    var div = document.getElementById('myDiv');
    div.innerHTML += item + '<br>';
}
chunk(data.concat(),printValue);
```

```js
//jsonp跨域
//方法1
$.ajax({
    url: "http://localhost:3000/jsonp",
    type: "GET",
    dataType: "jsonp",  //指定服务器返回的数据类型
    jsonpCallback: "getData",  //指定回调函数名称
    success: function (data) {
        
    }
});
//方法2
var script = document.createElement('script');
script.src = 'http://localhost:3000/jsonp?callback=getData';
document.head.appendChild(script);

function getData(a) {
    console.log(a)
}
```