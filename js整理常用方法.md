[TOC]

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
//下拉框优化
function selectBeauty() {
    var select = $("form select");
    // var select = $("select");
    select.each(function (i) {
        $(this).hide();
        var name = $(this).attr("name");
        var selectedText = $(this).find("option:selected").text();
        var value = $(this).val();
        var options = $(this).find("option");
        var selectBox = $("<div class='m-select-box'><i class='icon'></i></div>");
        if(select.hasClass("select-search")){
            var input = $("<input type='text' class='text' value='"+selectedText+"' />");
        }else {
            var input = $("<input type='text' class='text' value='"+selectedText+"' readonly />");
        }
        var ul = $("<dl class='scroll'></dl>");
        options.each(function (i) {
            var text = $(this).text();
            var value = $(this).val();
            ul.append("<dd data-value='"+value+"' title='"+text+"'>"+text+"</dd>");
        });
        selectBox.append(input);
        selectBox.append(ul);
        $(this).siblings(".m-select-box").remove();
        $(this).after(selectBox);
    });
    //下拉框搜索
    $(document).on("input", ".m-select-box .text", function () {
        var inputText = $(this).val();
        var select = $(this).parents(".m-select-box").siblings("select");
        var options = select.find("option");
        var ul = $(this).siblings("dl");
        ul.html("");
        options.each(function () {
            var text = $(this).text();
            var value = $(this).val();
            if(text.indexOf(inputText) != -1) {
                ul.append("<dd data-value='"+value+"' title='"+text+"'>"+text+"</dd>");
            }
        })
    });
    //下拉框展开
    $(document).on("click", ".m-select-box .text, .m-select-box .icon", function () {
        $(".m-select-box dl").hide();
        $(this).siblings("dl").show();
    });
    //下拉框选择
    $(document).on("click", ".m-select-box dd", function () {
        var selectBox = $(this).parents(".m-select-box");
        var text = $(this).text();
        var value = $(this).attr("data-value");
        selectBox.find("input.text").val(text);
        selectBox.siblings("select").val(value);
        selectBox.find("dl").hide();
        selectBox.siblings("select").change();
    })
    $("body").click(function (e) {
        var isSelect = $(e.target).parents(".m-select-box").length;
        if(isSelect == 0){
            $(".m-select-box dl").hide()
        }
    })
}

```

### 滚动浮动

```js
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



### 数组分块

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

### jsonp跨域

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

### 自动选中标签

```js
//自动选中标签
function selectText(element) {
    var text = document.getElementById(element);
    if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        alert("none");
    }
}
```

### 移动端使用rem，根据设计稿的宽度来传参 比如640 750 1125

```js
// 移动端使用rem，根据设计稿的宽度来传参 比如640 750 1125
!function(designWidth){
	if (/Android(?:\s+|\/)(\d+\.\d+)?/.test(navigator.userAgent)) {
		var version = parseFloat(RegExp.$1);
		if (version > 2.3) {
			var phoneScale = parseInt(window.screen.width) / designWidth;
			document.write('<meta name="viewport" content="width=' + designWidth + ',minimum-scale=' + phoneScale + ',maximum-scale=' + phoneScale + ', target-densitydpi=device-dpi">');
		} else {
			document.write('<meta name="viewport" content="width=' + designWidth + ',target-densitydpi=device-dpi">');
		}
	} else {
		document.write('<meta name="viewport" content="width=' + designWidth + ',user-scalable=no,target-densitydpi=device-dpi,minimal-ui,viewport-fit=cover">');
	}
}(640);
```

### 图片数据一维数组中获取canvas绘画坐标

```js
// 图片数据一维数组中获取canvas绘画坐标
let buffer32 = new Uint32Array(imgData.data.buffer);
for(let i=0;i<img.width;i+=2){
    for(let j=0;j<img.height;j+=2){
        if(buffer32[j * img.width + i]){
            let p = new Point(i,j);
            _this.points.push(p);
        }
    }
}
```

### 根据对象数组根据属性去重

```js
function uniqueCategories(arr) {
    var res = new Map();
    return arr.filter(function (item) {
        return !res.has(item.cgName) && res.set(item.cgName, 1)
    })
}
```

### 同一class高度自动相等， 为最大高度

```
items = ['name1', 'name2']
setTrHeight: function (items) {
    items.map(function (item) {
        var className = '.tr-' + item;
        var trHeight = 0;
        $(className).each(function () {
            var h = $(this).height();
            if(h > trHeight) trHeight = h;

        });
        $(className).css("height", trHeight);
        $(className).find(".item").css("height", trHeight + 1);
    })
}
```