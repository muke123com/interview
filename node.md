# nodejs

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 语法

```javascript
process.env   //获取系统变量
```

```js
//fs
fs.writeFile  //写
fs.readFile   //读
fs.writeFileSync  //同步写
fs.readFileSync  //同步读
```

```js
//http
const http = require('http');
let server = http.createServer();
server.on('request', (req,res)=>{
    //req只读 拿属性
    //res只读 调函数
    res.end(233);
});
server.listen(8080,()=>{
    console.log('listen:8080')
})
```

##### express

```js
res.json  //响应数据，最常用，返回ajax数据
res.redirect()  //重定向
res.download()  //下载
res.jsonp()  //配合jsonp跨域处理
```

